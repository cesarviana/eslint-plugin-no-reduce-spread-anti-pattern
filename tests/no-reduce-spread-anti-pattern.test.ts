"use strict";

import { RuleTester } from "eslint";
import rule from "../src/rules/no-reduce-spread-anti-pattern";

const ruleTester = new RuleTester();

describe("no-reduce-spread-anti-pattern", () => {
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

    it("is invalid when spread operator is in if condition", () => {
      _isInvalid(
        "arr.reduce((acc, val) => { if (condition1) return [...acc, val]; else if (condition2) return [...acc]; else return acc; }, []);"
      );
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

  it('is valid for non "reduce" calls', () => {
    _isValid("obj.map((acc, val) => ({ ...acc, ...val }), {});");
  });
});

function _isValid(code: string) {
  ruleTester.run("no-reduce-spread-anti-pattern", rule, {
    valid: [{ code }],
    invalid: [],
  });
}

function _isInvalid(code: string) {
  ruleTester.run("no-reduce-spread-anti-pattern", rule, {
    valid: [],
    invalid: [
      {
        code,
        errors: [{ messageId: "badReduceSpread" }],
      },
    ],
  });
}
