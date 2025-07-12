# ESLint Plugin: no-reduce-spread-bad-pattern

This is an ESLint v9 plugin that provides a rule to disallow bad patterns while combining reduce + spread.

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

## Usage (ESLint 9+ Flat Config)

Add this plugin to your ESLint configuration:

```js
// eslint.config.js
import noReduceSpreadBadPattern from "eslint-plugin-no-reduce-spread-bad-pattern";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    plugins: {
      "no-reduce-spread-bad-pattern": noReduceSpreadBadPattern,
    },
    rules: {
      "no-reduce-spread-bad-pattern/no-reduce-spread-bad-pattern": "error",
    },
  },
]);
```

If you want to use a shareable config (if provided by this plugin):

```js
import noSpreadBadPattern from "eslint-plugin-no-reduce-spread-bad-pattern";
import { defineConfig } from "eslint/config";

export default defineConfig([
  noSpreadBadPattern.configs?.recommended,
]);
```

---

For more details, see the [ESLint flat config documentation](https://eslint.org/docs/latest/use/configure/configuration-files).
