import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // Build sonrası beyaz ekran yememek için şart
  server: {
    port: 5173,
    strictPort: true, // Port 5173 doluysa hata ver, başka porta geçme
  },
  build: {
    outDir: "dist", // React buraya derlenecek
    emptyOutDir: true,
  },
});
