import noReduceSpreadBadPattern from './rules/no-reduce-spread-bad-pattern';

const rules = {
  'no-reduce-spread-bad-pattern': noReduceSpreadBadPattern,
};

const configs = {
  recommended: {
    name: 'no-reduce-spread-bad-pattern/recommended',
    plugins: {
      'no-reduce-spread-bad-pattern': {
        rules,
      },
    },
    rules: {
      'no-reduce-spread-bad-pattern/no-reduce-spread-bad-pattern': 'error',
    },
  },
};

export = {
  rules,
  configs,
};
