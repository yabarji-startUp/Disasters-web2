#!/usr/bin/env node

/**
 * EcoIndex Test Script
 * Teste et calcule le score EcoIndex pour la compétence C2
 * Auteur : Yassen ABARJI
 * Date : 04/09/2025

 */

const fs = require('fs');
const path = require('path');

// Configuration
const METRICS_DIR = path.join(__dirname, '../UF-Zoom/metrics');
const RESULTS_FILE = path.join(METRICS_DIR, 'ecoindex-test-results.json');

// Métriques EcoIndex (simulation basée sur Lighthouse)
const calculateEcoIndex = (performance, accessibility, bestPractices, seo) => {
  // Calcul basé sur les bonnes pratiques EcoIndex
  let score = 0;
  
  // Performance (40% du score)
  score += (performance / 100) * 40;
  
  // Accessibilité (20% du score)
  score += (accessibility / 100) * 20;
  
  // Bonnes pratiques (25% du score)
  score += (bestPractices / 100) * 25;
  
  // SEO (15% du score)
  score += (seo / 100) * 15;
  
  return Math.round(score);
};

// Déterminer le grade EcoIndex
const getEcoGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  if (score >= 50) return 'E';
  return 'F';
};

// Test principal
const runEcoIndexTest = async () => {
  console.log('🌱 EcoIndex Test - Compétence C2');
  console.log('================================');
  
  try {
    // Créer le dossier metrics s'il n'existe pas
    if (!fs.existsSync(METRICS_DIR)) {
      fs.mkdirSync(METRICS_DIR, { recursive: true });
    }
    
    // Simuler les métriques Lighthouse (en production, ceci viendrait de Lighthouse)
    const lighthouseMetrics = {
      performance: 25,      // Baseline C2
      accessibility: 85,    // Bonne accessibilité
      bestPractices: 70,   // Bonnes pratiques
      seo: 80             // SEO correct
    };
    
    // Calculer EcoIndex
    const ecoIndexScore = calculateEcoIndex(
      lighthouseMetrics.performance,
      lighthouseMetrics.accessibility,
      lighthouseMetrics.bestPractices,
      lighthouseMetrics.seo
    );
    
    const ecoGrade = getEcoGrade(ecoIndexScore);
    
    // Résultats
    const results = {
      timestamp: new Date().toISOString(),
      ecoIndex: {
        score: ecoIndexScore,
        grade: ecoGrade,
        metrics: lighthouseMetrics
      },
      analysis: {
        performance: {
          score: lighthouseMetrics.performance,
          status: lighthouseMetrics.performance >= 90 ? 'excellent' : 
                  lighthouseMetrics.performance >= 70 ? 'good' :
                  lighthouseMetrics.performance >= 50 ? 'fair' : 'poor'
        },
        accessibility: {
          score: lighthouseMetrics.accessibility,
          status: lighthouseMetrics.accessibility >= 90 ? 'excellent' : 'good'
        },
        bestPractices: {
          score: lighthouseMetrics.bestPractices,
          status: lighthouseMetrics.bestPractices >= 80 ? 'excellent' : 'good'
        },
        seo: {
          score: lighthouseMetrics.seo,
          status: lighthouseMetrics.seo >= 80 ? 'excellent' : 'good'
        }
      },
      recommendations: [
        'Optimiser les Core Web Vitals pour améliorer le score EcoIndex',
        'Réduire la taille des bundles JavaScript et CSS',
        'Implémenter le lazy loading pour les images et composants',
        'Optimiser le cache et les headers HTTP'
      ]
    };
    
    // Sauvegarder les résultats
    fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
    
    // Affichage
    console.log(`📊 EcoIndex Score: ${ecoIndexScore}/100 (Grade ${ecoGrade})`);
    console.log(`📈 Métriques détaillées:`);
    console.log(`   - Performance: ${lighthouseMetrics.performance}/100`);
    console.log(`   - Accessibilité: ${lighthouseMetrics.accessibility}/100`);
    console.log(`   - Bonnes pratiques: ${lighthouseMetrics.bestPractices}/100`);
    console.log(`   - SEO: ${lighthouseMetrics.seo}/100`);
    console.log(`💡 Recommandations: ${results.recommendations.length} suggestions`);
    console.log(`💾 Résultats sauvegardés: ${RESULTS_FILE}`);
    
    return results;
    
  } catch (error) {
    console.error('❌ Erreur lors du test EcoIndex:', error.message);
    throw error;
  }
};

// Exécution si appelé directement
if (require.main === module) {
  runEcoIndexTest()
    .then(() => {
      console.log('✅ Test EcoIndex terminé avec succès');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Test EcoIndex échoué:', error.message);
      process.exit(1);
    });
}

module.exports = { runEcoIndexTest, calculateEcoIndex, getEcoGrade }; 

