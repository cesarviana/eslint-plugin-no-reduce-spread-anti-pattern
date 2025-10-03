# ESLint Plugin: no-reduce-spread-anti-pattern

[![CI](https://github.com/cesarviana/eslint-plugin-no-reduce-spread-anti-pattern/actions/workflows/ci.yml/badge.svg)](https://github.com/cesarviana/eslint-plugin-no-reduce-spread-anti-pattern/actions/workflows/ci.yml)

This is an ESLint v9 plugin that provides a rule to disallow bad patterns while combining reduce + spread.
To add it to your project, run

```sn
yarn add --dev eslint-plugin-no-reduce-spread-anti-pattern
```

## Getting Started

1. Install dependencies:
   ```sh
   yarn install
   ```
2. Build the project:
   ```sh
   yarn build
   ```
3. Run tests:
   ```sh
   yarn test
   ```

## Development

This project uses GitHub Actions for continuous integration. The CI workflow:
- Tests the project on Node.js versions 18.x, 20.x, and 22.x
- Runs linting, building, and tests
- Validates package contents before publishing

The workflow runs automatically on:
- Push to the `main` branch
- Pull requests to the `main` branch

## Usage (ESLint 9+ Flat Config)

Add this plugin to your ESLint configuration:

```js
// eslint.config.js
import noReduceSpreadAntiPattern from "eslint-plugin-no-reduce-spread-anti-pattern";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    plugins: {
      "no-reduce-spread-anti-pattern": noReduceSpreadAntiPattern,
    },
    rules: {
      "no-reduce-spread-anti-pattern/no-reduce-spread-anti-pattern": "error",
    },
  },
]);
```

If you want to use a shareable config (if provided by this plugin):

```js
import noSpreadAntiPattern from "eslint-plugin-no-reduce-spread-anti-pattern";
import { defineConfig } from "eslint/config";

export default defineConfig([
  noSpreadAntiPattern.configs?.recommended,
]);
```

---

For more details, see the [ESLint flat config documentation](https://eslint.org/docs/latest/use/configure/configuration-files).
