import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // Aplikasi langsung update saat ada perubahan
      includeAssets: ["favicon.ico", "rocket.png"], // Aset statis untuk offline
      manifest: {
        name: "Todo App Rocket",
        short_name: "TodoRocket",
        description: "Aplikasi Todo dengan fitur Offline & Testing",
        theme_color: "#1e6f9f",
        background_color: "#1a1a1a",
        display: "standalone",
        icons: [
          {
            src: "rocket.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "rocket.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // Caching data API agar bisa dibuka offline (Kriteria 3.2)
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.origin === "https://jsonplaceholder.typicode.com",
            handler: "NetworkFirst",
            options: {
              cacheName: "api-todo-cache",
            },
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});
