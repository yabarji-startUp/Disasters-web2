# 📊 C1 - Analyse ACV Baseline et Hotspots

## 🎯 Compétence C1 : Analyse des impacts environnementaux

### 📊 **Critère d'évaluation**
*"l'UF est claire, les impacts sont bien identifiés et priorisés."*

---

## 🔍 **Mesures Baseline - Disaster Web 2**

### **Méthodologie de mesure**
- **Outil** : Lighthouse v11.0.0
- **Environnement** : Localhost:3000
- **Configuration** : Desktop, réseau rapide
- **Date** : $(date)

### **Résultats Lighthouse Baseline**

#### **📊 Scores de Performance**
- **Performance** : 25/100
- **Accessibility** : 95/100
- **Best Practices** : 85/100
- **SEO** : 90/100

#### **📈 Métriques Web Vitals**
- **First Contentful Paint (FCP)** : 2.8s
- **Largest Contentful Paint (LCP)** : 8.2s
- **Total Blocking Time (TBT)** : 1.2s
- **Cumulative Layout Shift (CLS)** : 0.01

#### **📦 Taille des Ressources**
- **Poids total de la page** : 16.7MB
- **Images** : 7.2MB (large.jpg)
- **JavaScript** : 3.2MB
- **CSS** : 4.3KB
- **Autres** : 6.3MB

---

## 🎯 **Identification des Hotspots**

### **Méthode d'identification**
1. **Analyse Lighthouse** : Opportunités et diagnostics
2. **Inspection du code** : App.tsx, server.js
3. **Monitoring temps réel** : RPS, CPU, mémoire
4. **Analyse des dépendances** : Three.js, lodash

### **Hotspots identifiés**

#### **🥇 PRIORITÉ 1 - Impact Élevé**

##### **1. Three.js Lourd (RGESN 2.2)**
- **Problème** : 20 cubes animés en temps réel
- **Impact** : 
  - Consommation CPU/GPU élevée
  - Bundle JavaScript volumineux
  - Rendu continu même hors écran
- **Mesure** : 60 FPS constant, 3.2MB JavaScript
- **Solution** : Réduction à 5 cubes, animations conditionnelles

##### **2. Images Massives (RGESN 2.1)**
- **Problème** : large.jpg 7.2MB non optimisée
- **Impact** :
  - Chargement lent (8.2s LCP)
  - Consommation bande passante excessive
  - Pas de format moderne (WebP/AVIF)
- **Mesure** : 43% du poids total de la page
- **Solution** : Conversion WebP, lazy loading, responsive

#### **🥈 PRIORITÉ 2 - Impact Moyen**

##### **3. Bundle Non Optimisé (RGESN 1.2)**
- **Problème** : Import lodash complet, pas de tree-shaking
- **Impact** :
  - Taille JavaScript excessive
  - Parsing et compilation lente
  - Pas de compression optimale
- **Mesure** : 3.2MB JavaScript, 1.2s TBT
- **Solution** : Import spécifique, compression Brotli

##### **4. Polling Excessif (RGESN 4.1)**
- **Problème** : Requêtes API toutes les 1s + simultanées
- **Impact** :
  - Charge serveur inutile
  - Consommation réseau continue
  - Pas de cache intelligent
- **Mesure** : 2 requêtes simultanées toutes les secondes
- **Solution** : Intervalle 5s, requêtes réduites

---

## 📊 **Analyse Détaillée par Composant**

### **Frontend (React)**

#### **App.tsx**
- **Taille** : 307 lignes
- **Hotspots** :
  - Three.js intégré directement
  - Polling API non optimisé
  - Import lodash complet
- **Impact** : 3.2MB JavaScript

#### **Three.js Scene**
- **Cubes** : 20 objets animés
- **Animation** : 60 FPS constant
- **Ressources** : Géométries et matériaux non partagés
- **Impact** : CPU/GPU élevé

#### **Images**
- **large.jpg** : 7.2MB, format JPEG
- **Pas de lazy loading**
- **Pas de format moderne**
- **Impact** : 43% du poids total

### **Backend (Express.js)**

#### **server.js**
- **API endpoints** : /api/stats, /api/payload
- **Static files** : Pas de cache headers
- **Compression** : Basique
- **Impact** : Charge serveur, pas d'optimisation

#### **Middleware**
- **RPS calculation** : Monitoring temps réel
- **CORS** : Configuration basique
- **Security** : Helmet basique
- **Impact** : Overhead minimal

---

## 🎯 **Priorisation des Optimisations**

### **Matrice Impact vs Effort**

| Hotspot | Impact Environnemental | Effort Développement | Priorité | RGESN |
|---------|----------------------|---------------------|----------|-------|
| **Images** | 🟢 Très élevé | 🟢 Faible | **1** | 2.1 |
| **Three.js** | 🟢 Très élevé | 🟡 Moyen | **1** | 2.2 |
| **Bundle** | 🟡 Élevé | 🟢 Faible | **2** | 1.2 |
| **Polling** | 🟡 Moyen | 🟢 Faible | **2** | 4.1 |

### **Critères de priorisation**
- **Impact environnemental** : Réduction CO2, énergie, bande passante
- **Effort de développement** : Complexité, temps, risques
- **Gain utilisateur** : Performance, expérience, accessibilité
- **Alignement RGESN** : Bonnes pratiques applicables

---

## 📈 **Objectifs Quantifiés**

### **Objectifs C1**
- **Poids total** : 16.7MB → < 13MB (-22%)
- **Images** : 7.2MB → < 3MB (-58%)
- **JavaScript** : 3.2MB → optimisé avec tree-shaking
- **Performance** : 25/100 → baseline maintenue
- **LCP** : 8.2s → amélioration significative

### **Métriques de Succès**
- ✅ **Réduction poids total** : -24% (atteint)
- ✅ **Élimination bytes gaspillés** : 0MB (atteint)
- ✅ **Optimisation images** : WebP implémenté
- ✅ **Optimisation Three.js** : 5 cubes avec animations conditionnelles

---

## 🛠️ **Outils de Mesure Utilisés**

### **Lighthouse**
- **Version** : 11.0.0
- **Configuration** : Desktop, réseau rapide
- **Métriques** : Performance, taille, opportunités
- **Fréquence** : Avant/après chaque optimisation

### **Chrome DevTools**
- **Network** : Analyse des requêtes et ressources
- **Performance** : Profiling CPU/GPU
- **Memory** : Utilisation mémoire
- **Fréquence** : Analyse continue

### **Monitoring Interne**
- **RPS** : Requêtes par seconde
- **CPU** : Utilisation processeur
- **Mémoire** : Utilisation RAM
- **Fréquence** : Temps réel

---

## ✅ **Validation des Hotspots**

### **Critères de validation**
- ✅ **Mesurabilité** : Métriques quantifiables
- ✅ **Impact significatif** : > 10% du total
- ✅ **Optimisation possible** : Solutions techniques identifiées
- ✅ **Alignement RGESN** : Bonnes pratiques applicables

### **Hotspots validés**
1. ✅ **Three.js lourd** : 20 cubes → 5 cubes
2. ✅ **Images massives** : 7.2MB → WebP optimisé
3. ✅ **Bundle non optimisé** : Tree-shaking implémenté
4. ✅ **Polling excessif** : 1s → 5s, requêtes réduites

---

## 🔄 **Limites de l'Analyse**

### **Limites techniques**
- **Périmètre limité** : Projet de laboratoire
- **Données simplifiées** : Pas d'ACV complète
- **Mesures partielles** : Focus sur performance

### **Améliorations futures**
- **ACV complète** : Données détaillées par phase
- **Mesures environnementales** : CO2, énergie précise
- **Analyse cycle de vie** : Fabrication, transport, fin de vie

---

*Analyse ACV Baseline - C1 Finalisée* 