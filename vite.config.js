import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Set the port to run the app on the dev environment
    port: parseInt(process.env?.VITE_PORT) || 3000,
    // If the port is busy, vite fails and throws an error
    strictPort: true,
    watch: {
      usePolling: true, // Asegura que se detecten cambios en sistemas de archivos montados
    }
  },
})
