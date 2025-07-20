import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// const BASE_PATH = "weather";

export default defineConfig({
  // base: `/${BASE_PATH}`,
  // define: {BASE_PATH: JSON.stringify(BASE_PATH)},
  plugins: [react()],
});
