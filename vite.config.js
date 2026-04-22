import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ts = Date.now()

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        entryFileNames:  `assets/[name]-[hash]-${ts}.js`,
        chunkFileNames:  `assets/[name]-[hash]-${ts}.js`,
        assetFileNames:  `assets/[name]-[hash]-${ts}[extname]`,
      }
    }
  }
})
