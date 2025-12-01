import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Todas as chamadas que começam por /api serão encaminhadas para o backend
      '/api': 'http://localhost:3001',
    }
  }
})
