module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
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
    "react/display-name": [0, { ignoreTranspilerName: 1 }],
    quotes: [1, 'single', { avoidEscape: true }],
    "no-use-before-define": "off",
    // "react/jsx-filename-extension": "on",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  globals: {
    fetch: false,
  },
}
