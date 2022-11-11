export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feature',
        'styles',
        'tests',
        'refactoring',
        'revert',
        'fix',
        'hotfix',
        'docs',
        'ci',
      ],
    ],
  },
};
