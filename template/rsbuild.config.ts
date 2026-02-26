import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginVue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/py-api': {
        target: 'http://localhost:8000',
        pathRewrite: {
          '^/py-api': '',
        },
        changeOrigin: true,
      },
    },
  },
});
