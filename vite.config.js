import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/pokedex-vite-app/",
  server: {
    port: 5000,
  },
});
