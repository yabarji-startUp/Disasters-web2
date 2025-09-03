// C5 Layout - Layout principal pour le dashboard C5
// Complètement séparé de l'application principale

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Home,
  Settings,
  RefreshCw
} from 'lucide-react';

// Lazy loading pour Three.js (RGESN 1.2) - Même composant que le dashboard principal
const ThreeScene = lazy(() => import('../components/ThreeScene'));

interface C5LayoutProps {
  children: React.ReactNode;
  onNavigate: (path: string) => void;
  currentPath: string;
}

const C5Layout: React.FC<C5LayoutProps> = ({ children, onNavigate, currentPath }) => {
  const [show3D, setShow3D] = useState(false);

  // RGESN 2.2 : Optimisation du rendu 3D - Chargement différé
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow3D(true);
    }, 2000); // Retarde le chargement 3D de 2 secondes

    return () => clearTimeout(timer);
  }, []);

  const navigationItems = [
    { path: '/dashboard-c5', label: 'Dashboard', icon: Home },
    { path: '/dashboard-c5/metrics', label: 'Métriques', icon: BarChart3 },
    { path: '/dashboard-c5/reports', label: 'Rapports', icon: FileText },
  ];

  const isActiveRoute = (path: string) => currentPath === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Image de fond fixe pour mettre la rosace en arrière-plan */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <img 
          src="/static/large.jpg" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" 
          loading="lazy"
          alt="Background pattern"
        />
      </div>

      {/* Rosace 3D en arrière-plan - Même style que le dashboard principal */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <Suspense fallback={<div className="w-full h-full" />}>
            {show3D && (
              <div className="w-full h-full flex items-center justify-center">
                <ThreeScene />
              </div>
            )}
          </Suspense>
        </div>
      </div>
      
      <div className="relative z-10">
        {/* Header C5 */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    C5 Dashboard
                  </h1>
                </div>
                <span className="text-sm text-gray-300 bg-gray-800 px-2 py-1 rounded">
                  Mesure & Analyse Avancées
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-300 hover:text-white transition-colors">
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-300 hover:text-white transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Retour App Principale
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation C5 */}
        <nav className="bg-black/10 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => onNavigate(item.path)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      isActiveRoute(item.path)
                        ? 'border-green-400 text-green-400'
                        : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Contenu principal C5 */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer C5 */}
        <footer className="bg-black/20 border-t border-white/10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="text-center text-sm text-gray-400">
              <p>Dashboard C5 - Mesure et Analyse Avancées | RGESN Compliant | Eco-Responsable</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default C5Layout; 