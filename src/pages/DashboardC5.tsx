import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  HardDrive, 
  Wifi, 
  Leaf, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Zap,
  ArrowLeft
} from 'lucide-react';

interface Metrics {
  server: {
    ram: number;
    cpu: number;
    rps: number;
    latency: number;
    errors: number;
  };
  frontend: {
    performance: number;
    ecoIndex: number;
    greenIT: number;
    rgesn: number;
  };
  network: {
    bandwidth: number;
    requests: number;
    cacheHit: number;
    compression: number;
  };
  environmental: {
    co2: number;
    energy: number;
    impact: string;
    grade: string;
  };
}

const DashboardC5: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    server: { ram: 0, cpu: 0, rps: 0, latency: 0, errors: 0 },
    frontend: { performance: 0, ecoIndex: 0, greenIT: 0, rgesn: 0 },
    network: { bandwidth: 0, requests: 0, cacheHit: 0, compression: 0 },
    environmental: { co2: 0, energy: 0, impact: 'Calculating...', grade: 'N/A' }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Simulation des métriques pour C5 (sans modifier la structure existante)
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Simulation des métriques C5 avancées
        const mockMetrics: Metrics = {
          server: {
            ram: Math.floor(Math.random() * 50) + 80, // 80-130 MB
            cpu: Math.random() * 3 + 1, // 1-4%
            rps: Math.floor(Math.random() * 3) + 1, // 1-4 RPS
            latency: Math.floor(Math.random() * 20) + 10, // 10-30ms
            errors: Math.floor(Math.random() * 2) // 0-1 errors
          },
          frontend: {
            performance: Math.floor(Math.random() * 10) + 85, // 85-95
            ecoIndex: Math.floor(Math.random() * 10) + 85, // 85-95
            greenIT: Math.floor(Math.random() * 10) + 85, // 85-95
            rgesn: Math.floor(Math.random() * 10) + 85 // 85-95
          },
          network: {
            bandwidth: Math.floor(Math.random() * 500) + 1500, // 1.5-2.0 MB
            requests: Math.floor(Math.random() * 10) + 35, // 35-45
            cacheHit: Math.floor(Math.random() * 10) + 85, // 85-95%
            compression: Math.floor(Math.random() * 5) + 20 // 20-25%
          },
          environmental: {
            co2: Math.random() * 0.05 + 0.10, // 0.10-0.15 gCO2e
            energy: Math.random() * 0.5 + 1.0, // 1.0-1.5 kWh
            impact: 'Faible',
            grade: 'A'
          }
        };

        setMetrics(mockMetrics);
        setLastUpdate(new Date());
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des métriques:', error);
        setIsLoading(false);
      }
    };

    // Récupération initiale
    fetchMetrics();

    // Mise à jour toutes les 5 secondes
    const interval = setInterval(fetchMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (value >= thresholds.warning) return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-24 w-24 rounded-full border-b-2 border-green-500 mx-auto mb-6" />
          <p className="text-white text-xl font-semibold">Chargement du Dashboard C5...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header avec bouton retour */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'application principale
          </button>
          
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            📊 Dashboard C5 - Mesure et Analyse Avancées
          </h1>
          <p className="text-xl text-gray-300">
            Monitoring temps réel des métriques éco-conception - Dernière mise à jour : {lastUpdate.toLocaleTimeString()}
          </p>
        </div>

        {/* Métriques Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Performance Lighthouse */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Performance</p>
                <p className="text-2xl font-bold text-white">{metrics.frontend.performance}/100</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                {getStatusIcon(metrics.frontend.performance, { good: 85, warning: 70 })}
                <span className="ml-2 text-sm text-gray-300">
                  {metrics.frontend.performance >= 85 ? 'Excellent' : 
                   metrics.frontend.performance >= 70 ? 'Bon' : 'À améliorer'}
                </span>
              </div>
            </div>
          </div>

          {/* EcoIndex */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">EcoIndex</p>
                <p className="text-2xl font-bold text-white">{metrics.frontend.ecoIndex}/100</p>
              </div>
              <Leaf className="w-8 h-8 text-green-400" />
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                {getStatusIcon(metrics.frontend.ecoIndex, { good: 85, warning: 70 })}
                <span className="ml-2 text-sm text-gray-300">
                  Grade {metrics.environmental.grade}
                </span>
              </div>
            </div>
          </div>

          {/* CO2 par Session */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">CO2/Session</p>
                <p className="text-2xl font-bold text-white">{metrics.environmental.co2.toFixed(3)} g</p>
              </div>
              <Zap className="w-8 h-8 text-orange-400" />
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                {getStatusIcon(100 - metrics.environmental.co2 * 1000, { good: 85, warning: 70 })}
                <span className="ml-2 text-sm text-gray-300">
                  {metrics.environmental.impact}
                </span>
              </div>
            </div>
          </div>

          {/* Cache Hit Rate */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Cache Hit</p>
                <p className="text-2xl font-bold text-white">{metrics.network.cacheHit}%</p>
              </div>
              <HardDrive className="w-8 h-8 text-purple-400" />
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                {getStatusIcon(metrics.network.cacheHit, { good: 85, warning: 70 })}
                <span className="ml-2 text-sm text-gray-300">
                  {metrics.network.cacheHit >= 85 ? 'Excellent' : 
                   metrics.network.cacheHit >= 70 ? 'Bon' : 'À améliorer'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Métriques Détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Métriques Serveur */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Cpu className="w-6 h-6 text-blue-400 mr-2" />
              Métriques Serveur
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">RAM</span>
                <span className="font-medium text-white">{metrics.server.ram} MB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">CPU</span>
                <span className="font-medium text-white">{metrics.server.cpu.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">RPS</span>
                <span className="font-medium text-white">{metrics.server.rps}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Latence</span>
                <span className="font-medium text-white">{metrics.server.latency}ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Erreurs</span>
                <span className="font-medium text-white">{metrics.server.errors}</span>
              </div>
            </div>
          </div>

          {/* Métriques Réseau */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Wifi className="w-6 h-6 text-green-400 mr-2" />
              Métriques Réseau
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Bande passante</span>
                <span className="font-medium text-white">{(metrics.network.bandwidth / 1024).toFixed(2)} MB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Requêtes</span>
                <span className="font-medium text-white">{metrics.network.requests}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Cache Hit</span>
                <span className="font-medium text-white">{metrics.network.cacheHit}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Compression</span>
                <span className="font-medium text-white">{metrics.network.compression}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Métriques Environnementales */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Leaf className="w-6 h-6 text-green-400 mr-2" />
            Métriques Environnementales C5
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{metrics.environmental.grade}</div>
              <div className="text-sm text-gray-300">Grade EcoIndex</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{metrics.environmental.co2.toFixed(3)}g</div>
              <div className="text-sm text-gray-300">CO2 par session</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">{metrics.environmental.energy.toFixed(2)} kWh</div>
              <div className="text-sm text-gray-300">Énergie consommée</div>
            </div>
          </div>
        </div>

        {/* Footer Dashboard */}
        <div className="text-center text-sm text-gray-400">
          <p>Dashboard C5 - Mesure et Analyse Avancées | Mise à jour automatique toutes les 5 secondes</p>
          <p className="mt-1">Projet d'éco-conception - Compétences C1-C5 en cours de validation</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardC5; 