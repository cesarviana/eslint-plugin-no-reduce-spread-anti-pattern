"use strict";

import { RuleTester } from "eslint";
import rule from "../src/rules/no-reduce-spread-bad-pattern";

const ruleTester = new RuleTester();

describe("no-reduce-spread-bad-pattern", () => {
  describe("arrays", () => {
    it("is invalid when spread operator in array", () => {
      _isInvalid("arr.reduce((acc, val) => { return [...acc, ...val] }, []);");
    });

    it("is invalid when spread operator in array in function with multiple returns", () => {
      _isInvalid(
        `arr.reduce((acc, val) => { 
          if (val) { return [...acc, ...val] }
          return acc 
         }, []);
        `
      );
    });

    it('is invalid when spread operator in array, without "return"', () => {
      _isInvalid("arr.reduce((acc, val) => [...acc, val], []);");
    });

    it("is valid if spread is in other element than accumulator", () => {
      _isValid("arr.reduce((acc, val) => [...val], []);");
    });
  });

  describe("objects", () => {
    it("is invalid when spread operator in object", () => {
      _isInvalid("obj.reduce((acc, val) => ({ ...acc, ...val }), {});");
    });

    it("is valid if spread is in other element than accumulator", () => {
      _isValid("obj.reduce((acc, val) => ({ ...val }), {});");
    });

    it('is invalid when spread operator in object, without "return"', () => {
      _isInvalid("obj.reduce((acc, val) => ({ ...acc, ...val }), {});");
    });
  });
});

function _isValid(code: string) {
  ruleTester.run("no-reduce-spread-bad-pattern", rule, {
    valid: [{ code }],
    invalid: [],
  });
}

function _isInvalid(code: string) {
  ruleTester.run("no-reduce-spread-bad-pattern", rule, {
    valid: [],
    invalid: [
      {
        code,
        errors: [{ messageId: "badReduceSpread" }],
      },
    ],
  });
}