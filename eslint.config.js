import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default [
  {
    files: ['**/src/**/*.{js,jsx,ts,tsx}'], // Solo archivos fuente
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/build/**',
      '**/coverage/**',
      '**/*.spec.ts',
      '**/*.e2e-spec.ts',
      '**/*.d.ts',
      '**/backend/dist/**',
      '**/frontend/.next/**',
      '**/frontend/dist/**',
    ],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/no-extraneous-dependencies': 'error',
    },
  },
  {
    files: ['**/backend/src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: resolve(__dirname, 'backend/tsconfig.json'),
        tsconfigRootDir: resolve(__dirname, 'backend'),
      },
    },
  },
  {
    files: ['**/frontend/src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: resolve(__dirname, 'frontend/tsconfig.json'),
        tsconfigRootDir: resolve(__dirname, 'frontend'),
      },
    },
  },
  {
    files: ['**/backend/dist/**/*', '**/frontend/.next/**/*'], // Ignorar archivos generados
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
]
