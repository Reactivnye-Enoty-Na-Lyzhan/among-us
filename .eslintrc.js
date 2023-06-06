module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'react', 'react-hooks'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/no-explicit-any': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'eol-last': ['error', 'always'],
    semi: ['error', 'always'],
  },
  ignorePatterns: ['node_modules/', 'dist/', 'dist-ssr/', 'public/'],
  overrides: [
    {
      files: ['*.cjs'],
      rules: { '@typescript-eslint/no-var-requires': 'off' },
    },
  ],
};
