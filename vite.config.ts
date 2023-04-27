import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import terser from '@rollup/plugin-terser'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    terser({
      compress: {
        drop_console: true, // 删除console语句
        collapse_vars: true,
        reduce_vars: true
      },
      format: {
        beautify: false,
        indent_level: 0,
        comments: false
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./examples', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'Nxui',
      formats: ['es', 'umd', 'cjs'],
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
