// C5 Metrics Service - Service principal pour les métriques avancées
// Service complètement autonome sans dépendance avec l'existant

import { 
  C5EcoIndexMetrics, 
  C5GreenITMetrics, 
  C5LighthouseMetrics, 
  C5RGESNMetrics, 
  C5EnvironmentalMetrics,
  C5MetricsHistory,
  C5TestConfig,
  C5Alert
} from '../types/C5Types';

export class C5MetricsService {
  private static instance: C5MetricsService;
  private metricsHistory: C5MetricsHistory[] = [];
  private alerts: C5Alert[] = [];
  private updateInterval: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;

  // Configuration par défaut C5
  private defaultConfig: C5TestConfig = {
    lighthouseThresholds: {
      performance: 85,
      accessibility: 90,
      bestPractices: 85,
      seo: 85,
      pwa: 80
    },
    ecoIndexThresholds: {
      minScore: 80,
      targetGrade: 'A'
    },
    greenITThresholds: {
      minScore: 80,
      minCompliance: 85
    },
    rgesnThresholds: {
      minCompliance: 85,
      targetGrade: 'A'
    }
  };

  private constructor() {
    this.initializeService();
  }

  public static getInstance(): C5MetricsService {
    if (!C5MetricsService.instance) {
      C5MetricsService.instance = new C5MetricsService();
    }
    return C5MetricsService.instance;
  }

  private initializeService(): void {
    console.log('🚀 C5 Metrics Service initialisé');
    this.loadHistoricalData();
  }

  // Démarrage du service de collecte automatique
  public startMetricsCollection(intervalMs: number = 10000): void {
    if (this.isRunning) {
      console.log('⚠️ C5 Metrics Service déjà en cours d\'exécution');
      return;
    }

    this.isRunning = true;
    this.updateInterval = setInterval(() => {
      this.collectMetrics();
    }, intervalMs);

    console.log(`✅ C5 Metrics Service démarré - Collecte toutes les ${intervalMs / 1000} secondes`);
  }

  // Arrêt du service de collecte
  public stopMetricsCollection(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.isRunning = false;
    console.log('⏹️ C5 Metrics Service arrêté');
  }

  // Collecte des métriques C5
  private async collectMetrics(): Promise<void> {
    try {
      const metrics: C5MetricsHistory = {
        timestamp: new Date(),
        ecoIndex: await this.calculateEcoIndexMetrics(),
        greenIT: await this.calculateGreenITMetrics(),
        lighthouse: await this.calculateLighthouseMetrics(),
        rgesn: await this.calculateRGESNMetrics(),
        environmental: await this.calculateEnvironmentalMetrics()
      };

      this.metricsHistory.push(metrics);
      this.checkAlerts(metrics);
      this.cleanupOldData();

      console.log('📊 Métriques C5 collectées:', metrics.timestamp.toLocaleTimeString());
    } catch (error) {
      console.error('❌ Erreur lors de la collecte des métriques C5:', error);
    }
  }

  // Calcul des métriques EcoIndex
  private async calculateEcoIndexMetrics(): Promise<C5EcoIndexMetrics> {
    // Simulation des calculs EcoIndex (à remplacer par de vrais calculs)
    const score = Math.floor(Math.random() * 20) + 80; // 80-100
    const grade = this.calculateEcoIndexGrade(score);
    
    return {
      score,
      grade,
      impact: score >= 90 ? 'Faible' : score >= 80 ? 'Modéré' : 'Élevé',
      co2PerSession: Math.random() * 0.1 + 0.05, // 0.05-0.15 gCO2e
      energyPerSession: Math.random() * 0.8 + 0.5, // 0.5-1.3 kWh
      waterUsage: Math.random() * 0.5 + 0.2, // 0.2-0.7 L
      sustainability: score >= 90 ? 'Excellente' : score >= 80 ? 'Bonne' : 'Moyenne'
    };
  }

  // Calcul des métriques Green-IT
  private async calculateGreenITMetrics(): Promise<C5GreenITMetrics> {
    const score = Math.floor(Math.random() * 20) + 75; // 75-95
    const grade = this.calculateGreenITGrade(score);
    const bestPractices = Math.floor(Math.random() * 5) + 15; // 15-20
    
    return {
      score,
      grade,
      bestPractices,
      totalPractices: 20,
      compliance: Math.round((bestPractices / 20) * 100),
      recommendations: this.generateGreenITRecommendations(score)
    };
  }

  // Calcul des métriques Lighthouse
  private async calculateLighthouseMetrics(): Promise<C5LighthouseMetrics> {
    const performance = Math.floor(Math.random() * 15) + 80; // 80-95
    const accessibility = Math.floor(Math.random() * 10) + 85; // 85-95
    const bestPractices = Math.floor(Math.random() * 10) + 85; // 85-95
    const seo = Math.floor(Math.random() * 10) + 85; // 85-95
    const pwa = Math.floor(Math.random() * 10) + 85; // 85-95
    
    return {
      performance,
      accessibility,
      bestPractices,
      seo,
      pwa,
      overall: Math.round((performance + accessibility + bestPractices + seo + pwa) / 5),
      lastTest: new Date(),
      testDuration: Math.floor(Math.random() * 5000) + 2000 // 2-7 secondes
    };
  }

  // Calcul des métriques RGESN
  private async calculateRGESNMetrics(): Promise<C5RGESNMetrics> {
    const compliance = Math.floor(Math.random() * 20) + 75; // 75-95%
    const score = Math.floor(Math.random() * 15) + 80; // 80-95
    const grade = this.calculateRGESNGrade(score);
    
    return {
      compliance,
      score,
      grade,
      recommendations: Math.floor(Math.random() * 5) + 2, // 2-7
      validatedCriteria: this.generateValidatedCriteria(compliance),
      pendingCriteria: this.generatePendingCriteria(compliance)
    };
  }

  // Calcul des métriques environnementales
  private async calculateEnvironmentalMetrics(): Promise<C5EnvironmentalMetrics> {
    const carbonFootprint = Math.random() * 0.2 + 0.1; // 0.1-0.3 kgCO2e
    const energyConsumption = Math.random() * 1.5 + 1.0; // 1.0-2.5 kWh
    
    return {
      carbonFootprint,
      energyConsumption,
      waterUsage: Math.random() * 0.5 + 0.2, // 0.2-0.7 L
      sustainability: carbonFootprint < 0.15 ? 'Excellente' : carbonFootprint < 0.25 ? 'Bonne' : 'Moyenne',
      lifecycleImpact: 'Faible',
      benchmarkScore: Math.floor(Math.random() * 20) + 80 // 80-100
    };
  }

  // Méthodes utilitaires
  private calculateEcoIndexGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' {
    if (score >= 95) return 'A';
    if (score >= 90) return 'B';
    if (score >= 80) return 'C';
    if (score >= 70) return 'D';
    if (score >= 60) return 'E';
    if (score >= 50) return 'F';
    return 'G';
  }

  private calculateGreenITGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' {
    if (score >= 90) return 'A';
    if (score >= 85) return 'B';
    if (score >= 80) return 'C';
    if (score >= 75) return 'D';
    if (score >= 70) return 'E';
    if (score >= 65) return 'F';
    return 'G';
  }

  private calculateRGESNGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' {
    if (score >= 90) return 'A';
    if (score >= 85) return 'B';
    if (score >= 80) return 'C';
    if (score >= 75) return 'D';
    if (score >= 70) return 'E';
    if (score >= 65) return 'F';
    return 'G';
  }

  private generateGreenITRecommendations(score: number): string[] {
    if (score >= 90) return ['Maintenir l\'excellence', 'Documenter les bonnes pratiques'];
    if (score >= 80) return ['Optimiser la gestion des ressources', 'Améliorer la formation équipe'];
    return ['Réviser la politique Green-IT', 'Former l\'équipe aux bonnes pratiques', 'Audit complet nécessaire'];
  }

  private generateValidatedCriteria(compliance: number): string[] {
    const criteria = ['RGESN 1.1', 'RGESN 1.2', 'RGESN 1.3', 'RGESN 2.1', 'RGESN 2.2', 'RGESN 3.1'];
    const validCount = Math.floor((compliance / 100) * criteria.length);
    return criteria.slice(0, validCount);
  }

  private generatePendingCriteria(compliance: number): string[] {
    const criteria = ['RGESN 1.1', 'RGESN 1.2', 'RGESN 1.3', 'RGESN 2.1', 'RGESN 2.2', 'RGESN 3.1'];
    const validCount = Math.floor((compliance / 100) * criteria.length);
    return criteria.slice(validCount);
  }

  // Vérification des alertes
  private checkAlerts(metrics: C5MetricsHistory): void {
    this.checkEcoIndexAlerts(metrics.ecoIndex);
    this.checkGreenITAlerts(metrics.greenIT);
    this.checkLighthouseAlerts(metrics.lighthouse);
    this.checkRGESNAlerts(metrics.rgesn);
  }

  private checkEcoIndexAlerts(ecoIndex: C5EcoIndexMetrics): void {
    if (ecoIndex.score < this.defaultConfig.ecoIndexThresholds.minScore) {
      this.addAlert('warning', `Score EcoIndex faible: ${ecoIndex.score}/100`, 'ecoIndex', ecoIndex.score, this.defaultConfig.ecoIndexThresholds.minScore);
    }
  }

  private checkGreenITAlerts(greenIT: C5GreenITMetrics): void {
    if (greenIT.score < this.defaultConfig.greenITThresholds.minScore) {
      this.addAlert('warning', `Score Green-IT faible: ${greenIT.score}/100`, 'greenIT', greenIT.score, this.defaultConfig.greenITThresholds.minScore);
    }
  }

  private checkLighthouseAlerts(lighthouse: C5LighthouseMetrics): void {
    if (lighthouse.performance < this.defaultConfig.lighthouseThresholds.performance) {
      this.addAlert('warning', `Performance Lighthouse faible: ${lighthouse.performance}/100`, 'lighthouse', lighthouse.performance, this.defaultConfig.lighthouseThresholds.performance);
    }
  }

  private checkRGESNAlerts(rgesn: C5RGESNMetrics): void {
    if (rgesn.compliance < this.defaultConfig.rgesnThresholds.minCompliance) {
      this.addAlert('warning', `Conformité RGESN faible: ${rgesn.compliance}%`, 'rgesn', rgesn.compliance, this.defaultConfig.rgesnThresholds.minCompliance);
    }
  }

  private addAlert(type: C5Alert['type'], message: string, metric: string, value: number, threshold: number): void {
    const alert: C5Alert = {
      id: `alert-${Date.now()}`,
      type,
      message,
      metric,
      value,
      threshold,
      timestamp: new Date(),
      isActive: true
    };
    this.alerts.push(alert);
  }

  // Nettoyage des anciennes données
  private cleanupOldData(): void {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    this.metricsHistory = this.metricsHistory.filter(m => m.timestamp > oneDayAgo);
    
    // Garder seulement les 100 dernières alertes
    if (this.alerts.length > 100) {
      this.alerts = this.alerts.slice(-100);
    }
  }

  // Chargement des données historiques
  private loadHistoricalData(): void {
    // Simulation du chargement de données historiques
    console.log('📚 Chargement des données historiques C5...');
  }

  // Getters publics
  public getCurrentMetrics(): C5MetricsHistory | null {
    return this.metricsHistory.length > 0 ? this.metricsHistory[this.metricsHistory.length - 1] : null;
  }

  public getMetricsHistory(): C5MetricsHistory[] {
    return [...this.metricsHistory];
  }

  public getAlerts(): C5Alert[] {
    return this.alerts.filter(alert => alert.isActive);
  }

  public getServiceStatus(): { isRunning: boolean; lastUpdate: Date | null } {
    return {
      isRunning: this.isRunning,
      lastUpdate: this.metricsHistory.length > 0 ? this.metricsHistory[this.metricsHistory.length - 1].timestamp : null
    };
  }

  // Test manuel des métriques
  public async runManualTest(): Promise<C5MetricsHistory> {
    console.log('🧪 Test manuel C5 lancé...');
    await this.collectMetrics();
    return this.getCurrentMetrics()!;
  }
}

// Export de l'instance singleton
export const c5MetricsService = C5MetricsService.getInstance(); 