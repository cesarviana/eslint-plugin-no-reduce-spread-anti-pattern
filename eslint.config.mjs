import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import noReduceSpreadAntiPattern from "./dist/index.js";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["src/**/*.ts", "tests/**/*.ts"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
    },
    plugins: {
      "no-reduce-spread-anti-pattern": noReduceSpreadAntiPattern,
    },
    rules: {
      ...noReduceSpreadAntiPattern.configs.recommended.rules,
    },
  },
]);
