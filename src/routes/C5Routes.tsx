// C5 Routes - Système de routage C5 simple sans dépendances externes
// Aucune dépendance avec l'application principale

import React, { useState, useEffect } from 'react';
import C5Dashboard from '../pages/C5Dashboard';
import C5Metrics from '../pages/C5Metrics';
import C5Reports from '../pages/C5Reports';
import C5Layout from '../components/C5Layout';

const C5Routes: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Écouter les changements de navigation
    window.addEventListener('popstate', handleLocationChange);
    
    // Intercepter les clics sur les liens
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const path = link.pathname;
        window.history.pushState({}, '', path);
        setCurrentPath(path);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Navigation interne C5
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Rendu conditionnel basé sur le chemin
  let content;
  switch (currentPath) {
    case '/dashboard-c5':
      content = <C5Dashboard onNavigate={navigateTo} />;
      break;
    case '/dashboard-c5/metrics':
      content = <C5Metrics onNavigate={navigateTo} />;
      break;
    case '/dashboard-c5/reports':
      content = <C5Reports onNavigate={navigateTo} />;
      break;
    default:
      content = <C5Dashboard onNavigate={navigateTo} />;
  }

  return (
    <C5Layout onNavigate={navigateTo} currentPath={currentPath}>
      {content}
    </C5Layout>
  );
};

export default C5Routes; 