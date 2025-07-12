import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import noReduceSpreadBadPattern from "./dist";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["src/**/*.ts", "tests/**/*.ts"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
    },
    plugins: {
      "no-reduce-spread-bad-pattern": noReduceSpreadBadPattern,
    },
    rules: {
      ...noReduceSpreadBadPattern.configs.recommended.rules,
    },
  },
]);
