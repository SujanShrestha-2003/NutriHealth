import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      process: 'process/browser',
    },
  },
});
