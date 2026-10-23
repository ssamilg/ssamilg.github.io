import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { versionArchives } from './scripts/serve-archives.mjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), versionArchives()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
