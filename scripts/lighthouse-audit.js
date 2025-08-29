#!/usr/bin/env node

import lighthouse from 'lighthouse'
import { launch as chromeLauncher } from 'chrome-launcher'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration Lighthouse pour éco-conception
const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false
    },
    emulatedUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
}

// Configuration des audits spécifiques éco-conception
const ecoConfig = {
  ...lighthouseConfig,
  settings: {
    ...lighthouseConfig.settings,
    onlyAudits: [
      'first-contentful-paint',
      'largest-contentful-paint',
      'total-blocking-time',
      'cumulative-layout-shift',
      'speed-index',
      'interactive',
      'max-potential-fid',
      'total-byte-weight',
      'uses-optimized-images',
      'uses-webp-images',
      'uses-text-compression',
      'uses-responsive-images',
      'unminified-css',
      'unminified-javascript',
      'unused-css-rules',
      'unused-javascript',
      'modern-image-formats',
      'efficient-animated-content',
      'preload-lcp-image',
      'render-blocking-resources',
      'unused-javascript',
      'dom-size',
      'critical-request-chains',
      'user-timings',
      'bootup-time',
      'mainthread-work-breakdown',
      'font-display',
      'resource-summary',
      'third-party-summary',
      'largest-contentful-paint-element',
      'layout-shift-elements',
      'long-tasks',
      'non-composited-animations',
      'unsized-images'
    ]
  }
}

// Fonction pour calculer l'EcoIndex basé sur Lighthouse
function calculateEcoIndex(lighthouseResults) {
  const performance = lighthouseResults.lhr.categories.performance.score * 100
  const accessibility = lighthouseResults.lhr.categories.accessibility.score * 100
  const bestPractices = lighthouseResults.lhr.categories['best-practices'].score * 100
  const seo = lighthouseResults.lhr.categories.seo.score * 100

  // Métriques spécifiques éco-conception
  const totalByteWeight = lighthouseResults.lhr.audits['total-byte-weight'].numericValue
  const domSize = lighthouseResults.lhr.audits['dom-size'].numericValue
  const requests = lighthouseResults.lhr.audits['resource-summary']?.details?.items?.[0]?.requestCount || 0

  // Calcul EcoIndex simplifié (basé sur les métriques Lighthouse)
  // EcoIndex = 100 - (poids * 0.1 + requêtes * 0.5 + DOM * 0.1)
  const ecoIndex = Math.max(0, 100 - (totalByteWeight / 1024 / 1024 * 0.1 + requests * 0.5 + domSize * 0.1))
  
  // Grade EcoIndex
  let grade = 'A'
  if (ecoIndex < 75) grade = 'B'
  if (ecoIndex < 65) grade = 'C'
  if (ecoIndex < 50) grade = 'D'
  if (ecoIndex < 35) grade = 'E'
  if (ecoIndex < 20) grade = 'F'
  if (ecoIndex < 5) grade = 'G'

  return {
    score: Math.round(ecoIndex * 100) / 100,
    grade,
    metrics: {
      totalByteWeight: Math.round(totalByteWeight / 1024 / 1024 * 100) / 100, // MB
      domSize,
      requests,
      performance,
      accessibility,
      bestPractices,
      seo
    }
  }
}

// Fonction pour générer le rapport
async function runLighthouseAudit(url = 'http://localhost:3000') {
  console.log('🚀 Démarrage audit Lighthouse...')
  console.log(`📊 URL analysée: ${url}`)

  try {
    // Lancer Chrome
    const chrome = await chromeLauncher({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
    })

    console.log('🌐 Chrome lancé en mode headless')

    // Configuration des options Lighthouse
    const options = {
      logLevel: 'info',
      output: 'json',
      port: chrome.port,
      ...ecoConfig
    }

    // Exécuter Lighthouse
    console.log('🔍 Exécution de l\'audit Lighthouse...')
    const results = await lighthouse(url, options)
    
    // Fermer Chrome
    await chrome.kill()

    // Calculer EcoIndex
    const ecoIndex = calculateEcoIndex(results)
    
    // Générer rapport JSON
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const reportDir = path.join(__dirname, '..', 'UF-Zoom', 'metrics', 'lighthouse')
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true })
    }

    const reportPath = path.join(reportDir, `lighthouse-report-${timestamp}.json`)
    const summaryPath = path.join(reportDir, `lighthouse-summary-${timestamp}.json`)

    // Rapport complet
    fs.writeFileSync(reportPath, JSON.stringify(results.lhr, null, 2))
    
    // Résumé avec EcoIndex
    const summary = {
      timestamp: new Date().toISOString(),
      url,
      ecoIndex,
      lighthouse: {
        performance: results.lhr.categories.performance.score * 100,
        accessibility: results.lhr.categories.accessibility.score * 100,
        bestPractices: results.lhr.categories['best-practices'].score * 100,
        seo: results.lhr.categories.seo.score * 100
      },
      metrics: {
        firstContentfulPaint: results.lhr.audits['first-contentful-paint'].numericValue,
        largestContentfulPaint: results.lhr.audits['largest-contentful-paint'].numericValue,
        totalBlockingTime: results.lhr.audits['total-blocking-time'].numericValue,
        cumulativeLayoutShift: results.lhr.audits['cumulative-layout-shift'].numericValue,
        speedIndex: results.lhr.audits['speed-index'].numericValue,
        interactive: results.lhr.audits['interactive'].numericValue
      }
    }

    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2))

    // Affichage des résultats
    console.log('\n📊 RÉSULTATS LIGHTHOUSE')
    console.log('='.repeat(50))
    console.log(`🎯 Performance: ${summary.lighthouse.performance.toFixed(1)}/100`)
    console.log(`♿ Accessibilité: ${summary.lighthouse.accessibility.toFixed(1)}/100`)
    console.log(`✅ Bonnes pratiques: ${summary.lighthouse.bestPractices.toFixed(1)}/100`)
    console.log(`🔍 SEO: ${summary.lighthouse.seo.toFixed(1)}/100`)
    console.log('\n🌱 MÉTRIQUES ÉCO-CONCEPTION')
    console.log('='.repeat(50))
    console.log(`🌍 EcoIndex: ${ecoIndex.score}/100 (Grade: ${ecoIndex.grade})`)
    console.log(`📦 Poids total: ${ecoIndex.metrics.totalByteWeight} MB`)
    console.log(`🌳 Taille DOM: ${ecoIndex.metrics.domSize} éléments`)
    console.log(`📡 Requêtes: ${ecoIndex.metrics.requests}`)
    console.log('\n⏱️ WEB VITALS')
    console.log('='.repeat(50))
    console.log(`🎨 FCP: ${summary.metrics.firstContentfulPaint.toFixed(0)}ms`)
    console.log(`🖼️ LCP: ${summary.metrics.largestContentfulPaint.toFixed(0)}ms`)
    console.log(`⚡ TBT: ${summary.metrics.totalBlockingTime.toFixed(0)}ms`)
    console.log(`📐 CLS: ${summary.metrics.cumulativeLayoutShift.toFixed(3)}`)
    console.log(`🚀 Speed Index: ${summary.metrics.speedIndex.toFixed(0)}ms`)
    console.log(`💻 Interactive: ${summary.metrics.interactive.toFixed(0)}ms`)

    console.log('\n📁 Rapports générés:')
    console.log(`📄 Rapport complet: ${reportPath}`)
    console.log(`📋 Résumé: ${summaryPath}`)

    return summary

  } catch (error) {
    console.error('❌ Erreur lors de l\'audit Lighthouse:', error)
    throw error
  }
}

// Fonction pour comparer avec les métriques précédentes
function compareWithBaseline(currentMetrics, baselinePath) {
  if (!fs.existsSync(baselinePath)) {
    console.log('📊 Pas de baseline trouvée, création d\'une nouvelle baseline')
    fs.writeFileSync(baselinePath, JSON.stringify(currentMetrics, null, 2))
    return null
  }

  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
  
  console.log('\n📈 COMPARAISON AVEC BASELINE')
  console.log('='.repeat(50))
  
  const comparisons = {
    performance: {
      current: currentMetrics.lighthouse.performance,
      baseline: baseline.lighthouse.performance,
      diff: currentMetrics.lighthouse.performance - baseline.lighthouse.performance
    },
    ecoIndex: {
      current: currentMetrics.ecoIndex.score,
      baseline: baseline.ecoIndex.score,
      diff: currentMetrics.ecoIndex.score - baseline.ecoIndex.score
    },
    weight: {
      current: currentMetrics.ecoIndex.metrics.totalByteWeight,
      baseline: baseline.ecoIndex.metrics.totalByteWeight,
      diff: currentMetrics.ecoIndex.metrics.totalByteWeight - baseline.ecoIndex.metrics.totalByteWeight
    }
  }

  console.log(`🎯 Performance: ${comparisons.performance.current.toFixed(1)} (${comparisons.performance.diff > 0 ? '+' : ''}${comparisons.performance.diff.toFixed(1)})`)
  console.log(`🌍 EcoIndex: ${comparisons.ecoIndex.current.toFixed(1)} (${comparisons.ecoIndex.diff > 0 ? '+' : ''}${comparisons.ecoIndex.diff.toFixed(1)})`)
  console.log(`📦 Poids: ${comparisons.weight.current.toFixed(2)}MB (${comparisons.weight.diff > 0 ? '+' : ''}${comparisons.weight.diff.toFixed(2)}MB)`)

  return comparisons
}

// Fonction principale
async function main() {
  const url = process.argv[2] || 'http://localhost:3000'
  const baselinePath = path.join(__dirname, '..', 'UF-Zoom', 'metrics', 'lighthouse', 'baseline.json')

  // Vérifier si l'application est accessible
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.log('⚠️ Application non accessible, démarrage automatique...')
      console.log('💡 Utilisez: npm run lighthouse:dev pour démarrer automatiquement l\'application')
      process.exit(1)
    }
  } catch (error) {
    console.log('⚠️ Application non accessible, démarrage automatique...')
    console.log('💡 Utilisez: npm run lighthouse:dev pour démarrer automatiquement l\'application')
    process.exit(1)
  }

  try {
    const results = await runLighthouseAudit(url)
    const comparisons = compareWithBaseline(results, baselinePath)
    
    // Validation des seuils
    const thresholds = {
      performance: 70,
      ecoIndex: 75,
      weight: 2.0 // MB
    }

    console.log('\n🎯 VALIDATION DES SEUILS')
    console.log('='.repeat(50))
    
    const performanceOk = results.lighthouse.performance >= thresholds.performance
    const ecoIndexOk = results.ecoIndex.score >= thresholds.ecoIndex
    const weightOk = results.ecoIndex.metrics.totalByteWeight <= thresholds.weight

    console.log(`🎯 Performance ≥ ${thresholds.performance}: ${performanceOk ? '✅' : '❌'} (${results.lighthouse.performance.toFixed(1)})`)
    console.log(`🌍 EcoIndex ≥ ${thresholds.ecoIndex}: ${ecoIndexOk ? '✅' : '❌'} (${results.ecoIndex.score.toFixed(1)})`)
    console.log(`📦 Poids ≤ ${thresholds.weight}MB: ${weightOk ? '✅' : '❌'} (${results.ecoIndex.metrics.totalByteWeight.toFixed(2)}MB)`)

    const allOk = performanceOk && ecoIndexOk && weightOk
    
    if (allOk) {
      console.log('\n🎉 Tous les seuils sont respectés !')
      process.exit(0)
    } else {
      console.log('\n⚠️ Certains seuils ne sont pas respectés')
      process.exit(1)
    }

  } catch (error) {
    console.error('❌ Échec de l\'audit Lighthouse')
    process.exit(1)
  }
}

// Exécution si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { runLighthouseAudit, calculateEcoIndex } 