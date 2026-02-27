import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import AutoImport from 'unplugin-auto-import/rspack';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/rspack';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginVue()],
  tools: {
    rspack: {
      plugins: [
        AutoImport({
          imports: ['vue'],
          resolvers: [ElementPlusResolver()],
          dts: './src/auto-imports.d.ts',
        }),
        Components({
          resolvers: [ElementPlusResolver()],
          dts: './src/components.d.ts',
        }),
      ],
    },
  },
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
