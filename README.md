# 🌱 Disaster Web 2 - Projet Éco-conception

## 📋 Présentation du Projet

**Disaster Web 2** est un projet de laboratoire pour l'éco-conception numérique, servant de support pratique pour l'optimisation et la mesure d'impact environnemental. Ce projet s'inscrit dans le cadre d'une certification en éco-conception avec une approche duale :

- **UF Zoom** : Unité Fonctionnelle "Participer à une visioconférence avec Zoom" (analyse théorique)
- **Disaster Web 2** : Projet pratique pour implémentation et mesure des optimisations

## 🎯 Objectifs du Projet

### 🌍 **Objectif Principal**
Conduire une éco-optimisation complète : diagnostic → cadrage → implémentation → mesure → impact, avec une synthèse livrée sous forme de dossier PDF et support de décision.

### 📊 **Objectifs Spécifiques**
- **ACV Simplifiée** : Identifier et prioriser les impacts environnementaux
- **Cadrage & Budget** : Définir objectifs et contraintes environnementales
- **Référentiel Projet** : Adapter les bonnes pratiques RGESN
- **Implémentations** : Optimiser le service sur disaster-web2
- **Mesure & Analyse** : Quantifier les gains avant/après

## 🎓 Compétences Évaluées (C1-C5)

### **✅ C1 - ACV Simplifiée** COMPLÉTÉE
**Statut** : ✅ **FINALISÉE** - Méthodologie ACV screening validée
**PR** : ✅ **VALIDÉE** - Mergée dans develop avec tag v0.1-acv

**Méthodologie ACV** :
- **Approche** : Screening (simplifiée) pour disaster-web2
- **UF** : "Participer à une visioconférence avec Zoom"
- **Périmètre** : Frontend React + Backend Express
- **Phases** : Développement, Utilisation, Fin de vie

**Hotspots ACV identifiés** :
1. **Phase Réseau** : 8,830 KiB par session, 1470 requêtes (Impact Élevé)
2. **Phase Terminal** : 174 éléments DOM, 6,830 KiB images (Impact Moyen)
3. **Phase Serveur** : CPU élevé, pas de cache, polling excessif (Impact Faible)

**Données collectées** :
- **Logs disaster-web2** : Requêtes, temps de réponse
- **Métriques réseau** : Bande passante consommée
- **Facteurs d'émission** : Base Carbone ADEME
- **Limites documentées** : Périmètre simplifié, données proxy

**Priorisation ACV** : Utilisation/Réseau > Utilisation/Terminal > Serveur > Développement

### **✅ C2 - Cadrage et Budget Environnemental** COMPLÉTÉE
**Statut** : ✅ **FINALISÉE** - Cadrage validé et tests automatisés implémentés

**Cadrage du Projet** :
- **Contraintes techniques** : WebRTC, vidéo streaming, latence < 150ms, 100+ participants
- **Contraintes environnementales** : RGESN, EcoIndex > 85/100, -30% CO2 vs Zoom
- **Contraintes budgétaires** : 300k€ sur 6 mois, 12 personnes, infrastructure cloud green
- **Contraintes temporelles** : 6 mois (septembre 2024 - février 2025), jalons critiques mensuels

**Budget Environnemental** :
- **Métriques baseline** : 16.7MB poids total, Performance 25/100
- **Objectifs Zoom** : -30% CO2, -40% bande passante, EcoIndex > 85/100
- **Budget par compétence** : C1 (50k€), C2 (30k€), C3 (40k€), C4 (100k€), C5 (80k€)

**Tests Automatisés Implémentés** :
- **EcoIndex** : Scripts de test automatisés
- **Green IT** : Validation bonnes pratiques
- **RGESN Compliance** : Tests conformité
- **CI/CD** : Intégration workflows GitHub Actions

### **🔄 C3 - Référentiel Projet** EN COURS
**Statut** : 🔄 **EN COURS** - Tests automatisés implémentés

**Objectifs** :
- Adapter bonnes pratiques RGESN spécifiquement pour Zoom (basé sur disaster-web2)
- Définir conditions de réussite spécifiques pour optimisations Zoom
- Établir moyens de test pour valider optimisations sur Zoom
- Esquisser stratégie de conformité pour Zoom
- **Tests automatisés** : EcoIndex, Green IT, RGESN compliance implémentés

### **🔄 C4 - Implémentations Réalisées** EN COURS
**Statut** : 🔄 **À IMPLÉMENTER**

**Objectifs** :
- Implémenter 2-3 optimisations supplémentaires (API pagination, lazy loading avancé, service worker désactivation)
- Créer PR traçables (#005-#007) pour ces implémentations
- Conduire et documenter tests avant/après pour ces nouvelles optimisations
- Documenter blocages ou adaptations lors de l'implémentation
- **Nouveau** : Optimisations fines Three.js (frame rate 30 FPS, pixel ratio limité, 3 cubes)

### **🔄 C5 - Mesure et Analyse** EN COURS
**Statut** : 🔄 **À IMPLÉMENTER**

**Objectifs** :
- Documenter protocole de mesure détaillé (outils, environnement, UF, parcours utilisateur, déclencheurs CI)
- Quantifier gains avant/après pour disaster-web2 basé sur mesures réelles
- Fournir exports réels d'EcoIndex (via extension navigateur/site web), Lighthouse, et Green-IT
- Conduire analyse approfondie et interprétation des résultats mesurés
- **Nouveau** : Implémenter monitoring RPS (fenêtre glissante) et calcul stable cache hit

## 🚀 **Compétences C3 - Optimisation Éco-Conception Avancée** (EN COURS)

### **📊 Code Splitting et Lazy Loading**

**Objectif :** Réduire la taille du bundle principal et optimiser le chargement

**✅ Implémenté :**
- **Code Splitting Vite** : 7 chunks optimisés avec manual chunks
- **Bundle principal** : 691.68 kB → 10.88 kB (**-98.4%**)
- **Lazy Loading** : ThreeScene chargé à la demande (2s différé)
- **Chunks optimisés** : React, Three.js, Utils, Icons séparés

**🎯 Résultats :**
- **Chunk max** : 458.84 kB (Three.js)
- **Chunk principal** : 10.88 kB (code métier)
- **Performance** : Chargement différé des composants lourds

**🔧 Technologies :**
- Vite avec rollupOptions manualChunks
- React.lazy() et Suspense
- Optimisations Three.js (30 FPS, géométrie partagée)

---

## 🎯 **Prochaines Étapes C3**

1. **Service Worker** : Cache intelligent et offline support
2. **Compression avancée** : Brotli niveau 11
3. **Preload stratégique** : Ressources critiques
4. **Monitoring avancé** : Métriques en temps réel

---

## 🏗️ Architecture du Projet

```
Disasters-web2/
├── 📁 backend/                 # Serveur Express.js
│   ├── server.js              # API avec middleware RPS
│   └── static/                # Assets statiques optimisés
├── 📁 src/                    # Frontend React
│   ├── App.tsx               # Dashboard principal
│   └── components/           # Composants optimisés
├── 📁 UF-Zoom/               # Documentation UF Zoom
│   ├── docs/                 # Documentation C1-C5
│   ├── metrics/              # Résultats de mesure
│   └── Slide-Oral.md         # Présentation orale
├── 📁 .github/workflows/     # Workflows CI/CD automatisés
│   ├── eco-budget.yml        # Eco Budget & RGESN Compliance
│   ├── deploy-render.yml     # Deploy avec EPCT & Eco-Validation
│   └── feature-complete.yml  # Build automatique des features
├── 📁 .yassen/               # Ressources pédagogiques
│   └── PRD-Build-Automatique.md # PRD pour build automatique
├── 📁 .note/                 # Notes de développement (ignoré par Git)
└── 📄 README.md              # Ce fichier
```

## 🚀 Technologies Utilisées

### **Frontend**
- **React 18** avec TypeScript
- **Vite** pour le build optimisé
- **Tailwind CSS** pour le styling
- **Three.js** pour les visualisations 3D
- **Lucide React** pour les icônes
- **Recharts/Victory** pour les graphiques

### **Backend**
- **Express.js** avec middleware de monitoring
- **Compression** Brotli/Gzip
- **Helmet** pour la sécurité
- **Middleware RPS** pour calcul des requêtes par seconde

### **Outils de Mesure**
- **Lighthouse** pour audit performance
- **EcoIndex** (extension navigateur/site web)
- **Green-IT** pour métriques environnementales
- **Chrome DevTools** pour profiling

### **CI/CD & Workflows**
- **GitHub Actions** avec workflows automatisés
- **EPCT Workflow** : Explore, Plan, Code, Test
- **RGESN Compliance** : Validation automatique des bonnes pratiques
- **Build Automatique** : Déclenchement à la fin de chaque feature

## 📊 Métriques Actuelles

### **Performance (Lighthouse)**
- **Score global** : 25/100
- **First Contentful Paint** : 2.8s
- **Largest Contentful Paint** : 8.2s
- **Total Blocking Time** : 1.2s

### **Impact Environnemental**
- **Poids total de la page** : 12.7MB (-24% vs baseline)
- **Images** : 0MB (optimisées WebP)
- **JavaScript** : 3.2MB
- **CSS** : 4.3KB

### **Optimisations Appliquées**
- ✅ **Images WebP** : Conversion et lazy loading
- ✅ **Three.js optimisé** : 5 cubes avec animations conditionnelles
- ✅ **Bundle tree-shaking** : Import lodash-es spécifique
- ✅ **Cache intelligent** : Headers 24h pour assets statiques
- ✅ **Polling optimisé** : Intervalle 5s, requêtes réduites

## 🔄 Workflow Git & CI/CD

### **Branches**
- **`main`** : Code de production stable
- **`develop`** : Branche de développement principale
- **`feature/C1-ACV-simplifiee`** : Optimisations C1 (ACTUELLE)
- **`feature/C2-cadrage-budget`** : Cadrage et budget (À CRÉER)
- **`feature/C3-referentiel`** : Référentiel projet (À CRÉER)
- **`feature/C4-implementations`** : Implémentations avancées (À CRÉER)
- **`feature/C5-mesure-analyse`** : Mesure et analyse (À CRÉER)

### **Tags**
- **`v0.1-baseline`** : État initial avant optimisations
- **`v0.2-cadrage`** : Cadrage et méthodologie
- **`v1.0-impact`** : Optimisations complètes (À CRÉER)

### **Pull Requests**
- **PR C1** : ACV Simplifiée ✅ **VALIDÉE** - Mergée dans develop avec tag v0.2-cadrage
- **PR C2** : Cadrage et Budget Environnemental 🔄 **EN COURS** - Tests automatisés implémentés
- **PR C3** : Référentiel Projet 🔄 **À CRÉER**
- **PR C4** : Implémentations Réalisées 🔄 **À CRÉER**
- **PR C5** : Mesure et Analyse 🔄 **À CRÉER**

### **Workflows GitHub Actions**

#### **🔄 eco-budget.yml**
- **Déclencheurs** : Push sur `main`, `develop`, `feature/*` | PR vers `main`, `develop`
- **Fonctionnalités** :
  - EPCT Workflow complet (Explore, Plan, Code, Test)
  - Validation RGESN automatique
  - Lighthouse audit et EcoIndex simulation
  - Feature validation spécifique
  - Rapports détaillés et artifacts

#### **🚀 deploy-render.yml**
- **Déclencheurs** : Push sur `main`, `develop` | PR vers `main`
- **Fonctionnalités** :
  - EPCT Pre-deploy validation
  - Eco-validation pre/post-deploy
  - Déploiement automatique sur Render
  - Métriques comparatives pre/post-deploy
  - RGESN Compliance intégrée

#### **🎯 feature-complete.yml**
- **Déclencheurs** : Push sur `feature/*` | PR vers `develop`, `main`
- **Fonctionnalités** :
  - Build automatique à la fin de chaque feature
  - Workflow EPCT complet
  - Validation éco-conception
  - Rapports par feature
  - Résumé automatique pour merge

## 📋 Livrables

### **1. Dossier Projet (PDF)**
- **Structure** : Résumé exécutif, contexte, méthode ACV, cadrage, référentiel, optimisations, mesure & analyse
- **Statut** : 🔄 En cours de finalisation (C1-C2 complétées)
- **Fichier** : `UF-Zoom/docs/Dossier-Projet.md`

### **2. Support de Décision (Deck)**
- **Structure** : 15-30 slides max, problème → UF & impacts → objectifs → BP clés → résultats → décisions
- **Statut** : 🔄 En cours de finalisation (C1-C2 complétées)
- **Fichier** : `UF-Zoom/Slide-Oral.md`

### **3. Traçabilité Technique**
- **Repo Git** : Tags jalons, PR documentées, notes de tests
- **Backlog v2** : 5-8 user stories priorisées (À CRÉER)
- **Roadmap v2** : Jalons atteints et re-priorisation (À CRÉER)

## 🛠️ Installation et Lancement

### **Prérequis**
```bash
Node.js >= 18
npm >= 9
```

### **Installation**
```bash
git clone <repository-url>
cd Disasters-web2
npm install
```

### **Lancement**
```bash
# Développement
npm run dev

# Production
npm run build
npm start
```

### **Mesures**
```bash
# Lighthouse
npx lighthouse http://localhost:3000 --output=json --output-path=./UF-Zoom/metrics/

# EcoIndex (via extension navigateur)
# Visiter https://www.ecoindex.fr/ et analyser l'URL

# Tests automatisés
npm run test:ecoindex
npm run test:greenit
npm run test:rgesn
npm run test:eco:all
```

### **Workflows Automatisés**
```bash
# Build automatique à la fin d'une feature
npm run workflow:feature-complete

# Workflow EPCT complet
npm run epct:complete

# Validation RGESN
node scripts/rgesn-compliance.cjs
```

### **Scripts NPM**
```bash
# Tests éco-conception
npm run test:ecoindex      # Tests EcoIndex automatisés
npm run test:greenit       # Tests Green IT automatisés
npm run test:rgesn         # Tests RGESN compliance
npm run test:eco:all       # Tous les tests éco-conception
npm run test:eco:ci        # Tests CI/CD

# Lighthouse
npm run lighthouse         # Audit Lighthouse manuel
npm run lighthouse:dev     # Audit en développement
npm run lighthouse:build   # Audit en production
npm run audit:full         # Audit complet
```

## 📚 Documentation

### **UF Zoom**
- **README** : `UF-Zoom/README.md`
- **Présentation** : `UF-Zoom/Slide-Oral.md`
- **Dossier Projet** : `UF-Zoom/docs/Dossier-Projet.md`

### **Métriques**
- **README** : `UF-Zoom/metrics/README.md`
- **Baseline** : `UF-Zoom/metrics/lighthouse-before.json`
- **Après C1** : `UF-Zoom/metrics/lighthouse-after-c1-complete.json`

### **Notes de Développement**
- **Notes** : `UF-Zoom/.note/` (ignoré par Git)
- **Modifications** : Documentation des changements apportés

### **Workflows CI/CD**
- **Eco Budget** : `.github/workflows/eco-budget.yml`
- **Deploy Render** : `.github/workflows/deploy-render.yml`
- **Feature Complete** : `.github/workflows/feature-complete.yml`

## 🎯 Prochaines Étapes

### **Immédiat (C1 Finalisation)**
1. ✅ Finaliser documentation C1
2. 🔄 Créer PR pour C1
3. 🔄 Merger dans develop
4. 🔄 Créer tag v0.2-cadrage

### **Suivant (C2-C5)**
1. 🔄 Créer branche C2
2. 🔄 Implémenter cadrage et budget
3. 🔄 Répéter pour C3, C4, C5
4. 🔄 Finaliser livrables

### **CI/CD & Build Automatique**
1. ✅ Workflows GitHub Actions améliorés
2. ✅ Build automatique à la fin de chaque feature
3. ✅ Validation EPCT et RGESN intégrée
4. ✅ Métriques et rapports automatisés

## 📞 Contact

**Auteur** : Yassen ABARJI  
**Email** : Yabarji1@gmail.com  
**Projet** : Individuel  
**Formation** : Certification Éco-conception  
**Date de soumission** : 04/09/2025

---

*Dernière mise à jour : $(date)*