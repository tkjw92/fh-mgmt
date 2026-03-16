import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      // Proxy requests that start with '/api'
      "/api": {
        target: "http://192.168.24.3:7557", // the address of your backend server
        changeOrigin: true, // needed for the backend to receive requests from the correct origin
        rewrite: (path) => path.replace(/^\/api/, ""), // rewrite the path (optional, depends on backend setup)
      },
    },
  },
});
