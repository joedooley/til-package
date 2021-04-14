'use strict';

module.exports = {
  env: {
    node: true,
    es2021: true,
    browser: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'plugin:cypress/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@babel', 'react', 'prettier', 'cypress'],
  rules: {
    'prettier/prettier': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'react/display-name': 'off',
    'react/jsx-key': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['./public/', './.next/'],
  globals: {
    __DEV__: 'readonly',
    __PROD__: 'readonly',
  },
};
