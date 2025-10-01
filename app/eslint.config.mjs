import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  js.configs.recommended,
];
