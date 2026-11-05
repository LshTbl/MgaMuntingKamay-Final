import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Sends /api requests from the React app (port 5173) to the Express server (port 4242)
    proxy: {
      '/api': 'http://localhost:4242',
    },
  },
})
