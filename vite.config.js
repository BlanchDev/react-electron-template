import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [react()],
    base: "./",

    // Electron
    electron: {
      main: {
        input: "electron/main.js",
        vite: {
          build: {
            outDir: "dist-electron/main",
            rollupOptions: {
              external: ["electron"],
            },
          },
        },
      },
      preload: {
        input: "electron/preload.js",
        vite: {
          build: {
            outDir: "dist-electron/preload",
            rollupOptions: {
              external: ["electron"],
            },
          },
        },
      },
    },

    // SCSS settings
    css: {
      preprocessorOptions: {
        scss: {
          // Development more detailed output
          outputStyle: isProd ? "compressed" : "expanded",
          // Source maps
          sourceMap: !isProd,
        },
      },
      // CSS devtools'da better debugging
      devSourcemap: !isProd,
    },

    server: {
      port: 5173,
      // HMR settings
      hmr: {
        overlay: true,
      },
      // Faster during development
      watch: {
        usePolling: false,
      },
    },

    build: {
      outDir: "dist-react",
      emptyOutDir: true,
      // Source map only during development
      sourcemap: !isProd,

      // Remove console.log in production
      minify: isProd,

      // Split chunks
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
          },
        },
      },
    },

    // Exclude Electron
    optimizeDeps: {
      exclude: ["electron"],
    },

    // Better error messages
    esbuild: {
      logOverride: {
        "this-is-undefined-in-esm": "silent",
      },
    },
  };
});
