// C5 Dashboard - Page principale du dashboard C5
// Affiche les KPI C5 spécifiques (EcoIndex, Green-IT, Lighthouse, RGESN)

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Activity, 
  Zap, 
  Globe, 
  Target, 
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';
import { c5MetricsService } from '../services/C5MetricsService';
import { C5MetricsHistory, C5Alert } from '../types/C5Types';

interface C5DashboardProps {
  onNavigate: (path: string) => void;
}

const C5Dashboard: React.FC<C5DashboardProps> = ({ onNavigate }) => {
  const [currentMetrics, setCurrentMetrics] = useState<C5MetricsHistory | null>(null);
  const [alerts, setAlerts] = useState<C5Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 10000); // Mise à jour toutes les 10s
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const metrics = c5MetricsService.getCurrentMetrics();
      const currentAlerts = c5MetricsService.getAlerts();
      
      if (metrics) {
        setCurrentMetrics(metrics);
        setLastUpdate(metrics.timestamp);
      }
      
      setAlerts(currentAlerts);
    } catch (error) {
      console.error('Erreur lors du chargement des données C5:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const runManualTest = async () => {
    try {
      setIsLoading(true);
      await c5MetricsService.runManualTest();
      await loadDashboardData();
    } catch (error) {
      console.error('Erreur lors du test manuel:', error);
    }
  };

  if (isLoading && !currentMetrics) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" />
          <p className="text-gray-400">Chargement du Dashboard C5...</p>
        </div>
      </div>
    );
  }

  if (!currentMetrics) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-300 mb-2">Aucune donnée disponible</h2>
        <p className="text-gray-400 mb-4">Le service de métriques C5 n'a pas encore collecté de données.</p>
        <button
          onClick={runManualTest}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Lancer un test manuel
        </button>
      </div>
    );
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-400';
      case 'B': return 'text-blue-400';
      case 'C': return 'text-yellow-400';
      case 'D': return 'text-orange-400';
      case 'E': return 'text-red-400';
      case 'F': return 'text-red-500';
      case 'G': return 'text-red-600';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (score: number, threshold: number) => {
    if (score >= threshold) return 'text-green-400';
    if (score >= threshold * 0.8) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8">
      {/* En-tête du Dashboard */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Dashboard C5 - Mesure et Analyse Avancées
        </h1>
        <p className="text-gray-400 mb-4">
          Surveillance en temps réel des métriques EcoIndex, Green-IT, Lighthouse et RGESN
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Dernière mise à jour: {lastUpdate?.toLocaleString()}</span>
          <button
            onClick={runManualTest}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Actualiser</span>
          </button>
        </div>
      </div>

      {/* Alertes C5 */}
      {alerts.length > 0 && (
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold text-yellow-400">Alertes C5</h3>
          </div>
          <div className="space-y-2">
            {alerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between text-sm">
                <span className="text-yellow-300">{alert.message}</span>
                <span className="text-yellow-400">
                  {alert.value} / {alert.threshold}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KPI Principaux C5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* EcoIndex KPI */}
        <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-green-400" />
            </div>
            <span className={`text-2xl font-bold ${getGradeColor(currentMetrics.ecoIndex.grade)}`}>
              {currentMetrics.ecoIndex.grade}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">EcoIndex</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Score:</span>
              <span className={`font-semibold ${getStatusColor(currentMetrics.ecoIndex.score, 80)}`}>
                {currentMetrics.ecoIndex.score}/100
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">CO2/Session:</span>
              <span className="text-white">{currentMetrics.ecoIndex.co2PerSession.toFixed(3)} gCO2e</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Impact:</span>
              <span className="text-white">{currentMetrics.ecoIndex.impact}</span>
            </div>
          </div>
        </div>

        {/* Green-IT KPI */}
        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <span className={`text-2xl font-bold ${getGradeColor(currentMetrics.greenIT.grade)}`}>
              {currentMetrics.greenIT.grade}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Green-IT</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Score:</span>
              <span className={`font-semibold ${getStatusColor(currentMetrics.greenIT.score, 80)}`}>
                {currentMetrics.greenIT.score}/100
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Conformité:</span>
              <span className="text-white">{currentMetrics.greenIT.compliance}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Pratiques:</span>
              <span className="text-white">{currentMetrics.greenIT.bestPractices}/20</span>
            </div>
          </div>
        </div>

        {/* Lighthouse KPI */}
        <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-2xl font-bold text-purple-400">
              {currentMetrics.lighthouse.overall}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Lighthouse</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Performance:</span>
              <span className={`font-semibold ${getStatusColor(currentMetrics.lighthouse.performance, 85)}`}>
                {currentMetrics.lighthouse.performance}/100
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Accessibilité:</span>
              <span className={`font-semibold ${getStatusColor(currentMetrics.lighthouse.accessibility, 90)}`}>
                {currentMetrics.lighthouse.accessibility}/100
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">SEO:</span>
              <span className={`font-semibold ${getStatusColor(currentMetrics.lighthouse.seo, 85)}`}>
                {currentMetrics.lighthouse.seo}/100
              </span>
            </div>
          </div>
        </div>

        {/* RGESN KPI */}
        <div className="bg-gradient-to-br from-orange-900/20 to-orange-800/20 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-400" />
            </div>
            <span className={`text-2xl font-bold ${getGradeColor(currentMetrics.rgesn.grade)}`}>
              {currentMetrics.rgesn.grade}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">RGESN</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Conformité:</span>
              <span className={`font-semibold ${getStatusColor(currentMetrics.rgesn.compliance, 85)}`}>
                {currentMetrics.rgesn.compliance}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Score:</span>
              <span className="text-white">{currentMetrics.rgesn.score}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Critères:</span>
              <span className="text-white">{currentMetrics.rgesn.validatedCriteria.length}/6</span>
            </div>
          </div>
        </div>
      </div>

      {/* Métriques Environnementales */}
      <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 border border-gray-500/30 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Activity className="w-5 h-5 text-green-400" />
          <span>Métriques Environnementales</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {currentMetrics.environmental.carbonFootprint.toFixed(3)}
            </div>
            <div className="text-gray-400">kgCO2e</div>
            <div className="text-sm text-gray-500">Empreinte Carbone</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {currentMetrics.environmental.energyConsumption.toFixed(2)}
            </div>
            <div className="text-gray-400">kWh</div>
            <div className="text-sm text-gray-500">Consommation Énergétique</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">
              {currentMetrics.environmental.benchmarkScore}
            </div>
            <div className="text-gray-400">/100</div>
            <div className="text-sm text-gray-500">Score Benchmark</div>
          </div>
        </div>
      </div>

      {/* Statut du Service */}
      <div className="bg-gradient-to-br from-indigo-900/20 to-indigo-800/20 border border-indigo-500/30 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <span>Statut du Service C5</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Service actif:</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Actif</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Collecte automatique:</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Activée</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Fréquence:</span>
              <span className="text-white">Toutes les 10s</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Données historiques:</span>
              <span className="text-white">24h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Alertes actives:</span>
              <span className="text-white">{alerts.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Dernier test:</span>
              <span className="text-white">{currentMetrics.lighthouse.lastTest.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default C5Dashboard; 