// Service Worker pour cache offline et optimisation C4
// Auteur : Yassen ABARJI
// Date : 04/09/2025
// Version : v1.0

const CACHE_NAME = 'disaster-web2-v1.0'
const STATIC_CACHE = 'static-v1.0'
const DYNAMIC_CACHE = 'dynamic-v1.0'

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/js/react-vendor-*.js',
  '/js/three-vendor-*.js',
  '/js/utils-vendor-*.js',
  '/js/icons-vendor-*.js',
  '/css/index-*.css',
  '/assets/index-*.js'
]

// Stratégie : Cache First pour les ressources statiques
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker installé')
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('📦 Cache statique ouvert')
        return cache.addAll(STATIC_ASSETS)
      })
      .catch(error => {
        console.warn('⚠️ Erreur cache statique:', error)
      })
  )
})

// Stratégie : Cache First avec fallback réseau
self.addEventListener('fetch', (event) => {
  const { request } = event
  
  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') return
  
  // Stratégie pour les ressources statiques
  if (isStaticAsset(request.url)) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            console.log('✅ Ressource servie depuis le cache:', request.url)
            return response
          }
          
          // Fallback réseau
          return fetch(request)
            .then(networkResponse => {
              // Mettre en cache pour la prochaine fois
              if (networkResponse.ok) {
                const responseClone = networkResponse.clone()
                caches.open(DYNAMIC_CACHE)
                  .then(cache => cache.put(request, responseClone))
              }
              return networkResponse
            })
        })
        .catch(() => {
          // Fallback en cas d'erreur réseau
          console.warn('⚠️ Erreur réseau, utilisation du cache:', request.url)
          return caches.match('/index.html')
        })
    )
  } else {
    // Stratégie : Network First pour les API
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            // Mettre en cache les réponses API réussies
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE)
              .then(cache => cache.put(request, responseClone))
          }
          return response
        })
        .catch(() => {
          // Fallback cache pour les API
          return caches.match(request)
        })
    )
  }
})

// Nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker activé')
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Suppression ancien cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
  )
})

// Fonction utilitaire pour identifier les ressources statiques
function isStaticAsset(url) {
  const staticPatterns = [
    /\.js$/,
    /\.css$/,
    /\.png$/,
    /\.jpg$/,
    /\.svg$/,
    /\.woff$/,
    /\.woff2$/
  ]
  
  return staticPatterns.some(pattern => pattern.test(url))
}

// Message handler pour communication avec l'app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    event.ports[0].postMessage({
      type: 'CACHE_INFO',
      staticCache: STATIC_CACHE,
      dynamicCache: DYNAMIC_CACHE,
      version: '1.0'
    })
  }
}) 