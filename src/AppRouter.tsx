// AppRouter - Routeur principal de l'application
// Gère la redirection vers le dashboard C5 sans modifier App.tsx

import React, { useEffect } from 'react';
import App from './App';
import C5Routes from './routes/C5Routes';

const AppRouter: React.FC = () => {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

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

  // Redirection vers C5 si l'URL correspond
  if (currentPath.startsWith('/dashboard-c5')) {
    return <C5Routes />;
  }

  // Sinon, afficher l'application principale
  return <App />;
};

export default AppRouter; 