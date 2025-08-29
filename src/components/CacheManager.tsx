import React, { useEffect, useState } from 'react'

interface CacheEntry {
  key: string
  data: unknown
  timestamp: number
  ttl: number
  hitCount: number
}

interface CacheManagerProps {
  children: React.ReactNode
}

interface CacheContextType {
  get: (key: string) => unknown | null
  set: (key: string, data: unknown, ttl?: number) => void
  clear: () => void
  getStats: () => { hitRate: number; totalRequests: number; cacheSize: number }
}

const CacheContext = React.createContext<CacheContextType | null>(null)

export const useCache = () => {
  const context = React.useContext(CacheContext)
  if (!context) {
    throw new Error('useCache must be used within a CacheManager')
  }
  return context
}

export const CacheManager: React.FC<CacheManagerProps> = ({ children }) => {
  const [cache, setCache] = useState<Map<string, CacheEntry>>(new Map())
  const [stats, setStats] = useState({ hits: 0, misses: 0, totalRequests: 0 })

  // Configuration cache intelligent
  const DEFAULT_TTL = 24 * 60 * 60 * 1000 // 24 heures
  const MAX_CACHE_SIZE = 100 // Entrées maximum
  const CLEANUP_INTERVAL = 60 * 60 * 1000 // 1 heure

  // Nettoyage automatique du cache
  useEffect(() => {
    const cleanup = () => {
      const now = Date.now()
      const newCache = new Map<string, CacheEntry>()
      
      for (const [key, entry] of cache.entries()) {
        if (now - entry.timestamp < entry.ttl) {
          newCache.set(key, entry)
        }
      }
      
      setCache(newCache)
    }

    const interval = setInterval(cleanup, CLEANUP_INTERVAL)
    return () => clearInterval(interval)
  }, [cache])

  // Gestion de la taille du cache
  const manageCacheSize = () => {
    if (cache.size >= MAX_CACHE_SIZE) {
      // Supprimer l'entrée la moins utilisée
      let oldestKey = ''
      let oldestTimestamp = Date.now()
      let lowestHitCount = Infinity

      for (const [key, entry] of cache.entries()) {
        if (entry.hitCount < lowestHitCount || 
            (entry.hitCount === lowestHitCount && entry.timestamp < oldestTimestamp)) {
          oldestKey = key
          oldestTimestamp = entry.timestamp
          lowestHitCount = entry.hitCount
        }
      }

      if (oldestKey) {
        cache.delete(oldestKey)
      }
    }
  }

  const get = (key: string): unknown | null => {
    const entry = cache.get(key)
    const now = Date.now()

    setStats(prev => ({ ...prev, totalRequests: prev.totalRequests + 1 }))

    if (entry && now - entry.timestamp < entry.ttl) {
      // Cache hit
      setStats(prev => ({ ...prev, hits: prev.hits + 1 }))
      
      // Mettre à jour le hit count
      const updatedEntry = { ...entry, hitCount: entry.hitCount + 1 }
      setCache(prev => new Map(prev.set(key, updatedEntry)))
      
      return entry.data
    }

    // Cache miss
    setStats(prev => ({ ...prev, misses: prev.misses + 1 }))
    return null
  }

  const set = (key: string, data: unknown, ttl: number = DEFAULT_TTL) => {
    const entry: CacheEntry = {
      key,
      data,
      timestamp: Date.now(),
      ttl,
      hitCount: 0
    }

    manageCacheSize()
    setCache(prev => new Map(prev.set(key, entry)))
  }

  const clear = () => {
    setCache(new Map())
    setStats({ hits: 0, misses: 0, totalRequests: 0 })
  }

  const getStats = () => {
    const hitRate = stats.totalRequests > 0 ? (stats.hits / stats.totalRequests) * 100 : 0
    return {
      hitRate: Math.round(hitRate * 100) / 100,
      totalRequests: stats.totalRequests,
      cacheSize: cache.size
    }
  }

  const value: CacheContextType = {
    get,
    set,
    clear,
    getStats
  }

  return (
    <CacheContext.Provider value={value}>
      {children}
    </CacheContext.Provider>
  )
}

// Hook pour afficher les statistiques du cache
export const useCacheStats = () => {
  const cache = useCache()
  const [stats, setStats] = useState(cache.getStats())

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(cache.getStats())
    }, 5000) // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval)
  }, [cache])

  return stats
} 