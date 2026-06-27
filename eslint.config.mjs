import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "array-callback-return": "error",
      curly: ["error", "all"],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-else-return": ["error", { allowElseIf: false }],
      "no-implicit-coercion": "error",
      "no-lonely-if": "error",
      "no-nested-ternary": "error",
      "no-return-await": "error",
      "no-template-curly-in-string": "error",
      "no-throw-literal": "error",
      "no-unneeded-ternary": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-const": ["error", { destructuring: "all", ignoreReadBeforeAssign: true }],
      "prefer-template": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
    "components/ui/**",
    "hooks/use-mobile.ts",
    "public/drill-runner.worker.js",
  ]),
]);

export default eslintConfig;
