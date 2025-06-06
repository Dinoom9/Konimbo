import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    target: 'node18',
    lib: {
      entry: 'index.ts',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['express', 'cors', 'fs', 'path']
    }
  },
  server: {
    port: 3001
  }
}); 