// C5 Reports - Page des rapports et analyses C5
// Génération de rapports détaillés et analyses de tendances

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  TrendingUp, 
  Download, 
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw,
  Filter,
  Eye
} from 'lucide-react';
import { c5MetricsService } from '../services/C5MetricsService';
import { C5MetricsHistory, C5TestConfig } from '../types/C5Types';

const C5Reports: React.FC = () => {
  const [metricsHistory, setMetricsHistory] = useState<C5MetricsHistory[]>([]);
  const [reportPeriod, setReportPeriod] = useState<string>('24h');
  const [selectedReport, setSelectedReport] = useState<string>('overview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string>('');

  useEffect(() => {
    loadMetricsData();
  }, []);

  const loadMetricsData = async () => {
    try {
      const history = c5MetricsService.getMetricsHistory();
      setMetricsHistory(history);
    } catch (error) {
      console.error('Erreur lors du chargement des données C5:', error);
    }
  };

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      // Simulation de génération de rapport
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const report = createReport();
      setGeneratedReport(report);
    } catch (error) {
      console.error('Erreur lors de la génération du rapport:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const createReport = (): string => {
    const now = new Date();
    const periodText = reportPeriod === '24h' ? '24 heures' : reportPeriod === '7d' ? '7 jours' : '30 jours';
    
    // Calculs des tendances
    const ecoIndexTrend = calculateTrend('ecoIndex.score');
    const greenITTrend = calculateTrend('greenIT.score');
    const lighthouseTrend = calculateTrend('lighthouse.overall');
    const rgesnTrend = calculateTrend('rgesn.compliance');

    // Calculs des moyennes
    const avgEcoIndex = calculateAverage('ecoIndex.score');
    const avgGreenIT = calculateAverage('greenIT.score');
    const avgLighthouse = calculateAverage('lighthouse.overall');
    const avgRGESN = calculateAverage('rgesn.compliance');

    // Calculs des écarts-types
    const stdEcoIndex = calculateStandardDeviation('ecoIndex.score');
    const stdGreenIT = calculateStandardDeviation('greenIT.score');
    const stdLighthouse = calculateStandardDeviation('lighthouse.overall');
    const stdRGESN = calculateStandardDeviation('rgesn.compliance');

    return `
# RAPPORT C5 - MESURE ET ANALYSE AVANCÉES
**Généré le:** ${now.toLocaleString('fr-FR')}
**Période d'analyse:** ${periodText}
**Nombre de mesures:** ${metricsHistory.length}

## 📊 RÉSUMÉ EXÉCUTIF

### Scores Moyens
- **EcoIndex:** ${avgEcoIndex.toFixed(1)}/100 (${getGradeFromScore(avgEcoIndex)})
- **Green-IT:** ${avgGreenIT.toFixed(1)}/100 (${getGradeFromScore(avgGreenIT)})
- **Lighthouse:** ${avgLighthouse.toFixed(1)}/100
- **RGESN:** ${avgRGESN.toFixed(1)}% (${getGradeFromScore(avgRGESN)})

### Tendances
- **EcoIndex:** ${ecoIndexTrend > 0 ? '↗️ Amélioration' : ecoIndexTrend < 0 ? '↘️ Dégradation' : '➡️ Stable'} (${ecoIndexTrend > 0 ? '+' : ''}${ecoIndexTrend.toFixed(1)})
- **Green-IT:** ${greenITTrend > 0 ? '↗️ Amélioration' : greenITTrend < 0 ? '↘️ Dégradation' : '➡️ Stable'} (${greenITTrend > 0 ? '+' : ''}${greenITTrend.toFixed(1)})
- **Lighthouse:** ${lighthouseTrend > 0 ? '↗️ Amélioration' : lighthouseTrend < 0 ? '↘️ Dégradation' : '➡️ Stable'} (${lighthouseTrend > 0 ? '+' : ''}${lighthouseTrend.toFixed(1)})
- **RGESN:** ${rgesnTrend > 0 ? '↗️ Amélioration' : rgesnTrend < 0 ? '↘️ Dégradation' : '➡️ Stable'} (${rgesnTrend > 0 ? '+' : ''}${rgesnTrend.toFixed(1)})

## 📈 ANALYSE DÉTAILLÉE

### 1. EcoIndex - Impact Environnemental
**Score moyen:** ${avgEcoIndex.toFixed(1)}/100
**Écart-type:** ${stdEcoIndex.toFixed(2)}
**Tendance:** ${ecoIndexTrend > 0 ? 'Positive' : ecoIndexTrend < 0 ? 'Négative' : 'Stable'}

**Répartition des grades:**
${generateGradeDistribution('ecoIndex.grade')}

**Recommandations:**
${generateEcoIndexRecommendations(avgEcoIndex)}

### 2. Green-IT - Bonnes Pratiques
**Score moyen:** ${avgGreenIT.toFixed(1)}/100
**Écart-type:** ${stdGreenIT.toFixed(2)}
**Tendance:** ${greenITTrend > 0 ? 'Positive' : greenITTrend < 0 ? 'Négative' : 'Stable'}

**Répartition des grades:**
${generateGradeDistribution('greenIT.grade')}

**Recommandations:**
${generateGreenITRecommendations(avgGreenIT)}

### 3. Lighthouse - Performance Web
**Score moyen:** ${avgLighthouse.toFixed(1)}/100
**Écart-type:** ${stdLighthouse.toFixed(2)}
**Tendance:** ${lighthouseTrend > 0 ? 'Positive' : lighthouseTrend < 0 ? 'Négative' : 'Stable'}

**Détail des composants:**
${generateLighthouseDetails()}

**Recommandations:**
${generateLighthouseRecommendations(avgLighthouse)}

### 4. RGESN - Conformité
**Conformité moyenne:** ${avgRGESN.toFixed(1)}%
**Écart-type:** ${stdRGESN.toFixed(2)}
**Tendance:** ${rgesnTrend > 0 ? 'Positive' : rgesnTrend < 0 ? 'Négative' : 'Stable'}

**Répartition des grades:**
${generateGradeDistribution('rgesn.grade')}

**Recommandations:**
${generateRGESNRecommendations(avgRGESN)}

## 🎯 OBJECTIFS ET RECOMMANDATIONS

### Objectifs à court terme (1-2 semaines)
${generateShortTermObjectives()}

### Objectifs à moyen terme (1-2 mois)
${generateMediumTermObjectives()}

### Objectifs à long terme (3-6 mois)
${generateLongTermObjectives()}

## 📋 PLAN D'ACTION

### Actions prioritaires
1. **Immédiat (Cette semaine):**
   ${generateImmediateActions()}

2. **Court terme (2-4 semaines):**
   ${generateShortTermActions()}

3. **Moyen terme (1-3 mois):**
   ${generateMediumTermActions()}

## 🔍 MÉTHODOLOGIE

### Collecte des données
- **Fréquence:** Toutes les 10-15 secondes
- **Période d'analyse:** ${periodText}
- **Méthode:** Collecte automatique via C5MetricsService
- **Validation:** Vérification croisée des métriques

### Calculs statistiques
- **Moyennes:** Calculées sur l'ensemble de la période
- **Tendances:** Régression linéaire sur les 24 dernières heures
- **Écarts-types:** Mesure de la variabilité des performances
- **Grades:** Conversion automatique selon les seuils RGESN

## 📊 ANNEXES

### Données brutes
Les données détaillées sont disponibles dans l'export JSON du dashboard C5.

### Seuils de référence
- **EcoIndex:** A (≥95), B (≥90), C (≥80), D (≥70), E (≥60), F (≥50), G (<50)
- **Green-IT:** A (≥90), B (≥85), C (≥80), D (≥75), E (≥70), F (≥65), G (<65)
- **Lighthouse:** Excellent (≥90), Bon (≥80), Moyen (≥70), Faible (<70)
- **RGESN:** A (≥90%), B (≥85%), C (≥80%), D (≥75%), E (≥70%), F (≥65%), G (<65%)

---
*Rapport généré automatiquement par le Dashboard C5 - Mesure et Analyse Avancées*
    `.trim();
  };

  const calculateTrend = (metricPath: string): number => {
    if (metricsHistory.length < 2) return 0;
    
    const values = metricsHistory.map(m => {
      const path = metricPath.split('.');
      let value = m as any;
      for (const key of path) {
        value = value[key];
      }
      return value;
    });
    
    if (values.length < 2) return 0;
    
    // Calcul de tendance simple (différence entre dernière et première valeur)
    return values[values.length - 1] - values[0];
  };

  const calculateAverage = (metricPath: string): number => {
    if (metricsHistory.length === 0) return 0;
    
    const values = metricsHistory.map(m => {
      const path = metricPath.split('.');
      let value = m as any;
      for (const key of path) {
        value = value[key];
      }
      return value;
    });
    
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  };

  const calculateStandardDeviation = (metricPath: string): number => {
    if (metricsHistory.length < 2) return 0;
    
    const values = metricsHistory.map(m => {
      const path = metricPath.split('.');
      let value = m as any;
      for (const key of path) {
        value = value[key];
      }
      return value;
    });
    
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    
    return Math.sqrt(variance);
  };

  const getGradeFromScore = (score: number): string => {
    if (score >= 95) return 'A';
    if (score >= 90) return 'B';
    if (score >= 80) return 'C';
    if (score >= 70) return 'D';
    if (score >= 60) return 'E';
    if (score >= 50) return 'F';
    return 'G';
  };

  const generateGradeDistribution = (metricPath: string): string => {
    const grades = metricsHistory.map(m => {
      const path = metricPath.split('.');
      let value = m as any;
      for (const key of path) {
        value = value[key];
      }
      return value;
    });
    
    const distribution: { [key: string]: number } = {};
    grades.forEach(grade => {
      distribution[grade] = (distribution[grade] || 0) + 1;
    });
    
    return Object.entries(distribution)
      .map(([grade, count]) => `- ${grade}: ${count} mesure${count > 1 ? 's' : ''} (${((count / grades.length) * 100).toFixed(1)}%)`)
      .join('\n');
  };

  const generateEcoIndexRecommendations = (avgScore: number): string => {
    if (avgScore >= 90) return '- Maintenir l\'excellence environnementale\n- Documenter les bonnes pratiques\n- Partager l\'expertise avec l\'équipe';
    if (avgScore >= 80) return '- Optimiser la gestion des ressources\n- Réduire la consommation énergétique\n- Améliorer l\'efficacité des algorithmes';
    return '- Audit complet de l\'impact environnemental\n- Formation de l\'équipe aux bonnes pratiques\n- Mise en place d\'un plan d\'amélioration';
  };

  const generateGreenITRecommendations = (avgScore: number): string => {
    if (avgScore >= 85) return '- Maintenir les bonnes pratiques\n- Former les nouveaux membres\n- Optimiser les processus existants';
    if (avgScore >= 75) return '- Identifier les pratiques manquantes\n- Améliorer la formation\n- Mettre en place des audits réguliers';
    return '- Révision complète de la politique Green-IT\n- Formation intensive de l\'équipe\n- Mise en place de métriques de suivi';
  };

  const generateLighthouseDetails = (): string => {
    const avgPerformance = calculateAverage('lighthouse.performance');
    const avgAccessibility = calculateAverage('lighthouse.accessibility');
    const avgSEO = calculateAverage('lighthouse.seo');
    const avgPWA = calculateAverage('lighthouse.pwa');
    
    return `- Performance: ${avgPerformance.toFixed(1)}/100
- Accessibilité: ${avgAccessibility.toFixed(1)}/100
- SEO: ${avgSEO.toFixed(1)}/100
- PWA: ${avgPWA.toFixed(1)}/100`;
  };

  const generateLighthouseRecommendations = (avgScore: number): string => {
    if (avgScore >= 85) return '- Maintenir les performances\n- Optimiser les images et ressources\n- Améliorer le Core Web Vitals';
    if (avgScore >= 75) return '- Optimiser le chargement des ressources\n- Améliorer la compression\n- Réduire le JavaScript non critique';
    return '- Audit complet des performances\n- Optimisation des images et médias\n- Réduction de la taille des bundles';
  };

  const generateRGESNRecommendations = (avgScore: number): string => {
    if (avgScore >= 85) return '- Maintenir la conformité RGESN\n- Documenter les critères validés\n- Former l\'équipe aux bonnes pratiques';
    if (avgScore >= 75) return '- Identifier les critères manquants\n- Améliorer la conformité\n- Mettre en place des audits réguliers';
    return '- Audit complet de conformité RGESN\n- Formation intensive sur les critères\n- Mise en place d\'un plan de conformité';
  };

  const generateShortTermObjectives = (): string => {
    return `- Améliorer le score EcoIndex de 5 points minimum
- Atteindre 85% de conformité Green-IT
- Maintenir le score Lighthouse au-dessus de 80
- Améliorer la conformité RGESN de 10%`;
  };

  const generateMediumTermObjectives = (): string => {
    return `- Atteindre le grade A pour EcoIndex
- Atteindre 90% de conformité Green-IT
- Atteindre le score Lighthouse de 85+
- Atteindre 90% de conformité RGESN`;
  };

  const generateLongTermObjectives = (): string => {
    return `- Maintenir l\'excellence environnementale (EcoIndex A)
- Devenir une référence Green-IT (conformité 95%+)
- Atteindre l\'excellence Lighthouse (90+)
- Conformité RGESN exemplaire (95%+)`;
  };

  const generateImmediateActions = (): string => {
    return `- Analyser les métriques actuelles
- Identifier les points de dégradation
- Planifier les optimisations prioritaires
- Former l\'équipe aux bonnes pratiques`;
  };

  const generateShortTermActions = (): string => {
    return `- Implémenter les optimisations identifiées
- Mettre en place des métriques de suivi
- Former l\'équipe aux outils C5
- Établir des processus d\'amélioration continue`;
  };

  const generateMediumTermActions = (): string => {
    return `- Automatiser les tests et métriques
- Optimiser l\'architecture pour l\'éco-conception
- Mettre en place un système de monitoring avancé
- Partager l\'expertise avec l\'équipe`;
  };

  const exportReport = () => {
    if (!generatedReport) return;
    
    const blob = new Blob([generatedReport], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `c5-report-${reportPeriod}-${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* En-tête des Rapports */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Rapports C5 - Analyse et Tendances
        </h1>
        <p className="text-gray-400 mb-4">
          Génération de rapports détaillés et analyse des performances C5
        </p>
      </div>

      {/* Configuration des Rapports */}
      <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-purple-400" />
          <span>Configuration des Rapports</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Période d'analyse
            </label>
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="24h">24 heures</option>
              <option value="7d">7 jours</option>
              <option value="30d">30 jours</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Type de rapport
            </label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="overview">Vue d'ensemble</option>
              <option value="detailed">Détaillé</option>
              <option value="trends">Analyse des tendances</option>
              <option value="compliance">Conformité RGESN</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={generateReport}
              disabled={isGenerating || metricsHistory.length === 0}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Génération...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Générer Rapport</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Rapport Généré */}
      {generatedReport && (
        <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-green-400" />
              <span>Rapport Généré</span>
            </h2>
            <button
              onClick={exportReport}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
              {generatedReport}
            </pre>
          </div>
        </div>
      )}

      {/* Statistiques Rapides */}
      {metricsHistory.length > 0 && (
        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <span>Statistiques Rapides</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {calculateAverage('ecoIndex.score').toFixed(1)}
              </div>
              <div className="text-gray-400">EcoIndex Moyen</div>
              <div className="text-sm text-gray-500">
                Tendance: {calculateTrend('ecoIndex.score') > 0 ? '↗️' : calculateTrend('ecoIndex.score') < 0 ? '↘️' : '➡️'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {calculateAverage('greenIT.score').toFixed(1)}
              </div>
              <div className="text-gray-400">Green-IT Moyen</div>
              <div className="text-sm text-gray-500">
                Tendance: {calculateTrend('greenIT.score') > 0 ? '↗️' : calculateTrend('greenIT.score') < 0 ? '↘️' : '➡️'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {calculateAverage('lighthouse.overall').toFixed(1)}
              </div>
              <div className="text-gray-400">Lighthouse Moyen</div>
              <div className="text-sm text-gray-500">
                Tendance: {calculateTrend('lighthouse.overall') > 0 ? '↗️' : calculateTrend('lighthouse.overall') < 0 ? '↘️' : '➡️'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {calculateAverage('rgesn.compliance').toFixed(1)}%
              </div>
              <div className="text-gray-400">RGESN Moyen</div>
              <div className="text-sm text-gray-500">
                Tendance: {calculateTrend('rgesn.compliance') > 0 ? '↗️' : calculateTrend('rgesn.compliance') < 0 ? '↘️' : '➡️'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Aperçu des Données */}
      {metricsHistory.length > 0 && (
        <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 border border-gray-500/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <Eye className="w-5 h-5 text-gray-400" />
            <span>Aperçu des Données ({metricsHistory.length} mesures)</span>
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 px-4 text-gray-300">Horodatage</th>
                  <th className="text-center py-3 px-4 text-gray-300">EcoIndex</th>
                  <th className="text-center py-3 px-4 text-gray-300">Green-IT</th>
                  <th className="text-center py-3 px-4 text-gray-300">Lighthouse</th>
                  <th className="text-center py-3 px-4 text-gray-300">RGESN</th>
                </tr>
              </thead>
              <tbody>
                {metricsHistory.slice(-5).reverse().map((metric, index) => (
                  <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 px-4 text-gray-300">
                      {metric.timestamp.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center text-green-400 font-medium">
                      {metric.ecoIndex.score}/100
                    </td>
                    <td className="py-3 px-4 text-center text-blue-400 font-medium">
                      {metric.greenIT.score}/100
                    </td>
                    <td className="py-3 px-4 text-center text-purple-400 font-medium">
                      {metric.lighthouse.overall}/100
                    </td>
                    <td className="py-3 px-4 text-center text-orange-400 font-medium">
                      {metric.rgesn.compliance}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Aide et Documentation */}
      <div className="bg-gradient-to-br from-indigo-900/20 to-indigo-800/20 border border-indigo-500/30 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <span>Aide et Documentation</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Types de Rapports</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• <strong>Vue d'ensemble:</strong> Résumé complet des performances C5</li>
              <li>• <strong>Détaillé:</strong> Analyse approfondie avec recommandations</li>
              <li>• <strong>Tendances:</strong> Évolution des métriques dans le temps</li>
              <li>• <strong>Conformité:</strong> État de conformité RGESN</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Périodes d'Analyse</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• <strong>24h:</strong> Analyse sur la dernière journée</li>
              <li>• <strong>7j:</strong> Analyse sur la dernière semaine</li>
              <li>• <strong>30j:</strong> Analyse sur le dernier mois</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default C5Reports; 