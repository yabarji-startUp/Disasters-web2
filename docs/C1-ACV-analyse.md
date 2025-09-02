# 📊 C1 - Analyse ACV Disaster-web2

## 🎯 Compétence C1 : Analyse de Cycle de Vie Simplifiée

### **Unité Fonctionnelle (UF)**
**"Participer à une formation éco-conception via la plateforme disaster-web2"**

---

## 📈 Résultats de mesure AVANT optimisation

### **Métriques Lighthouse (Baseline)**

| Catégorie | Score | Grade | État |
|-----------|-------|-------|------|
| **Performance** | 25/100 | F | ❌ Critique |
| **Accessibility** | 79/100 | B | ✅ Bon |
| **Best Practices** | 100/100 | A | ✅ Excellent |
| **SEO** | 75/100 | B | ✅ Bon |

### **Métriques détaillées**

#### **Performance (Impact environnemental principal)**
- **DOM Size** : 174 éléments
- **Total Blocking Time** : 950ms (économies possibles)
- **Image Delivery** : 6,830 KiB d'économies possibles
- **First Contentful Paint** : Mesuré
- **Largest Contentful Paint** : Mesuré

#### **Ressources identifiées**
- **Images non optimisées** : 6,830 KiB
- **JavaScript** : Bundle volumineux
- **CSS** : Styles non purgés
- **Réseau** : Requêtes multiples

---

## 🔍 Analyse par phase du cycle de vie

### **Phase 1 : Développement**
- **Impact** : Faible (développement local)
- **Ressources** : Énergie développeur, serveur de développement
- **Optimisations** : Code splitting, tree shaking

### **Phase 2 : Déploiement**
- **Impact** : Moyen (build production)
- **Ressources** : Serveur de build, bande passante
- **Optimisations** : Minification, compression

### **Phase 3 : Utilisation (CRITIQUE)**
- **Impact** : Élevé (utilisation continue)
- **Ressources** : Serveur production, navigateur utilisateur
- **Optimisations** : Cache, images optimisées, bundle réduit

### **Phase 4 : Fin de vie**
- **Impact** : Faible (maintenance)
- **Ressources** : Serveur, stockage
- **Optimisations** : Monitoring, maintenance préventive

---

## 🎯 Hotspots identifiés

### **1. Images non optimisées (PRIORITÉ HAUTE)**
- **Impact** : 6,830 KiB d'économies possibles
- **Phase** : Utilisation
- **Solution** : Conversion WebP, compression, lazy loading
- **Gain estimé** : -80% de la taille des images

### **2. Bundle JavaScript volumineux (PRIORITÉ HAUTE)**
- **Impact** : Performance 25/100
- **Phase** : Utilisation
- **Solution** : Code splitting, tree shaking, minification
- **Gain estimé** : -60% de la taille du bundle

### **3. DOM complexe (PRIORITÉ MOYENNE)**
- **Impact** : 174 éléments, TBT 950ms
- **Phase** : Utilisation
- **Solution** : Simplification, virtualisation
- **Gain estimé** : -40% de la complexité DOM

### **4. Cache non optimisé (PRIORITÉ MOYENNE)**
- **Impact** : Rechargement systématique
- **Phase** : Utilisation
- **Solution** : Headers cache, Service Workers
- **Gain estimé** : -70% des requêtes réseau

---

## 📊 Calcul d'impact environnemental

### **Formule ACV simplifiée**
```
Impact = (Ressources × Facteur_émission) + (Bande_passante × Facteur_réseau)
```

### **Facteurs d'émission utilisés**
- **Électricité serveur** : 0.5 kgCO2e/kWh
- **Électricité client** : 0.1 kgCO2e/kWh
- **Réseau** : 0.05 kgCO2e/GB

### **Impact actuel estimé**
- **Images** : 6,830 KiB × 0.05 kgCO2e/GB = 0.34 gCO2e
- **JavaScript** : ~2MB × 0.05 kgCO2e/GB = 0.10 gCO2e
- **Total par session** : ~0.44 gCO2e

### **Impact après optimisation estimé**
- **Images optimisées** : 1,366 KiB × 0.05 kgCO2e/GB = 0.07 gCO2e
- **JavaScript optimisé** : 800KB × 0.05 kgCO2e/GB = 0.04 gCO2e
- **Total par session** : ~0.11 gCO2e

### **Gain environnemental**
- **Réduction CO2** : 0.44 → 0.11 gCO2e (-75%)
- **Réduction bande passante** : 8,830 → 2,166 KiB (-75%)

---

## 🎯 Priorisation des optimisations

### **PRIORITÉ 1 - Quick Wins (Impact élevé, Effort faible)**
1. **Optimisation images** : Conversion WebP, compression
2. **Activation cache** : Headers appropriés
3. **Purge CSS** : Suppression styles inutilisés

### **PRIORITÉ 2 - Optimisations moyennes (Impact élevé, Effort moyen)**
4. **Code splitting** : Séparation des bundles
5. **Tree shaking** : Suppression code inutilisé
6. **Minification** : Réduction taille fichiers

### **PRIORITÉ 3 - Optimisations avancées (Impact moyen, Effort élevé)**
7. **Service Workers** : Cache avancé
8. **Lazy loading** : Chargement à la demande
9. **Virtualisation DOM** : Réduction complexité

---

## 📋 Limites et incertitudes

### **Limites méthodologiques**
- **Périmètre simplifié** : Focus sur l'utilisation
- **Données proxy** : Lighthouse comme indicateur EcoIndex
- **Facteurs d'émission** : Valeurs moyennes

### **Incertitudes**
- **Variabilité réseau** : ±20% sur bande passante
- **Hétérogénéité clients** : ±30% sur consommation
- **Facteurs d'émission** : ±15% sur CO2

### **Validations nécessaires**
- **Mesures réelles** : EcoIndex, GreenIT
- **Tests utilisateurs** : Performance perçue
- **Monitoring continu** : Métriques temps réel

---

## 🎯 Objectifs de réduction

### **Objectifs chiffrés**
- **Performance Lighthouse** : 25 → 85 (+240%)
- **Taille images** : 6,830 → 1,366 KiB (-80%)
- **Bundle JavaScript** : ~2MB → 800KB (-60%)
- **Impact CO2** : 0.44 → 0.11 gCO2e (-75%)

### **Indicateurs de succès**
- **EcoIndex** : C/D → A/B (+2 grades)
- **Temps de chargement** : Réduction significative
- **Bande passante** : -75% de consommation
- **Expérience utilisateur** : Amélioration perçue

---

## 📈 Prochaines étapes

### **1. Validation des mesures**
- Mesurer avec EcoIndex réel
- Comparer avec GreenIT Analysis
- Valider les gains estimés

### **2. Implémentation des optimisations**
- Priorité 1 : Quick wins
- Priorité 2 : Optimisations moyennes
- Priorité 3 : Optimisations avancées

### **3. Mesure après optimisation**
- Nouveau audit Lighthouse
- Comparaison avant/après
- Validation des gains

### **4. Documentation et partage**
- Rapport final C1
- Méthodologie reproductible
- Recommandations pour Zoom

---

*Analyse ACV simplifiée disaster-web2 - Compétence C1* 