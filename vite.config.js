import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Mi carrito',
        short_name: 'Carrito',
        description: 'Administrador de carrito de compras',
        theme_color: '#1F2937',
        icons: [
          {
            src: 'app-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'app-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'app-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
