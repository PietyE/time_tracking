module.exports = {
  root: true,
  parser: "babel-eslint",
  env: {
    browser: true,
    jest: true
  },
  ecmaFeatures: {
    jsx: true
  },
  plugins: ["react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    "react/display-name": [0, { ignoreTranspilerName: 1 }],
    quotes: [1, "single", { avoidEscape: true }],
    "no-use-before-define": "off",
    // "react/jsx-filename-extension": "on",
    // "react/prop-types": "on",
    "comma-dangle": "off"
  },
  globals: {
    fetch: false
  }
};
