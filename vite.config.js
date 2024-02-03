import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}']
      },
      manifest: {
        name: "공책 Note, Book",
        short_name: "공책 Note, Book",
        display: "standalone",
        description: "app description",
        lang: "ko-KR",
        icons: [
          {
            src: "/img/icons/android-icon-36x36.png",
            sizes: "36x36",
            type: "image/png"
          },
          {
            src: "/img/icons/android-icon-48x48.png",
            sizes: "48x48",
            type: "image/png"
          },
          {
            src: "/img/icons/android-icon-72x72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "/img/icons/android-icon-96x96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "/img/icons/android-icon-144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/img/icons/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          }
        ],
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://www.aladin.co.kr/ttb",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  },
});
