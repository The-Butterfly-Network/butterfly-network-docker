import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: ['localhost', '127.0.0.1', 'www.mazeymoos.com', 'mazeymoos.com'],
  },
  preview: {
    host: "0.0.0.0",
    port: 8006,
    strictPort: true,
    allowedHosts: ['localhost', '127.0.0.1', 'www.mazeymoos.com', 'mazeymoos.com'],
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
