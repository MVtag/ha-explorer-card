import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/ha-explorer-card.ts",
      formats: ["es"],
      fileName: () => "ha-explorer-card.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
