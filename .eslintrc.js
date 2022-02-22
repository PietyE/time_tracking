module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    jest: true,
  },
  ecmaFeatures: {
    jsx: true,
  },
  plugins: ['react', 'react-hooks'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'react/display-name': [0, { ignoreTranspilerName: 1 }],
    quotes: [1, 'single', { avoidEscape: true }],
    'no-use-before-define': 'off',
    // "react/jsx-filename-extension": "on",
    // "react/prop-types": "on",
    'comma-dangle': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  globals: {
    fetch: false,
  },
}
