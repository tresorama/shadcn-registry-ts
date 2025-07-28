import path from 'path';
// import { defineConfig } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "#root": __dirname,
    },
  },
  // test: {
  //   // ...
  // },
});