import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'

// const baseUrl = import.meta.env.VITE_BASE_URL;
// console.log(import.meta.env.BASE_URL)
// console.log(process.env.VITE_BASE_URL)
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 1. Tell Vite that all components starting with "foo-" are webcomponents
          // isCustomElement: (tag) => tag.startsWith('wokwi-'),
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
