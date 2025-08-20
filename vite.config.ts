import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// import dts from 'vite-plugin-dts';
import dtsBundleGenerator from 'unplugin-dts-bundle-generator/vite';

export default defineConfig({
  build: {
    lib: {
      entry: normalizePath('src/hook-table/index.ts'),
      name: '@iff/react-hook-table',
      formats: ['es'],
      fileName: format => `index.${format}.js`,
    },
    // to avoid bundling react and react-dom in the library
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
    emptyOutDir: true,
  },
  esbuild: {
    legalComments: 'none',
  },
  plugins: [
    react(),
    dtsBundleGenerator({
      fileName: 'index.d.ts',
      compilation: {
        preferredConfigPath: './tsconfig.app.json',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
