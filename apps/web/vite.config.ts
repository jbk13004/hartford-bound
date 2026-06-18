import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: mode === 'production' ? '/hartford-bound/' : '/', // Only use base path in production
  resolve: {
    alias: {
      '@': '/src',
    },
  },
}))
