import { defineConfig } from 'vite'
import { createRequire } from 'node:module';
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: import.meta.dirname,
  plugins: [react()],
  base: '/verde/',
  envPrefix: 'VERDE',
  clearScreen: false,
  resolve: {
    alias: {
      fs: createRequire( import.meta.url ).resolve('node:fs'),
    },
  },
  build: {
    outDir: './dist/',
    target: 'esnext',
    minify: 'esbuild',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  }
});
