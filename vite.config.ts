import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path';

// Plugin simple para redirigir /admin a /admin/index.html en el servidor de dev
const adminRewritePlugin = (): Plugin => ({
  name: 'admin-rewrite-plugin',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url && (req.url === '/admin' || req.url.startsWith('/admin/'))) {
        // Redirige las peticiones de /admin a su index.html estático
        if (!req.url.includes('.')) {
          req.url = '/admin/index.html'
        }
      }
      next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), adminRewritePlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
})
