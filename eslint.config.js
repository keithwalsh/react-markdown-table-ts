/**
 * @fileoverview ESLint flat config: recommended JavaScript and TypeScript
 * rules everywhere, plus the React hooks rules for the source and tests.
 */

import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'storybook-static']),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['src/tests/**'],
    languageOptions: { globals: { ...globals.jest, ...globals.node } },
    rules: {
      // Tests pass deliberately invalid props to check validation and fallbacks
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.{cjs,mjs}', '*.config.{js,ts}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]);
