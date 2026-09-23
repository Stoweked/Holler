import ts from "typescript";
import path from "node:path";

const configPath = path.resolve("tsconfig.ui.json");
const config = ts.readConfigFile(configPath, ts.sys.readFile);
if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, "\n"));
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, path.dirname(configPath));
const program = ts.createProgram(parsed.fileNames, parsed.options);
const violations = [];
const root = path.resolve("src") + path.sep;
const portableFiles = program.getSourceFiles().filter((file) => file.fileName.startsWith(root));
for (const file of portableFiles) {
  const relative = path.relative(process.cwd(), file.fileName);
  if (/^src\/(app|lib\/(adapters|supabase))\//.test(relative)) {
    violations.push(`${relative}: implementation adapter reached from portable UI`);
  }
  function visit(node) {
    if (ts.isStringLiteral(node)) {
      if (node.text === "use server" || /^(next(?:\/|$)|@supabase\/|@vercel\/.*\/next$)/.test(node.text) || /https?:\/\/[^/]*supabase\./.test(node.text)) {
        violations.push(`${relative}: forbidden platform dependency ${node.text}`);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
}
if (violations.length) {
  console.error(violations.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`UI boundary check passed (${portableFiles.length} source files, including transitive dependencies).`);
}
