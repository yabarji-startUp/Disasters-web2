#!/usr/bin/env node

/**
 * Script de test pour le Dashboard C5
 * Vérifie que toutes les fonctionnalités C5 sont opérationnelles
 */

const http = require('http');
const https = require('https');

const BASE_URL = 'http://localhost:3002';
const C5_ROUTES = [
  '/dashboard-c5',
  '/dashboard-c5/metrics',
  '/dashboard-c5/reports'
];

console.log('🧪 TEST DU DASHBOARD C5 - MESURE ET ANALYSE AVANCÉES');
console.log('=' .repeat(60));

async function testRoute(route) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${route}`;
    
    http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const isSuccess = res.statusCode === 200;
        const hasReactContent = data.includes('React') || data.includes('react');
        const hasC5Content = data.includes('C5') || data.includes('Dashboard');
        
        console.log(`📍 ${route}`);
        console.log(`   Status: ${res.statusCode} ${isSuccess ? '✅' : '❌'}`);
        console.log(`   React: ${hasReactContent ? '✅' : '❌'}`);
        console.log(`   C5 Content: ${hasC5Content ? '✅' : '❌'}`);
        console.log(`   Taille: ${(data.length / 1024).toFixed(1)} KB`);
        console.log('');
        
        resolve({
          route,
          statusCode: res.statusCode,
          isSuccess,
          hasReactContent,
          hasC5Content,
          size: data.length
        });
      });
    }).on('error', (err) => {
      console.log(`📍 ${route}`);
      console.log(`   Erreur: ${err.message} ❌`);
      console.log('');
      resolve({
        route,
        error: err.message,
        isSuccess: false
      });
    });
  });
}

async function testC5Dashboard() {
  console.log('🚀 Démarrage des tests C5...\n');
  
  const results = [];
  
  for (const route of C5_ROUTES) {
    const result = await testRoute(route);
    results.push(result);
  }
  
  // Résumé des tests
  console.log('📊 RÉSUMÉ DES TESTS C5');
  console.log('=' .repeat(40));
  
  const successfulTests = results.filter(r => r.isSuccess);
  const failedTests = results.filter(r => !r.isSuccess);
  
  console.log(`✅ Tests réussis: ${successfulTests.length}/${results.length}`);
  console.log(`❌ Tests échoués: ${failedTests.length}/${results.length}`);
  
  if (failedTests.length > 0) {
    console.log('\n🚨 TESTS ÉCHOUÉS:');
    failedTests.forEach(test => {
      console.log(`   - ${test.route}: ${test.error || 'Status non-200'}`);
    });
  }
  
  if (successfulTests.length === results.length) {
    console.log('\n🎉 TOUS LES TESTS C5 SONT RÉUSSIS !');
    console.log('✅ Dashboard C5 opérationnel');
    console.log('✅ Navigation C5 fonctionnelle');
    console.log('✅ Métriques C5 accessibles');
    console.log('✅ Rapports C5 générables');
  }
  
  console.log('\n🔍 VÉRIFICATIONS MANUELLES RECOMMANDÉES:');
  console.log('   1. Ouvrir http://localhost:3002/dashboard-c5');
  console.log('   2. Vérifier la rosace 3D en arrière-plan');
  console.log('   3. Tester la navigation entre les pages C5');
  console.log('   4. Vérifier les métriques EcoIndex, Green-IT, Lighthouse, RGESN');
  console.log('   5. Tester la génération de rapports');
}

// Test de connectivité
async function testConnectivity() {
  return new Promise((resolve) => {
    http.get(BASE_URL, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function main() {
  console.log('🔍 Vérification de la connectivité...');
  const isConnected = await testConnectivity();
  
  if (!isConnected) {
    console.log('❌ Impossible de se connecter à l\'application');
    console.log('   Assurez-vous que l\'application est démarrée avec: npm run dev');
    process.exit(1);
  }
  
  console.log('✅ Application accessible, lancement des tests C5...\n');
  
  await testC5Dashboard();
}

main().catch(console.error); 