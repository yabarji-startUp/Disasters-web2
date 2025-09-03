import React from 'react';
import { BarChart3, ExternalLink } from 'lucide-react';

interface DashboardLinkProps {
  className?: string;
}

const DashboardLink: React.FC<DashboardLinkProps> = ({ className = '' }) => {
  const openDashboard = () => {
    // Ouvre le Dashboard C5 dans un nouvel onglet
    window.open('/dashboard-c5', '_blank');
  };

  return (
    <button
      onClick={openDashboard}
      className={`inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 ${className}`}
      title="Ouvrir le Dashboard C5 - Mesure et Analyse Avancées"
    >
      <BarChart3 className="w-4 h-4 mr-2" />
      Dashboard C5
      <ExternalLink className="w-4 h-4 ml-2" />
    </button>
  );
};

export default DashboardLink; 