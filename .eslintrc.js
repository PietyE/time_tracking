// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    jest: true,
  },
  plugins: ['react', 'react-hooks', 'jsx'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'react/display-name': [0, { ignoreTranspilerName: 1 }],
    quotes: [1, 'single', { avoidEscape: true }],
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'warn',
    'jsx/uses-factory': [1, {'pragma': 'JSX'}],
    'jsx/factory-in-scope': [1, {'pragma': 'JSX'}],
    'jsx/mark-used-vars': 1,
    // 'jsx/no-undef': 1,
  },
  globals: {
    fetch: false,
  },
}
