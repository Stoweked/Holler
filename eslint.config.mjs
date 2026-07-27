import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const MAPLE_FETCH_MESSAGE =
  "Direct fetch to maple is not allowed; route through src/lib/maple/client.ts";

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/lib/maple/schema.d.ts",
    ],
  },
  {
    // SPEC 13 / G3: every maple request originates in src/lib/maple/client.ts so
    // the Cognito bearer token cannot be omitted.
    files: ["src/**/*.ts", "src/**/*.tsx"],
    ignores: ["src/lib/maple/**"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          // `.` stands in for the path separator: esquery cannot parse a literal
          // slash inside an attribute regex.
          selector: "CallExpression[callee.name='fetch'] Literal[value=/api.v1/]",
          message: MAPLE_FETCH_MESSAGE,
        },
        {
          selector:
            "CallExpression[callee.name='fetch'] TemplateElement[value.raw=/api.v1/]",
          message: MAPLE_FETCH_MESSAGE,
        },
        {
          selector: "MemberExpression[property.name='NEXT_PUBLIC_MAPLE_API_URL']",
          message:
            "Read the maple base URL only in src/lib/maple/client.ts; route requests through it.",
        },
      ],
    },
  },
];

export default eslintConfig;
