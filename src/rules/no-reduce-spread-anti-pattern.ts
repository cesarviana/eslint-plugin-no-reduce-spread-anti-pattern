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
    const messageId = "badReduceSpread";
    return {
      CallExpression(node: any) {
        if (_isReduce(node)) {
          const { callback, accumulator } =
            _extractCallbackAndAccumulator(node);
          if (!callback || !accumulator) return;
          const returns = _findReturns(callback.body);
          for (const _return of returns) {
            if (_isArrayWithSomeSpreadElement(_return, accumulator)) {
              context.report({ node: _return, messageId });
            }
            if (_return.type === "ObjectExpression") {
              for (const prop of _return.properties) {
                const isTheAccumulator =
                  prop.argument?.name === accumulator.name;
                if (prop.type === "SpreadElement" && isTheAccumulator) {
                  context.report({
                    node: prop,
                    messageId,
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

function _extractCallbackAndAccumulator(node: any) {
  const [arg1, arg2] = node.arguments;
  if (_isFunction(arg1)) {
    return {
      callback: arg1,
      accumulator: arg2,
    };
  }
  if (_isFunction(arg2)) {
    return {
      callback: arg2,
      accumulator: arg1,
    };
  }
  return {
    callback: null,
    accumulator: null,
  };
}

function _isFunction(node: any) {
  return node.type?.includes("Function");
}

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
