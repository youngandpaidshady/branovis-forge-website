import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        projects: resolve(process.cwd(), 'projects.html'),
        blog: resolve(process.cwd(), 'blog.html'),
        contact: resolve(process.cwd(), 'contact.html')
      }
    },
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
        drop_debugger: true
      }
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  preview: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: []
  }
});
