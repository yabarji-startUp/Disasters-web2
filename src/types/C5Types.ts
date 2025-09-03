// C5 Types - Mesure et Analyse Avancées
// Types spécialisés pour les métriques C5 (EcoIndex, Green-IT, Lighthouse, RGESN)

export interface C5EcoIndexMetrics {
  score: number;           // Score EcoIndex (0-100)
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';  // Grade EcoIndex
  impact: 'Faible' | 'Modéré' | 'Élevé';            // Impact environnemental
  co2PerSession: number;   // CO2 par session (gCO2e)
  energyPerSession: number; // Énergie par session (kWh)
  waterUsage: number;      // Consommation eau (L)
  sustainability: string;   // Niveau de durabilité
}

export interface C5GreenITMetrics {
  score: number;           // Score Green-IT (0-100)
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';  // Grade Green-IT
  bestPractices: number;   // Nombre de bonnes pratiques appliquées
  totalPractices: number;  // Total des bonnes pratiques
  compliance: number;      // Pourcentage de conformité
  recommendations: string[]; // Recommandations d'amélioration
}

export interface C5LighthouseMetrics {
  performance: number;     // Score Performance (0-100)
  accessibility: number;   // Score Accessibilité (0-100)
  bestPractices: number;  // Score Bonnes Pratiques (0-100)
  seo: number;            // Score SEO (0-100)
  pwa: number;            // Score PWA (0-100)
  overall: number;        // Score global moyen
  lastTest: Date;         // Date du dernier test
  testDuration: number;   // Durée du test (ms)
}

export interface C5RGESNMetrics {
  compliance: number;      // Pourcentage de conformité RGESN
  score: number;           // Score RGESN (0-100)
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';  // Grade RGESN
  recommendations: number; // Nombre de recommandations
  validatedCriteria: string[]; // Critères validés
  pendingCriteria: string[];   // Critères en attente
}

export interface C5EnvironmentalMetrics {
  carbonFootprint: number; // Empreinte carbone totale (kgCO2e)
  energyConsumption: number; // Consommation énergétique (kWh)
  waterUsage: number;      // Consommation eau (L)
  sustainability: string;   // Niveau de durabilité
  lifecycleImpact: string; // Impact cycle de vie
  benchmarkScore: number;  // Score par rapport au benchmark
}

export interface C5MetricsHistory {
  timestamp: Date;         // Horodatage de la mesure
  ecoIndex: C5EcoIndexMetrics;
  greenIT: C5GreenITMetrics;
  lighthouse: C5LighthouseMetrics;
  rgesn: C5RGESNMetrics;
  environmental: C5EnvironmentalMetrics;
}

export interface C5DashboardState {
  currentMetrics: C5MetricsHistory;
  historicalData: C5MetricsHistory[];
  isLoading: boolean;
  lastUpdate: Date;
  error: string | null;
}

export interface C5TestConfig {
  lighthouseThresholds: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    pwa: number;
  };
  ecoIndexThresholds: {
    minScore: number;
    targetGrade: string;
  };
  greenITThresholds: {
    minScore: number;
    minCompliance: number;
  };
  rgesnThresholds: {
    minCompliance: number;
    targetGrade: string;
  };
}

export interface C5Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  metric: string;
  value: number;
  threshold: number;
  timestamp: Date;
  isActive: boolean;
} 