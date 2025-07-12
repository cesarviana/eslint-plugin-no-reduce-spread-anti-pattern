const rule = {
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
        if (
          node.callee?.type === "MemberExpression" &&
          node.callee.property.type === "Identifier" &&
          node.callee.property.name === "reduce" &&
          node.arguments.length > 0
        ) {
          const callback = node.arguments[0];
          if (
            callback?.type === "FunctionExpression" ||
            callback?.type === "ArrowFunctionExpression" ||
            callback?.body
          ) {
            // Find all return statements in the callback
            const returns: any[] = [];
            function findReturns(n: any) {
              if (!n) return;
              if (n.type === "ReturnStatement" && n.argument) {
                returns.push(n.argument);
              } else if (n.type === "BlockStatement" && n.body) {
                n.body.forEach(findReturns);
              } else if (Array.isArray(n)) {
                n.forEach(findReturns);
              }
            }
            findReturns(callback.body);
            for (const ret of returns) {
              if (
                ret.type === "ArrayExpression" &&
                ret.elements.some(
                  (el: any) => el && el.type === "SpreadElement"
                )
              ) {
                context.report({ node: ret, messageId: "badReduceSpread" });
              }
            }
          }
        }
      },
    };
  },
};

export default rule;
