import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./examples', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'Nxui',
      formats: ['es', 'umd', 'cjs', 'iife'],
      fileName: (format) => `nxui.min.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'element-plus', 'vxe-table'],
      output: {
        globals: {
          vue: 'vue'
        }
      }
    },
    minify: false
  }
})