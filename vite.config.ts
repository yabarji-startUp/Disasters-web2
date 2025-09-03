import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Chunk principal React
          'react-vendor': ['react', 'react-dom'],
          
          // C4 - Three.js optimisé (approche simplifiée)
          'three-vendor': ['three'],
          
          // Chunk utilitaires
          'utils-vendor': ['lodash'],
          
          // Chunk icônes
          'icons-vendor': ['lucide-react']
        },
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop();
          if (ext === 'css') return `css/[name]-[hash].${ext}`;
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) return `images/[name]-[hash].${ext}`;
          return `assets/[name]-[hash].${ext}`;
        },
        // C4 - Optimisations avancées
        compact: true
      }
    },
    minify: 'esbuild',
    chunkSizeWarningLimit: 500, // Augmenté pour Three.js
    sourcemap: false,
    assetsInlineLimit: 4096,
    // Optimisations C4 : Compression avancée
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: true
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'three', 'lodash'],
    esbuildOptions: {
      target: 'es2020',
      supported: {
        bigint: true
      }
    }
  },
  server: {
    hmr: {
      overlay: false
    }
  }
});
