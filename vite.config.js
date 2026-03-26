import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // ✅ FIX 1

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {                 // ✅ FIX 2 (moved here)
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      "/anilist": {
        target: "https://graphql.anilist.co",
        changeOrigin: true,
        rewrite: () => "",
      },
    },
  },
});