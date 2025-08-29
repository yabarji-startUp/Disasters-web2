// Service Worker pour optimisations C2 - Cache intelligent et réduction requêtes réseau
const CACHE_NAME = 'disaster-web2-cache-v1'
const STATIC_CACHE_NAME = 'disaster-web2-static-v1'
const DYNAMIC_CACHE_NAME = 'disaster-web2-dynamic-v1'

// Ressources à mettre en cache statique
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/big.css',
  '/static/big.js',
  '/static/large.webp',
  '/static/large.jpg'
]

// Configuration cache intelligent
const CACHE_CONFIG = {
  STATIC_TTL: 24 * 60 * 60 * 1000, // 24 heures
  DYNAMIC_TTL: 60 * 60 * 1000, // 1 heure
  API_TTL: 5 * 60 * 1000, // 5 minutes
  MAX_STATIC_SIZE: 50, // Entrées maximum
  MAX_DYNAMIC_SIZE: 100 // Entrées maximum
}

// Installation du service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Service Worker: Static assets cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static assets', error)
      })
  )
})

// Activation du service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activated successfully')
        return self.clients.claim()
      })
  )
})

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Stratégie cache-first pour les assets statiques
  if (isStaticAsset(url.pathname)) {
    event.respondWith(handleStaticAsset(request))
    return
  }

  // Stratégie network-first avec cache fallback pour les API
  if (isApiRequest(url.pathname)) {
    event.respondWith(handleApiRequest(request))
    return
  }

  // Stratégie cache-first pour les autres ressources
  event.respondWith(handleDynamicRequest(request))
})

// Vérifier si c'est un asset statique
function isStaticAsset(pathname) {
  return STATIC_ASSETS.includes(pathname) || 
         pathname.startsWith('/static/') ||
         pathname.endsWith('.css') ||
         pathname.endsWith('.js') ||
         pathname.endsWith('.webp') ||
         pathname.endsWith('.jpg')
}

// Vérifier si c'est une requête API
function isApiRequest(pathname) {
  return pathname.startsWith('/api/') || 
         pathname.includes('/metrics') ||
         pathname.includes('/data')
}

// Gestion des assets statiques (cache-first)
async function handleStaticAsset(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      console.log('Service Worker: Static asset served from cache', request.url)
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone())
      console.log('Service Worker: Static asset cached', request.url)
    }
    
    return networkResponse
  } catch (error) {
    console.error('Service Worker: Error handling static asset', error)
    return new Response('Static asset not available', { status: 404 })
  }
}

// Gestion des requêtes API (network-first avec cache fallback)
async function handleApiRequest(request) {
  try {
    // Essayer d'abord le réseau
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Mettre en cache avec TTL
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      const responseWithTTL = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: {
          ...Object.fromEntries(networkResponse.headers.entries()),
          'sw-cache-timestamp': Date.now().toString(),
          'sw-cache-ttl': CACHE_CONFIG.API_TTL.toString()
        }
      })
      
      await cache.put(request, responseWithTTL.clone())
      console.log('Service Worker: API response cached', request.url)
      
      return networkResponse
    }
    
    throw new Error('Network response not ok')
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache', request.url)
    
    // Fallback vers le cache
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      const timestamp = parseInt(cachedResponse.headers.get('sw-cache-timestamp') || '0')
      const ttl = parseInt(cachedResponse.headers.get('sw-cache-ttl') || '0')
      
      if (Date.now() - timestamp < ttl) {
        console.log('Service Worker: API response served from cache', request.url)
        return cachedResponse
      }
    }
    
    return new Response('API not available', { status: 503 })
  }
}

// Gestion des requêtes dynamiques (cache-first)
async function handleDynamicRequest(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      const timestamp = parseInt(cachedResponse.headers.get('sw-cache-timestamp') || '0')
      const ttl = parseInt(cachedResponse.headers.get('sw-cache-ttl') || CACHE_CONFIG.DYNAMIC_TTL.toString())
      
      if (Date.now() - timestamp < ttl) {
        console.log('Service Worker: Dynamic resource served from cache', request.url)
        return cachedResponse
      }
    }

    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const responseWithTTL = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: {
          ...Object.fromEntries(networkResponse.headers.entries()),
          'sw-cache-timestamp': Date.now().toString(),
          'sw-cache-ttl': CACHE_CONFIG.DYNAMIC_TTL.toString()
        }
      })
      
      await cache.put(request, responseWithTTL.clone())
      console.log('Service Worker: Dynamic resource cached', request.url)
    }
    
    return networkResponse
  } catch (error) {
    console.error('Service Worker: Error handling dynamic request', error)
    return new Response('Resource not available', { status: 404 })
  }
}

// Nettoyage périodique du cache
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEANUP_CACHE') {
    cleanupCache()
  }
})

async function cleanupCache() {
  try {
    const dynamicCache = await caches.open(DYNAMIC_CACHE_NAME)
    const requests = await dynamicCache.keys()
    const now = Date.now()
    
    for (const request of requests) {
      const response = await dynamicCache.match(request)
      if (response) {
        const timestamp = parseInt(response.headers.get('sw-cache-timestamp') || '0')
        const ttl = parseInt(response.headers.get('sw-cache-ttl') || CACHE_CONFIG.DYNAMIC_TTL.toString())
        
        if (now - timestamp > ttl) {
          await dynamicCache.delete(request)
          console.log('Service Worker: Expired cache entry removed', request.url)
        }
      }
    }
    
    console.log('Service Worker: Cache cleanup completed')
  } catch (error) {
    console.error('Service Worker: Error during cache cleanup', error)
  }
}

// Nettoyage automatique toutes les heures
setInterval(cleanupCache, 60 * 60 * 1000)

console.log('Service Worker: Loaded successfully') 