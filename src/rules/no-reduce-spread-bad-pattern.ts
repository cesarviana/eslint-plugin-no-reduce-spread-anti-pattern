export default {
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
  create(context: any) {
    return {
      CallExpression(node: any) {
        if (_isReduce(node)) {
          const callback = node.arguments[0];
          const acc = callback.params[0];
          const returns = _findReturns(callback.body);
          for (const ret of returns) {
            if (_isArrayWithSomeSpreadElement(ret, acc)) {
              context.report({ node: ret, messageId: "badReduceSpread" });
            }
            if (ret.type === "ObjectExpression") {
              for (const prop of ret.properties) {
                const isTheAccumulator = prop.argument?.name === acc.name;
                if (prop.type === "SpreadElement" && isTheAccumulator) {
                  context.report({
                    node: prop,
                    messageId: "badReduceSpread",
                  });
                }
              }
            }
          }
        }
      },
    };
  },
};

function _isReduce(node: any) {
  return (
    node.callee?.type === "MemberExpression" &&
    node.callee.property.type === "Identifier" &&
    node.callee.property.name === "reduce" &&
    node.arguments.length > 0
  );
}

function _isArrayWithSomeSpreadElement(ret: any, acc: any) {
  return (
    ret.type === "ArrayExpression" &&
    ret.elements.some((el: any) => {
      const isSpread = el?.type === "SpreadElement";
      const isTheAccumulator = el?.argument?.name === acc.name;
      return isSpread && isTheAccumulator;
    })
  );
}

function _findReturns(node: any) {
  const returns: any[] = [];
  function _find(node: any) {
    if (!node) return;
    if (node.type === "ReturnStatement" && node.argument) {
      returns.push(node.argument);
    } else if (node.type === "BlockStatement" && node.body) {
      node.body.forEach(_find);
    } else if (node.type === "IfStatement" && node.consequent) {
      _find(node.consequent);
    }
  }
  _find(node);
  if (returns.length === 0) {
    returns.push(node);
  }
  return returns;
}
