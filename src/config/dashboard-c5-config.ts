/**
 * Configuration du Dashboard C5
 * Définit les seuils, métriques et paramètres sans modifier la structure existante
 * Auteur : Yassen ABARJI
 * Date : 04/09/2025
 */

export const C5_CONFIG = {
  // Seuils de performance C5
  thresholds: {
    performance: {
      lighthouse: 85,
      ecoIndex: 85,
      greenIT: 85,
      rgesn: 85
    },
    server: {
      ram: 150, // MB - Seuil d'alerte
      cpu: 10,  // % - Seuil d'alerte
      rps: 20,  // Requests per second - Seuil d'alerte
      latency: 50, // ms - Seuil d'alerte
      errors: 1  // Nombre d'erreurs max
    },
    network: {
      bandwidth: 3 * 1024 * 1024, // 3 MB - Seuil C5
      requests: 40, // Nombre de requêtes max
      cacheHit: 85, // % - Cache hit rate minimum
      compression: 20 // % - Compression minimum
    },
    environmental: {
      co2: 0.15, // gCO2e - Seuil maximum C5
      energy: 1.5, // kWh - Seuil maximum
      grade: 'B' // Grade EcoIndex minimum
    }
  },

  // Intervalles de mise à jour
  updateIntervals: {
    metrics: 5000, // 5 secondes
    alerts: 10000, // 10 secondes
    reports: 60000 // 1 minute
  },

  // Métriques à collecter
  metrics: {
    server: ['ram', 'cpu', 'rps', 'latency', 'errors'],
    frontend: ['performance', 'ecoIndex', 'greenIT', 'rgesn'],
    network: ['bandwidth', 'requests', 'cacheHit', 'compression'],
    environmental: ['co2', 'energy', 'impact', 'grade']
  },

  // Couleurs des statuts
  colors: {
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
    info: 'text-blue-500'
  },

  // Messages d'alerte
  alerts: {
    performance: {
      success: 'Performance optimale - Objectif C5 atteint',
      warning: 'Performance correcte - Amélioration possible',
      error: 'Performance insuffisante - Optimisation requise'
    },
    environmental: {
      success: 'Impact environnemental faible - Excellent',
      warning: 'Impact environnemental modéré - À améliorer',
      error: 'Impact environnemental élevé - Critique'
    }
  }
};

export default C5_CONFIG; 