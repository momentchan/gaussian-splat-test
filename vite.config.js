import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
import { resolve } from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";
import crossOriginIsolation from "vite-plugin-cross-origin-isolation";

export default {
  base: "./",
  resolve: {
    alias: {
      "@packages": resolve(__dirname, "packages"),
      three: resolve(__dirname, "node_modules/three"),
    },
  },
  plugins: [
    react(),
    glsl(),
    basicSsl(),
    crossOriginIsolation(),
  ],
  server: {
    host: true,
    https: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
  },
};
