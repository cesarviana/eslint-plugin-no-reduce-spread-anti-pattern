"use strict";

import { RuleTester } from "eslint";
import rule from "../src/rules/no-reduce-spread-bad-pattern";

const ruleTester = new RuleTester();

describe("no-reduce-spread-bad-pattern", () => {
  ruleTester.run("no-reduce-spread-bad-pattern", rule, {
    valid: [
      // {
      //   code: "const arr = [1, 2, 3];",
      // },
      // {
      //   code: "function foo(a, b) { return a + b; }",
      // },
      // {
      //   code: "arr.reduce((acc, val) => acc.concat(val), []);",
      // },
      // {
      //   code: "arr.reduce((acc, val) => { acc.push(val); return acc; }, []);",
      // },
      // {
      //   code: "arr.reduce((acc, val) => ({ ...acc, ...val }), {});",
      // },
      // {
      //   code: "arr.reduce((acc, val) => ({ ...acc, foo: val }), {});",
      // },
      // {
      //   code: "arr.reduce((acc, val) => ({ bar: 1, ...acc }), {});",
      // },
      // {
      //   code: "arr.reduce((acc, val) => ({ ...val, ...acc }), {});",
      // },
    ],
    invalid: [
      // {
      //   code: "arr.reduce((acc, val) => [...acc, ...val], []);",
      //   errors: [{ messageId: "badReduceSpread" }],
      // },
      // {
      //   code: "arr.reduce((acc, val) => [0, ...acc, ...val], []);",
      //   errors: [{ messageId: "badReduceSpread" }],
      // },
      // {
      //   code: "arr.reduce((acc, val) => [...acc, val], []);",
      //   errors: [{ messageId: "badReduceSpread" }],
      // },
      // {
      //   code: "arr.reduce((acc, val) => [...val, ...acc], []);",
      //   errors: [{ messageId: "badReduceSpread" }],
      // },
      // {
      //   code: "arr.reduce((acc, val) => ({ ...acc, ...val, foo: 1 }), {});",
      //   errors: [{ messageId: "badReduceSpread" }],
      // },
      // {
      //   code: "arr.reduce((acc, val) => ({ ...acc, bar: val, ...val }), {});",
      //   errors: [{ messageId: "badReduceSpread" }],
      // },
      {
        code: "arr.reduce((acc, val) => { return { ...acc, ...val }; }, {});",
        errors: [{ messageId: "badReduceSpread" }],
      },
    ],
  });
});
