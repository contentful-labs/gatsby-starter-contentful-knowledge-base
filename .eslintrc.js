module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    module: '',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
};
