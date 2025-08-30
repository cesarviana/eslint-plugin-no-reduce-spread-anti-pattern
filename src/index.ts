import noReduceSpreadAntiPattern from './rules/no-reduce-spread-anti-pattern';

const rules = {
  'no-reduce-spread-anti-pattern': noReduceSpreadAntiPattern,
};

const configs = {
  recommended: {
    name: 'no-reduce-spread-anti-pattern/recommended',
    plugins: {
      'no-reduce-spread-anti-pattern': {
        rules,
      },
    },
    rules: {
      'no-reduce-spread-anti-pattern/no-reduce-spread-anti-pattern': 'error',
    },
  },
};

export = {
  rules,
  configs,
};
