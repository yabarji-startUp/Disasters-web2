import React, { useEffect, useRef } from 'react'

/**
 * Composant de gestion du preload intelligent C4
 * Optimise le chargement des ressources basé sur la visibilité et l'usage
 * Auteur : Yassen ABARJI
 * Date : 04/09/2025
 */

interface PreloadConfig {
  href: string
  as: 'script' | 'style' | 'image' | 'font'
  type?: string
  media?: string
  priority: 'high' | 'medium' | 'low'
  condition?: () => boolean
}

const PRELOAD_CONFIGS: PreloadConfig[] = [
  // Ressources critiques - Preload immédiat
  {
    href: '/css/index-*.css',
    as: 'style',
    type: 'text/css',
    priority: 'high'
  },
  {
    href: '/js/react-vendor-*.js',
    as: 'script',
    type: 'application/javascript',
    priority: 'high'
  },
  
  // Ressources importantes - Preload différé
  {
    href: '/js/utils-vendor-*.js',
    as: 'script',
    type: 'application/javascript',
    priority: 'medium'
  },
  {
    href: '/js/icons-vendor-*.js',
    as: 'script',
    type: 'application/javascript',
    priority: 'medium'
  },
  
  // Ressources lourdes - Preload conditionnel
  {
    href: '/js/three-vendor-*.js',
    as: 'script',
    type: 'application/javascript',
    priority: 'low',
    condition: () => window.innerWidth >= 768 // Desktop seulement
  }
]

export default function PreloadManager() {
  const preloadedRef = useRef<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Fonction de preload intelligent
  const preloadResource = (config: PreloadConfig) => {
    if (preloadedRef.current.has(config.href)) return
    
    // Vérifier les conditions
    if (config.condition && !config.condition()) return
    
    try {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = config.href
      link.as = config.as
      
      if (config.type) link.type = config.type
      if (config.media) link.media = config.media
      
      // Priorité basée sur l'importance
      if (config.priority === 'high') {
        link.setAttribute('importance', 'high')
      }
      
      document.head.appendChild(link)
      preloadedRef.current.add(config.href)
      
      console.log(`🚀 C4 Preload: ${config.href} (${config.priority})`)
    } catch (error) {
      console.warn(`⚠️ Erreur preload C4: ${config.href}`, error)
    }
  }

  // Preload immédiat des ressources critiques
  useEffect(() => {
    const criticalResources = PRELOAD_CONFIGS.filter(c => c.priority === 'high')
    criticalResources.forEach(preloadResource)
    
    // Preload différé des ressources moyennes
    const timer = setTimeout(() => {
      const mediumResources = PRELOAD_CONFIGS.filter(c => c.priority === 'medium')
      mediumResources.forEach(preloadResource)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Preload conditionnel basé sur la visibilité
  useEffect(() => {
    const lowPriorityResources = PRELOAD_CONFIGS.filter(c => c.priority === 'low')
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Preload Three.js quand la section 3D est visible
          if (entry.target.classList.contains('three-section')) {
            const threeConfig = lowPriorityResources.find(c => c.href.includes('three-vendor'))
            if (threeConfig) {
              preloadResource(threeConfig)
            }
          }
        }
      })
    }, {
      threshold: 0.1, // Déclencher dès 10% de visibilité
      rootMargin: '50px' // Marge de 50px pour anticiper
    })

    // Observer la section 3D
    const threeSection = document.querySelector('.three-section')
    if (threeSection) {
      observerRef.current.observe(threeSection)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Preload basé sur les interactions utilisateur
  useEffect(() => {
    const handleUserInteraction = () => {
      const remainingResources = PRELOAD_CONFIGS.filter(c => !preloadedRef.current.has(c.href))
      remainingResources.forEach(preloadResource)
      
      // Nettoyer l'écouteur après utilisation
      document.removeEventListener('mousemove', handleUserInteraction)
      document.removeEventListener('scroll', handleUserInteraction)
      document.removeEventListener('click', handleUserInteraction)
    }

    // Écouter les interactions utilisateur pour preload différé
    document.addEventListener('mousemove', handleUserInteraction, { once: true })
    document.addEventListener('scroll', handleUserInteraction, { once: true })
    document.addEventListener('click', handleUserInteraction, { once: true })

    return () => {
      document.removeEventListener('mousemove', handleUserInteraction)
      document.removeEventListener('scroll', handleUserInteraction)
      document.removeEventListener('click', handleUserInteraction)
    }
  }, [])

  // Composant invisible - gestionnaire uniquement
  return null
} 