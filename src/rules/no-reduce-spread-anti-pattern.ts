import type { Rule } from "eslint";
import type {
  CallExpression,
  Node,
  Function as ESFunction,
  ReturnStatement,
  ArrayExpression,
  ObjectExpression,
  SpreadElement,
  BlockStatement,
  IfStatement,
  Identifier,
} from "estree";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Disallow using the spread operator in Array.reduce",
      recommended: false,
    },
    messages: {
      badReduceSpread:
        "Avoid using the spread operator inside Array.reduce callbacks.",
    },
    schema: [],
  },
  create(context: Rule.RuleContext) {
    const messageId = "badReduceSpread";
    return {
      CallExpression(node: CallExpression) {
        if (_isReduce(node)) {
          const callback = _extractCallback(node);
          if (!callback) return;
          const accumulator = callback.params?.[0] as Identifier;
          if (!accumulator) return;

          const returns = _findReturns(callback.body);

          for (const _return of returns) {
            if (_isArrayWithSomeSpreadElement(_return, accumulator)) {
              context.report({ node: _return, messageId });
            }
            if (_return.type === "ObjectExpression") {
              const objExpr = _return as ObjectExpression;
              for (const prop of objExpr.properties) {
                if (prop.type === "SpreadElement") {
                  const spreadElement = prop as SpreadElement;
                  const isTheAccumulator =
                    (spreadElement.argument as Identifier)?.name ===
                    accumulator.name;
                  if (isTheAccumulator) {
                    context.report({
                      node: prop,
                      messageId,
                    });
                  }
                }
              }
            }
          }
        }
      },
    };
  },
};

export default rule;

function _extractCallback(node: CallExpression): ESFunction | null {
  const [arg1, arg2] = node.arguments;
  if (_isFunction(arg1)) {
    return arg1 as ESFunction;
  }
  if (_isFunction(arg2)) {
    return arg2 as ESFunction;
  }
  return null;
}

function _isFunction(node: Node): boolean {
  return node.type?.includes("Function");
}

function _isReduce(node: CallExpression): boolean {
  return (
    node.callee?.type === "MemberExpression" &&
    node.callee.property.type === "Identifier" &&
    (node.callee.property as Identifier).name === "reduce" &&
    node.arguments.length > 0
  );
}

function _isArrayWithSomeSpreadElement(ret: Node, acc: Identifier): boolean {
  return (
    ret.type === "ArrayExpression" &&
    (ret as ArrayExpression).elements.some((el) => {
      if (!el) return false;
      const isSpread = el.type === "SpreadElement";

      if (!isSpread) return false;

      const spread = el as SpreadElement;

      const isTheAccumulator =
        (spread.argument as Identifier).name === acc.name;

      return isTheAccumulator;
    })
  );
}

function _findReturns(node: Node): Node[] {
  const returns: Node[] = [];
  function _find(node: Node | null | undefined): void {
    if (!node) return;
    if (node.type === "ReturnStatement") {
      const returnStmt = node as ReturnStatement;
      if (returnStmt.argument) {
        returns.push(returnStmt.argument);
      }
    } else if (node.type === "BlockStatement") {
      const blockStmt = node as BlockStatement;
      if (blockStmt.body) {
        blockStmt.body.forEach(_find);
      }
    } else if (node.type === "IfStatement") {
      const ifStmt = node as IfStatement;
      if (ifStmt.consequent) {
        _find(ifStmt.consequent);
      }
    }
  }
  _find(node);
  if (returns.length === 0) {
    returns.push(node);
  }
  return returns;
}
