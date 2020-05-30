module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
  }
}
