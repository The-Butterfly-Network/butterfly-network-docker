import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: ['localhost', '127.0.0.1', 'status.butterfly-network.win'],
  },
  preview: {
    host: "0.0.0.0",
    port: 8011,
    strictPort: true,
    allowedHosts: ['localhost', '127.0.0.1', 'status.butterfly-network.win'],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react-router-dom']
  }
}));
