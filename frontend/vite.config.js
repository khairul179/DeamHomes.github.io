// frontend/vite.config.js
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// ESM-safe __dirname
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    // Correct base for GH Pages project site
    base: isProd ? "/DeamHomes.github.io/" : "/",

    plugins: [react()],

    server: {
      port: 5173,
      proxy: {
        "/api": { target: "http://localhost:4000", changeOrigin: true },
      },
    },

    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },

    build: {
      outDir: "dist",
      target: "es2019",
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // split a few heavy libs so main bundle isn't huge
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react-helmet-async")) return "react-helmet-async";
              if (id.includes("react-router")) return "react-router";
              if (id.includes("framer-motion")) return "framer-motion";
            }
          },
        },
      },
      commonjsOptions: {
        include: [/node_modules/],
      },
    },

    // pre-bundle to avoid initial resolve hiccups
    optimizeDeps: {
      include: ["react-helmet-async"],
    },
  };
});
