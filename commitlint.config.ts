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
    'header-max-length': [2, 'always', 82],
    'subject-full-stop': [2, 'always', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'scope-case': [2, 'always', 'upper-case'],
    'subject-case': [2, 'always', 'sentence-case'],
  },
};
