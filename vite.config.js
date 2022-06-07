import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const srcPath = path.resolve(__dirname, 'src', 'styles', 'variables.scss')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      sass: { additionalData: `@import ${srcPath}\n` },
      scss: { additionalData: `@import ${srcPath};\n` },
    },
  },
})
