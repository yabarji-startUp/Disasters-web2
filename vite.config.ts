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
          
          // Chunk Three.js (lourd) - à optimiser
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
          const ext = assetInfo.name?.split('.').pop();
          if (ext === 'css') return `css/[name]-[hash].${ext}`;
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) return `images/[name]-[hash].${ext}`;
          return `assets/[name]-[hash].${ext}`;
        },
        // Compression ESBuild optimisée C4
        compact: true,
        // Optimisation des noms
        generatedCode: {
          preset: 'es2015',
          constBindings: true,
          objectShorthand: true,
          reservedNamesAsProps: false
        }
      }
    },
    
    // Optimisations de compression
    minify: 'esbuild', // Utiliser esbuild par défaut (plus rapide)
    
    // Limite de taille des chunks
    chunkSizeWarningLimit: 500, // Augmenté pour Three.js
    
    // Source maps pour debug (désactivé en production)
    sourcemap: false,
    
    // Optimisation des assets
    assetsInlineLimit: 4096, // Inline assets < 4 kB
    // Optimisations C4 : Compression avancée
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: true,
    // Compression ESBuild optimisée C4
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
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
      },
      // Optimisations de compression C4
      minify: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true
    }
  },
  
  // Optimisation du serveur de développement
  server: {
    hmr: {
      overlay: false // Désactiver l'overlay d'erreur pour performance
    }
  }
});
