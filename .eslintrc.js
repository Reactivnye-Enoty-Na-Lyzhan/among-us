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
  plugins: ['@typescript-eslint',
            "import",
            "jsx-a11y",
            "react",
            "react-hooks"
        ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    "eol-last": ["error", "always"],
    "semi": ['error', 'always'],
  },
};
