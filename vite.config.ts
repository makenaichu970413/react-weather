import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// const BASE_PATH = "weather";

export default defineConfig({
  // base: `/${BASE_PATH}`,
  // define: {BASE_PATH: JSON.stringify(BASE_PATH)},
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/*",
          dest: "assets",
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
