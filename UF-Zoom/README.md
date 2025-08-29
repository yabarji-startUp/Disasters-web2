# 📋 UF Zoom - Documentation Éco-conception

## 🎯 Présentation

Ce dossier contient toute la documentation relative à l'**Unité Fonctionnelle Zoom** : "Participer à une visioconférence avec Zoom". Cette UF sert de cadre théorique pour l'analyse éco-conception, tandis que le projet `disaster-web2` fournit le support pratique pour l'implémentation et la mesure des optimisations.

## 🏗️ Architecture du Dossier

```
UF-Zoom/
├── 📁 docs/                    # Documentation C1-C5
│   ├── C1-ACV-methodologie.md  # Méthodologie ACV simplifiée
│   ├── C1-ACV-analyse.md       # Analyse baseline et hotspots
│   ├── Dossier-Projet.md       # Dossier projet final (PDF)
│   └── template-dossier-projet.md # Template officiel
├── 📁 metrics/                 # Résultats de mesure
│   ├── README.md               # Documentation métriques
│   ├── lighthouse-before.json  # Mesures baseline
│   ├── lighthouse-after-images.json # Après optimisation images
│   └── lighthouse-after-c1-complete.json # Après C1 complet
├── 📁 .note/                   # Notes de développement (ignoré par Git)
│   └── note-Modif-Slide-Oral.md # Notes modifications slides
├── 📄 README.md                # Ce fichier
├── 📄 Slide-Oral.md            # Présentation orale (Marp)
├── 📄 slide.md                 # Présentation initiale
└── 📄 generate-slide.sh        # Script génération slides
```

## 🎓 Compétences et Statuts

### **✅ C1 - ACV Simplifiée** COMPLÉTÉE
**Statut** : ✅ **FINALISÉE** - Hotspots identifiés et optimisations prioritaires implémentées
**PR** : ✅ **VALIDÉE** - Mergée dans develop avec tag v0.2-cadrage

**Méthodologie ACV** :
- **Approche** : Screening (simplifiée) pour disaster-web2
- **UF** : "Participer à une visioconférence avec Zoom"
- **Périmètre** : Frontend React + Backend Express
- **Phases** : Développement, Utilisation, Fin de vie

**Hotspots identifiés** :
1. **Three.js lourd** : 20 cubes animés (RGESN 2.2)
2. **Images massives** : 7.2MB large.jpg (RGESN 2.1)
3. **Bundle non optimisé** : Pas de tree-shaking (RGESN 1.2)
4. **Polling excessif** : Requêtes 1s + simultanées (RGESN 4.1)

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
**Statut** : ✅ **FINALISÉE** - Cadrage validé et budget environnemental quantifié

**Cadrage du Projet** :
- **Contraintes techniques** : WebRTC, vidéo streaming, compression, latence < 150ms, 100+ participants
- **Contraintes environnementales** : RGESN, Green Software Foundation, EcoIndex > 85/100, -30% CO2 vs Zoom
- **Contraintes budgétaires** : 300k€ sur 6 mois, 12 personnes, infrastructure cloud green
- **Contraintes temporelles** : 6 mois (septembre 2024 - février 2025), jalons critiques mensuels

**Budget Environnemental Quantifié** :
- **Métriques baseline** : 16.7MB poids total, 7.2MB images (43%), 3.2MB JS (19%), Performance 25/100
- **Objectifs Zoom** : -30% CO2, -40% bande passante, < 2.5 kWh/heure, EcoIndex > 85/100
- **Budget par compétence** : C1 (50k€), C2 (30k€), C3 (40k€), C4 (100k€), C5 (80k€)

**Planification et Roadmap** :
- **Mois 1** : Cadrage et méthodologie (C1-C2)
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

## 📊 Métriques et Mesures

### **Structure des Métriques**
- **`metrics/README.md`** : Documentation complète des métriques
- **`metrics/lighthouse-before.json`** : Mesures baseline
- **`metrics/lighthouse-after-images.json`** : Après optimisation images
- **`metrics/lighthouse-after-c1-complete.json`** : Après C1 complet

### **Métriques Clés C1**
- **Poids total** : 16.7MB → 12.7MB (-24%)
- **Images** : 7.2MB → 0MB (-100%)
- **JavaScript** : Optimisé avec tree-shaking
- **Cache** : Headers 24h pour assets statiques
- **Polling** : Réduit de 1s à 5s, requêtes simultanées réduites

## 📄 Documents Principaux

### **Dossier Projet**
- **Fichier** : `docs/Dossier-Projet.md`
- **Statut** : 🔄 En cours de finalisation
- **Objectif** : Support pour certification éco-conception
- **Structure** : Suit template officiel HTML

### **Présentation Orale**
- **Fichier** : `Slide-Oral.md`
- **Statut** : 🔄 En cours de finalisation
- **Format** : Marp avec thème yas-eco
- **Objectif** : Support de décision (15-30 slides)

### **Méthodologie C1**
- **Fichier** : `docs/C1-ACV-methodologie.md`
- **Statut** : ✅ Complété
- **Contenu** : Méthodologie ACV simplifiée, UF, périmètre, phases

### **Analyse C1**
- **Fichier** : `docs/C1-ACV-analyse.md`
- **Statut** : ✅ Complété
- **Contenu** : Mesures baseline, hotspots identifiés, priorisation

### **Notes de Développement**
- **Dossier** : `.note/` (ignoré par Git)
- **Fichier** : `note-Modif-Slide-Oral.md`
- **Contenu** : Documentation des modifications apportées aux slides

## 🔄 Workflow et Versioning

### **Branches Git**
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

### **Pull Requests C1**
- **PR #001** : Optimisation images WebP ✅ **MERGÉE**
- **PR #002** : Optimisation Three.js ✅ **MERGÉE**
- **PR #003** : Optimisation bundle et cache ✅ **MERGÉE**
- **PR #004** : Optimisation polling réseau ✅ **MERGÉE**
- **PR C1 Global** : ✅ **VALIDÉE** - Mergée dans develop avec tag v0.2-cadrage

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

## 🛠️ Outils et Technologies

### **Outils de Mesure**
- **Lighthouse** : Audit performance complet
- **EcoIndex** : Extension navigateur/site web
- **Green-IT** : Métriques environnementales
- **Chrome DevTools** : Profiling détaillé

### **Technologies**
- **Marp** : Génération de présentations
- **Git** : Versioning et collaboration
- **Node.js** : Environnement de développement

### **CI/CD & Workflows**
- **GitHub Actions** : Workflows automatisés
- **EPCT Workflow** : Explore, Plan, Code, Test
- **RGESN Compliance** : Validation automatique des bonnes pratiques
- **Build Automatique** : Déclenchement à la fin de chaque feature

## 📋 Livrables

### **1. Dossier Projet (PDF)**
- **Structure** : Résumé exécutif, contexte, méthode ACV, cadrage, référentiel, optimisations, mesure & analyse
- **Statut** : 🔄 En cours de finalisation (C1-C2 complétées)
- **Fichier** : `docs/Dossier-Projet.md`

### **2. Support de Décision (Deck)**
- **Structure** : 15-30 slides max, problème → UF & impacts → objectifs → BP clés → résultats → décisions
- **Statut** : 🔄 En cours de finalisation (C1-C2 complétées)
- **Fichier** : `Slide-Oral.md`

### **3. Traçabilité Technique**
- **Repo Git** : Tags jalons, PR documentées, notes de tests
- **Backlog v2** : 5-8 user stories priorisées (À CRÉER)
- **Roadmap v2** : Jalons atteints et re-priorisation (À CRÉER)

## 🎯 Prochaines Étapes

### **Immédiat (C2 Finalisation)**
1. ✅ Finaliser documentation C2
2. 🔄 Créer PR pour C2
3. 🔄 Merger dans develop
4. 🔄 Créer tag v0.3-cadrage-budget

### **Suivant (C3-C5)**
1. 🔄 Créer branche C3
2. 🔄 Implémenter référentiel projet
3. 🔄 Répéter pour C4, C5
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