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
**Statut** : ✅ **FINALISÉE** - Hotspots identifiés et optimisations prioritaires implémentées
**PR** : ✅ **VALIDÉE** - Mergée dans develop avec tag v0.2-cadrage

**Optimisations C1 implémentées** :
- **PR #001 - Images** : WebP conversion (7.2MB → 3.0MB, -59%), OptimizedImage component avec lazy loading
- **PR #002 - Three.js** : 20 → 5 cubes, animations conditionnelles, optimisations GPU (antialias: false, pixel ratio limité)
- **PR #003 - Bundle** : Tree-shaking lodash (import spécifique), compression Brotli niveau 6, cache 24h
- **PR #004 - Polling** : intervalle 1s → 5s, réduction requêtes simultanées (2 → 1)

**Résultats mesurés** :
- **Poids total** : 16.7MB → 12.7MB (-24%)
- **Bytes gaspillés formats modernes** : 0MB (élimination complète)
- **Performance Lighthouse** : 25/100 (baseline maintenue pour C2-C5)

**RGESN BP implémentées** : Images responsives & WebP/AVIF, Nettoyage scripts tiers, Cache intelligent
**GreenScore intégré** : DE02/DE03 (Cache intelligent), AR01 (Event Driven Architecture)

**Note** : Les optimisations fines Three.js (frame rate 30 FPS, pixel ratio limité, réduction 5→3 cubes) seront implémentées dans **C4 - Optimisation Service Numérique**.

### **✅ C2 - Cadrage et Budget Environnemental** COMPLÉTÉE
**Statut** : ✅ **FINALISÉE** - Optimisations implémentées et mesurées

**Cadrage du Projet** :
- **Contraintes techniques** : WebRTC, vidéo streaming, compression, latence < 150ms, 100+ participants
- **Contraintes environnementales** : RGESN, Green Software Foundation, EcoIndex > 85/100, -30% CO2 vs Zoom
- **Contraintes budgétaires** : 300k€ sur 6 mois, 12 personnes, infrastructure cloud green
- **Contraintes temporelles** : 6 mois (septembre 2024 - février 2025), jalons critiques mensuels

**Budget Environnemental Quantifié** :
- **Métriques baseline** : 16.7MB → 12.7MB (-24%), 7.2MB → 5.1MB images, 3.2MB → 2.8MB JS, Performance 25/100
- **Objectifs Zoom** : -30% CO2, -40% bande passante, < 2.5 kWh/heure, EcoIndex > 85/100
- **Budget par compétence** : C1 (50k€), C2 (30k€), C3 (40k€), C4 (100k€), C5 (80k€)

**Optimisations C2 Implémentées** :
- **PR #005** : Cache intelligent avec hit rate tracking et TTL 24h
- **PR #006** : Service Worker avec stratégies cache-first/network-first
- **PR #007** : Headers cache optimisés par type de fichier
- **PR #008** : Lighthouse automatisé avec EcoIndex calculation et CI/CD

**Métriques C2 Mesurées** :
- **Performance** : 25/100 (baseline)
- **EcoIndex** : 0/100 (Grade G) - optimisations en cours
- **Poids total** : 12.7MB (-24% vs baseline)
- **Requêtes** : 1471 (réduction cible -50%)

**Planification et Roadmap** :
- **Mois 1** : Cadrage et méthodologie (C1-C2) ✅
- **Mois 2** : Référentiel et tests (C3)
- **Mois 3-4** : Implémentations (C4)
- **Mois 5** : Mesures et analyse (C5)
- **Mois 6** : Finalisation et déploiement

**Arbitrages Gains/Efforts/Contraintes** :
- **Priorité 1** : Images WebP (-59% poids), cache intelligent (-40% requêtes), compression vidéo (-30% bande passante)
- **Priorité 2** : Tree-shaking (-20% bundle), lazy loading (-30% chargement), service worker (-50% requêtes)
- **Priorité 3** : Minification (-10% taille), Gzip/Brotli (-15% transfert), headers cache (-20% requêtes)

**Plan d'Accompagnement** :
- **Formation équipe** : RGESN, Green Software, outils (Lighthouse, EcoIndex, Green-IT)
- **Processus** : EPCT, code review éco-conception, CI/CD, monitoring
- **Recommandations Zoom** : Architecture microservices, WebRTC optimisé, cloud green, métriques environnementales

### **🔄 C3 - Référentiel Projet** EN COURS
**Statut** : 🔄 **À IMPLÉMENTER**

**Objectifs** :
- Adapter bonnes pratiques RGESN spécifiquement pour Zoom (basé sur disaster-web2)
- Définir conditions de réussite spécifiques pour optimisations Zoom
- Établir moyens de test pour valider optimisations sur Zoom
- Esquisser stratégie de conformité pour Zoom
- **Nouveau** : Implémenter cache headers intelligents et monitoring (RGESN 3.1, 4.1)

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
- **PR #001** : Optimisation images WebP ✅ **MERGÉE**
- **PR #002** : Optimisation Three.js ✅ **MERGÉE**
- **PR #003** : Optimisation bundle et cache ✅ **MERGÉE**
- **PR #004** : Optimisation polling réseau ✅ **MERGÉE**
- **PR C1 Global** : ✅ **VALIDÉE** - Mergée dans develop avec tag v0.2-cadrage
- **PR #005-#007** : Optimisations C4 (À CRÉER)

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
```

### **Workflows Automatisés**
```bash
# Build automatique à la fin d'une feature
npm run workflow:feature-complete

# Workflow EPCT complet
npm run epct:complete

# Validation RGESN
node scripts/rgesn-compliance.js
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