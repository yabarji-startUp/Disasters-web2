# 📋 C1 - Méthodologie ACV Simplifiée

## 🎯 Compétence C1 : Conduire une ACV simplifiée d'un service numérique

### 📊 **Critère d'évaluation**
*"l'UF est claire, les impacts sont bien identifiés et priorisés."*

---

## 🔍 **Méthodologie ACV Simplifiée**

### **Approche Choisie : Screening (Simplifiée)**

#### **Justification du choix**
- **Contexte** : Projet de laboratoire disaster-web2
- **Objectif** : Identifier rapidement les hotspots environnementaux
- **Contrainte** : Données limitées, focus sur optimisations prioritaires
- **Avantage** : Approche pragmatique et efficace pour l'éco-conception

#### **Méthodologie appliquée**
1. **Identification de l'UF** : "Participer à une visioconférence avec Zoom"
2. **Définition du périmètre** : Frontend React + Backend Express
3. **Analyse des phases** : Développement, Utilisation, Fin de vie
4. **Identification des hotspots** : Composants les plus impactants
5. **Priorisation** : Impact vs Effort pour optimisations

---

## 🎯 **Unité Fonctionnelle (UF)**

### **Définition**
**"Participer à une visioconférence avec Zoom"**

### **Contexte d'utilisation**
- **Utilisateur** : Participant à une visioconférence
- **Action** : Rejoindre et participer à une session Zoom
- **Résultat** : Communication audio/vidéo en temps réel

### **Périmètre système**
- **Frontend** : Interface utilisateur React
- **Backend** : API Express.js
- **Ressources** : Images, JavaScript, CSS, données
- **Infrastructure** : Serveur local (disaster-web2)

---

## 📊 **Périmètre de l'ACV**

### **Frontend (React)**
- **Composants** : App.tsx, OptimizedImage, OptimizedThreeJS
- **Ressources** : Images, JavaScript, CSS
- **Interactions** : Polling API, animations 3D

### **Backend (Express.js)**
- **API** : Endpoints pour métriques et données
- **Static** : Servage d'assets optimisés
- **Middleware** : Compression, cache, monitoring

### **Données**
- **Massive-data.json** : Dataset d'entraînement
- **API payload** : Données temps réel
- **Métriques** : Performance et environnement

---

## 🔄 **Phases du Cycle de Vie**

### **1. Développement**
- **Impact** : Écriture du code, tests
- **Hotspots** : Bundle JavaScript, images de développement

### **2. Utilisation**
- **Impact** : Chargement, exécution, interactions
- **Hotspots** : Three.js, polling API, cache

### **3. Fin de vie**
- **Impact** : Nettoyage, archivage
- **Hotspots** : Limité (projet de laboratoire)

---

## 🎯 **Identification des Hotspots**

### **Méthode d'identification**
1. **Analyse du code source** : App.tsx, server.js
2. **Mesures Lighthouse** : Performance, taille des ressources
3. **Analyse des dépendances** : Three.js, lodash
4. **Monitoring temps réel** : RPS, CPU, mémoire

### **Hotspots identifiés**

#### **🥇 PRIORITÉ 1 - Impact Élevé**
1. **Three.js lourd** (RGESN 2.2)
   - **Problème** : 20 cubes animés en temps réel
   - **Impact** : Consommation CPU/GPU élevée
   - **Solution** : Réduction à 5 cubes, optimisations GPU

2. **Images massives** (RGESN 2.1)
   - **Problème** : large.jpg 7.2MB
   - **Impact** : Chargement lent, bande passante
   - **Solution** : Conversion WebP, lazy loading

#### **🥈 PRIORITÉ 2 - Impact Moyen**
3. **Bundle non optimisé** (RGESN 1.2)
   - **Problème** : Pas de tree-shaking, lodash complet
   - **Impact** : Taille JavaScript excessive
   - **Solution** : Import spécifique, compression

4. **Polling excessif** (RGESN 4.1)
   - **Problème** : Requêtes 1s + simultanées
   - **Impact** : Charge serveur, bande passante
   - **Solution** : Intervalle 5s, requêtes réduites

---

## 📈 **Priorisation des Optimisations**

### **Matrice Impact vs Effort**

| Optimisation | Impact | Effort | Priorité |
|--------------|--------|--------|----------|
| **Images WebP** | 🟢 Élevé | 🟢 Faible | **1** |
| **Three.js** | 🟢 Élevé | 🟡 Moyen | **1** |
| **Bundle** | 🟡 Moyen | 🟢 Faible | **2** |
| **Polling** | 🟡 Moyen | 🟢 Faible | **2** |

### **Critères de priorisation**
- **Impact environnemental** : Réduction CO2, énergie
- **Effort de développement** : Complexité, temps
- **Gain utilisateur** : Performance, expérience
- **Alignement RGESN** : Bonnes pratiques applicables

---

## 🛠️ **Outils de Mesure**

### **Lighthouse**
- **Métriques** : Performance, taille des ressources
- **Méthode** : Audit automatisé
- **Fréquence** : Avant/après chaque optimisation

### **EcoIndex**
- **Métriques** : Score environnemental, grade
- **Méthode** : Extension navigateur
- **Fréquence** : Validation finale

### **Monitoring interne**
- **Métriques** : RPS, CPU, mémoire
- **Méthode** : Middleware Express
- **Fréquence** : Temps réel

---

## 📊 **Métriques de Référence**

### **Baseline (Avant optimisations)**
- **Poids total** : 16.7MB
- **Images** : 7.2MB
- **JavaScript** : 3.2MB
- **Performance Lighthouse** : 25/100

### **Objectifs C1**
- **Poids total** : < 13MB (-22%)
- **Images** : < 3MB (-58%)
- **JavaScript** : Optimisé avec tree-shaking
- **Performance** : Baseline maintenue

---

## ✅ **Validation C1**

### **Critères de réussite**
- ✅ **UF claire** : "Participer à une visioconférence avec Zoom"
- ✅ **Impacts identifiés** : 4 hotspots priorisés
- ✅ **Méthodologie** : ACV screening documentée
- ✅ **Mesures** : Baseline disaster-web2 établie
- ✅ **Priorisation** : Matrice Impact vs Effort

### **Livrables C1**
- ✅ **Documentation** : Méthodologie ACV
- ✅ **Analyse** : Hotspots identifiés et priorisés
- ✅ **Implémentations** : 4 optimisations prioritaires
- ✅ **Mesures** : Résultats avant/après

---

## 🔄 **Limites et Améliorations**

### **Limites de l'approche**
- **Données simplifiées** : Pas d'ACV complète
- **Périmètre limité** : Projet de laboratoire
- **Mesures partielles** : Focus sur performance

### **Améliorations futures**
- **ACV complète** : Données détaillées par phase
- **Mesures environnementales** : CO2, énergie précise
- **Analyse cycle de vie** : Fabrication, transport, fin de vie

---

*Méthodologie ACV simplifiée - C1 Finalisée* 