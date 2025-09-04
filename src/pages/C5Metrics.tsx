// C5 Metrics - Page des métriques détaillées C5
// Affichage approfondi des métriques EcoIndex, Green-IT, Lighthouse et RGESN

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  RefreshCw,
  Download,
  Filter
} from 'lucide-react';
import { c5MetricsService } from '../services/C5MetricsService';
import { C5MetricsHistory, C5Alert } from '../types/C5Types';

const C5Metrics: React.FC = () => {
  const [metricsHistory, setMetricsHistory] = useState<C5MetricsHistory[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<C5MetricsHistory | null>(null);
  const [alerts, setAlerts] = useState<C5Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<string>('all');

  useEffect(() => {
    loadMetricsData();
    const interval = setInterval(loadMetricsData, 15000); // Mise à jour toutes les 15s
    return () => clearInterval(interval);
  }, []);

  const loadMetricsData = async () => {
    try {
      setIsLoading(true);
      const history = c5MetricsService.getMetricsHistory();
      const current = c5MetricsService.getCurrentMetrics();
      const currentAlerts = c5MetricsService.getAlerts();
      
      setMetricsHistory(history);
      setCurrentMetrics(current);
      setAlerts(currentAlerts);
    } catch (error) {
      console.error('Erreur lors du chargement des métriques C5:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const runManualTest = async () => {
    try {
      setIsLoading(true);
      await c5MetricsService.runManualTest();
      await loadMetricsData();
    } catch (error) {
      console.error('Erreur lors du test manuel:', error);
    }
  };

  const exportMetrics = () => {
    const dataStr = JSON.stringify(metricsHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `c5-metrics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-400 bg-green-900/20';
      case 'B': return 'text-blue-400 bg-blue-900/20';
      case 'C': return 'text-yellow-400 bg-yellow-900/20';
      case 'D': return 'text-orange-400 bg-orange-900/20';
      case 'E': return 'text-red-400 bg-red-900/20';
      case 'F': return 'text-red-500 bg-red-900/20';
      case 'G': return 'text-red-600 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getStatusIcon = (score: number, threshold: number) => {
    if (score >= threshold) return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (score >= threshold * 0.8) return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
    return <AlertTriangle className="w-4 h-4 text-red-400" />;
  };

  const filteredMetrics = selectedMetric === 'all' 
    ? metricsHistory 
    : metricsHistory.filter(m => {
        switch (selectedMetric) {
          case 'ecoIndex': return m.ecoIndex.score < 80;
          case 'greenIT': return m.greenIT.score < 80;
          case 'lighthouse': return m.lighthouse.overall < 85;
          case 'rgesn': return m.rgesn.compliance < 85;
          default: return true;
        }
      });

  if (isLoading && metricsHistory.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" />
          <p className="text-gray-400">Chargement des métriques C5...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête des Métriques */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Métriques C5 Détaillées
        </h1>
        <p className="text-gray-400 mb-4">
          Analyse approfondie des performances EcoIndex, Green-IT, Lighthouse et RGESN
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={runManualTest}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Nouveau Test</span>
          </button>
          <button
            onClick={exportMetrics}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-gray-900/20 border border-gray-500/30 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300 font-medium">Filtrer par métrique:</span>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Toutes les métriques</option>
            <option value="ecoIndex">EcoIndex faible (&lt;80)</option>
            <option value="greenIT">Green-IT faible (&lt;80)</option>
            <option value="lighthouse">Lighthouse faible (&lt;85)</option>
            <option value="rgesn">RGESN faible (&lt;85%)</option>
          </select>
          <span className="text-gray-400 text-sm">
            {filteredMetrics.length} mesure{filteredMetrics.length > 1 ? 's' : ''} trouvée{filteredMetrics.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Métriques en Temps Réel */}
      {currentMetrics && (
        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span>Métriques en Temps Réel</span>
            <span className="text-sm text-gray-400 ml-2">
              {currentMetrics.timestamp.toLocaleString()}
            </span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* EcoIndex Détaillé */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-blue-500/30 pb-2">
                EcoIndex - Impact Environnemental
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Score Global:</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold text-lg ${getGradeColor(currentMetrics.ecoIndex.grade).split(' ')[0]}`}>
                      {currentMetrics.ecoIndex.score}/100
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(currentMetrics.ecoIndex.grade)}`}>
                      {currentMetrics.ecoIndex.grade}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">CO2/Session:</span>
                    <div className="text-white font-medium">{currentMetrics.ecoIndex.co2PerSession.toFixed(3)} gCO2e</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Énergie/Session:</span>
                    <div className="text-white font-medium">{currentMetrics.ecoIndex.energyPerSession.toFixed(2)} kWh</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Eau/Session:</span>
                    <div className="text-white font-medium">{currentMetrics.ecoIndex.waterUsage.toFixed(2)} L</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Durabilité:</span>
                    <div className="text-white font-medium">{currentMetrics.ecoIndex.sustainability}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Green-IT Détaillé */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-blue-500/30 pb-2">
                Green-IT - Bonnes Pratiques
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Score Global:</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold text-lg ${getGradeColor(currentMetrics.greenIT.grade).split(' ')[0]}`}>
                      {currentMetrics.greenIT.score}/100
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(currentMetrics.greenIT.grade)}`}>
                      {currentMetrics.greenIT.grade}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conformité:</span>
                    <span className="text-white font-medium">{currentMetrics.greenIT.compliance}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${currentMetrics.greenIT.compliance}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {currentMetrics.greenIT.bestPractices} / {currentMetrics.greenIT.totalPractices} bonnes pratiques appliquées
                  </div>
                </div>
                {currentMetrics.greenIT.recommendations.length > 0 && (
                  <div>
                    <span className="text-gray-400 text-sm">Recommandations:</span>
                    <ul className="mt-1 space-y-1">
                      {currentMetrics.greenIT.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-yellow-300 flex items-center space-x-2">
                          <span>•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Historique des Métriques */}
      <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 border border-gray-500/30 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-gray-400" />
          <span>Historique des Métriques</span>
          <span className="text-sm text-gray-400 ml-2">
            {metricsHistory.length} mesure{metricsHistory.length > 1 ? 's' : ''} sur 24h
          </span>
        </h2>

        {filteredMetrics.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            Aucune métrique trouvée avec les filtres actuels
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 px-4 text-gray-300">Horodatage</th>
                  <th className="text-center py-3 px-4 text-gray-300">EcoIndex</th>
                  <th className="text-center py-3 px-4 text-gray-300">Green-IT</th>
                  <th className="text-center py-3 px-4 text-gray-300">Lighthouse</th>
                  <th className="text-center py-3 px-4 text-gray-300">RGESN</th>
                  <th className="text-center py-3 px-4 text-gray-300">Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredMetrics.slice(-10).reverse().map((metric, index) => (
                  <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 px-4 text-gray-300">
                      {metric.timestamp.toLocaleTimeString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className={`font-medium ${getGradeColor(metric.ecoIndex.grade).split(' ')[0]}`}>
                          {metric.ecoIndex.score}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${getGradeColor(metric.ecoIndex.grade)}`}>
                          {metric.ecoIndex.grade}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className={`font-medium ${getGradeColor(metric.greenIT.grade).split(' ')[0]}`}>
                          {metric.greenIT.score}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${getGradeColor(metric.greenIT.grade)}`}>
                          {metric.greenIT.grade}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-medium text-white">{metric.lighthouse.overall}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-medium text-white">{metric.rgesn.compliance}%</span>
                        <span className={`px-2 py-1 rounded text-xs ${getGradeColor(metric.rgesn.grade)}`}>
                          {metric.rgesn.grade}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {getStatusIcon(metric.ecoIndex.score, 80)}
                        {getStatusIcon(metric.greenIT.score, 80)}
                        {getStatusIcon(metric.lighthouse.overall, 85)}
                        {getStatusIcon(metric.rgesn.compliance, 85)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Alertes Actives */}
      {alerts.length > 0 && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Alertes Actives ({alerts.length})</span>
          </h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="text-white font-medium">{alert.message}</div>
                    <div className="text-sm text-red-300">
                      {alert.metric} - Seuil: {alert.threshold}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-red-400 font-bold">{alert.value}</div>
                  <div className="text-xs text-red-300">
                    {alert.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default C5Metrics; 