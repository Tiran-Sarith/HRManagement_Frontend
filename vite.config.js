import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Make the server accessible externally
    port: 5173,        // Ensure the port matches the one exposed in your Dockerfile
  },
})
