import ts from "typescript";
import path from "node:path";
import fs from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";

const root = process.cwd();
const output = path.join(root, "build/react-ui");
const sourceRoot = path.join(root, "src") + path.sep;
const configPath = path.join(root, "tsconfig.ui.json");
const config = ts.readConfigFile(configPath, ts.sys.readFile);
if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, "\n"));
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const entryFiles = ["src/ui/index.ts", "src/styles/assets.d.ts", "examples/react/DashboardExample.tsx"];
const program = ts.createProgram(entryFiles.map((file) => path.join(root, file)), parsed.options);
const diagnostics = ts.getPreEmitDiagnostics(program);
if (diagnostics.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: (file) => file, getCurrentDirectory: () => root, getNewLine: () => "\n",
  }));
  process.exit(1);
}
const files = new Map();
const packages = new Set(["react", "react-dom"]);
const forbiddenPackage = /^(next(?:\/|$)|@supabase\/|@vercel\/|@aws-sdk\/|aws-amplify(?:\/|$)|react-oidc-context$|oidc-client-ts$)/;
function recordPackage(specifier) {
  if (forbiddenPackage.test(specifier)) throw new Error(`React export reached forbidden dependency: ${specifier}`);
  const name = specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0];
  packages.add(name);
}
function readCss(filename) {
  if (files.has(filename)) return;
  const source = readFileSync(filename, "utf8");
  files.set(filename, source);
  for (const match of source.matchAll(/@import\s+["']([^"']+)["']/g)) {
    if (match[1].startsWith(".")) readCss(path.resolve(path.dirname(filename), match[1]));
    else recordPackage(match[1]);
  }
}

for (const source of program.getSourceFiles()) {
  const filename = source.fileName;
  if (!filename.startsWith(sourceRoot) && !entryFiles.includes(path.relative(root, filename))) continue;
  const relative = path.relative(root, filename).split(path.sep).join("/");
  if (/^src\/(app|mockData|contexts|lib\/(adapters|supabase|services|navigation))\//.test(relative) || /\/contexts\//.test(relative)) {
    throw new Error(`React export reached host implementation: ${relative}`);
  }
  const edits = [];
  function visit(node) {
    if (ts.isStringLiteral(node) && node.text === "use server") throw new Error(`Server action reached: ${relative}`);
    const isSpecifier = (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier;
    const dynamicSpecifier = ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments[0];
    const typeSpecifier = ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && node.argument.literal;
    const literal = isSpecifier || dynamicSpecifier || typeSpecifier;
    if (literal && ts.isStringLiteral(literal)) {
      const specifier = literal.text;
      if (specifier.startsWith(".") || specifier.startsWith("@/")) {
        const candidate = specifier.startsWith("@/") ? path.join(root, "src", specifier.slice(2)) : path.resolve(path.dirname(filename), specifier);
        if (specifier.endsWith(".css")) {
          readCss(candidate);
        } else {
          const resolved = ts.resolveModuleName(specifier, filename, parsed.options, ts.sys).resolvedModule;
          if (!resolved) throw new Error(`Unresolved local import: ${relative} -> ${specifier}`);
        }
        if (specifier.startsWith("@/")) {
          let replacement = path.relative(path.dirname(filename), candidate).split(path.sep).join("/");
          if (!replacement.startsWith(".")) replacement = "./" + replacement;
          edits.push({ start: literal.getStart(source), end: literal.getEnd(), text: JSON.stringify(replacement) });
        }
      } else {
        recordPackage(specifier);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  let text = source.text;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    text = text.slice(0, edit.start) + edit.text + text.slice(edit.end);
  }
  files.set(filename, text);
}
readCss(path.join(root, "src/ui/styles.css"));
const rootPackage = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const peerDependencies = {};
for (const name of [...packages].sort()) {
  const installed = path.join(root, "node_modules", name, "package.json");
  if (!existsSync(installed)) throw new Error(`Missing peer dependency: ${name}`);
  peerDependencies[name] = rootPackage.dependencies[name] ?? JSON.parse(readFileSync(installed, "utf8")).version;
}

// Only replace this generated directory after the source graph passes validation.
await fs.rm(output, { recursive: true, force: true });
for (const [filename, text] of files) {
  const destination = path.join(output, path.relative(root, filename));
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, text);
}
await fs.cp(path.join(root, "public"), path.join(output, "public"), { recursive: true });
await fs.copyFile(path.join(root, "postcss.config.cjs"), path.join(output, "postcss.config.cjs"));
await fs.copyFile(path.join(root, "docs/react-integration.md"), path.join(output, "README.md"));
await fs.writeFile(path.join(output, "package.json"), JSON.stringify({
  name: "@holler/react-ui", version: "0.1.0", private: true, type: "module",
  description: "Holler React/Mantine component source for integration into an existing React app",
  exports: { ".": "./src/ui/index.ts", "./styles.css": "./src/ui/styles.css" },
  sideEffects: ["**/*.css"], peerDependencies,
  devDependencies: {
    typescript: rootPackage.devDependencies.typescript,
    "@types/react": rootPackage.devDependencies["@types/react"],
    "@types/react-dom": rootPackage.devDependencies["@types/react-dom"],
    postcss: rootPackage.devDependencies.postcss,
    "postcss-preset-mantine": rootPackage.devDependencies["postcss-preset-mantine"],
    "postcss-simple-vars": rootPackage.devDependencies["postcss-simple-vars"],
  },
  scripts: { typecheck: "tsc --noEmit" },
}, null, 2) + "\n");
const { paths: _paths, ...compilerOptions } = parsed.raw.compilerOptions;
void _paths;
await fs.writeFile(path.join(output, "tsconfig.json"), JSON.stringify({
  compilerOptions, include: ["src", "examples"],
}, null, 2) + "\n");
console.log(`Exported ${files.size} source/style files to build/react-ui; ${packages.size} peer dependencies; presentation only; no application providers, backend SDKs, or @/ aliases.`);
