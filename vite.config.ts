import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Optimisations de build pour éco-conception
  build: {
    // Code splitting avancé
    rollupOptions: {
      output: {
        // Chunks manuels pour optimiser le chargement
        manualChunks: {
          // Chunk principal React
          'react-vendor': ['react', 'react-dom'],
          
          // Chunk Three.js (lourd)
          'three-vendor': ['three'],
          
          // Chunk utilitaires
          'utils-vendor': ['lodash'],
          
          // Chunk icônes
          'icons-vendor': ['lucide-react']
        },
        
        // Optimisation des noms de chunks
        chunkFileNames: () => {
          return `js/[name]-[hash].js`;
        },
        
        // Optimisation des assets
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name]-[hash].[ext]`;
          
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        }
      }
    },
    
    // Optimisations de compression
    minify: 'esbuild', // Utiliser esbuild par défaut (plus rapide)
    
    // Limite de taille des chunks
    chunkSizeWarningLimit: 300, // Avertir si chunk > 300 kB
    
    // Source maps pour debug (désactivé en production)
    sourcemap: false,
    
    // Optimisation des assets
    assetsInlineLimit: 4096, // Inline assets < 4 kB
  },
  
  // Optimisation des dépendances
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'three', 'lodash'],
    
    // Pré-bundling des dépendances communes
    esbuildOptions: {
      target: 'es2020',
      supported: {
        bigint: true
      }
    }
  },
  
  // Optimisation du serveur de développement
  server: {
    hmr: {
      overlay: false // Désactiver l'overlay d'erreur pour performance
    }
  }
});
