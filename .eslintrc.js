module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  root: true,
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 0
  }
};
