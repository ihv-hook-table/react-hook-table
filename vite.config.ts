import { defineConfig } from 'vite-plus';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  lint: {
    ignorePatterns: ['dist', 'node_modules'],
    plugins: ['oxc', 'typescript', 'unicorn', 'react', 'vitest'],
    categories: {
      correctness: 'warn',
    },
    env: {
      builtin: true,
    },
    overrides: [
      {
        files: ['**/*.{ts,tsx}'],
        rules: {
          'react/jsx-curly-brace-presence': [
            'error',
            {
              props: 'never',
              children: 'never',
            },
          ],
          'react/rules-of-hooks': 'error',
          'react/exhaustive-deps': 'warn',
          'react/only-export-components': [
            'warn',
            {
              allowConstantExport: true,
            },
          ],
        },
        env: {
          es2020: true,
          browser: true,
        },
      },
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 80,
    tabWidth: 2,
    arrowParens: 'avoid',
    semi: true,
    sortPackageJson: false,
    ignorePatterns: [],
  },
  staged: {
    '*': 'vp check --fix',
  },
  pack: {
    entry: 'src/hook-table/index.ts',
    name: '@iff/react-hook-table',
    sourcemap: false,
    format: 'esm',
    minify: true,
    dts: {
      build: true,
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
});
