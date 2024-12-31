import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Or any port you prefer
    host: true, // Ensures it binds to 0.0.0.0
  },
})


