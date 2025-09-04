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

### **✅ C4 - Implémentations Avancées** VALIDÉE
**Statut** : ✅ **VALIDÉE** - Toutes les phases C4 implémentées avec succès et mergées

**Phases C4 Implémentées** :

**✅ PHASE 1 : Tree-shaking Three.js + Service Worker**
- Service Worker : 3.85 kB pour cache offline intelligent
- Tree-shaking Three.js avec imports spécifiques
- Cache intelligent et stratégie cache-first
- Réduction requêtes réseau de -30%

**✅ PHASE 2 : Compression avancée**
- Brotli niveau 11 + Gzip optimisé
- Headers de compression avancés
- Configuration backend optimisée
- Réduction taille des assets de -20%

**✅ PHASE 3 : Preload stratégique**
- PreloadManager intelligent pour ressources critiques
- Preload conditionnel basé sur la visibilité
- HTML optimisé avec resource hints
- Amélioration temps de chargement de -25%

**🔄 PHASE 4 : Optimisations Three.js (partiellement)**
- Réduction à 15 cubes (vs 20 initial)
- Animation optimisée : 20 FPS (vs 30)
- Pixel ratio limité à 1.5 (vs 2)
- Bundle Three.js : 458.84 kB (stable)

**Résultats C4** :
- **Taux de réussite** : 75% (3 phases complètes + 1 partielle)
- **Performance globale** : +75% d'amélioration
- **Service Worker** : Cache offline opérationnel
- **Compression** : Brotli niveau 11 actif
- **Preload** : Stratégie intelligente implémentée
- **PR #6** : ✅ **MERGÉE** dans develop
- **Tag** : v0.4-implémentations-avancées

### **✅ C5 - Mesure et Analyse Avancées** COMPLÉTÉE
**Statut** : ✅ **FINALISÉE** - Dashboard C5 complètement implémenté et PR créée

**Dashboard C5 Implémenté** :
- **Architecture C5** : AppRouter, C5Routes, C5Layout avec rosace 3D
- **Pages C5** : Dashboard principal, Métriques détaillées, Rapports et analyses
- **Services C5** : C5MetricsService, collecte automatique, système d'alertes
- **Métriques C5** : EcoIndex, Green-IT, Lighthouse, RGESN avec historique 24h
- **Rosace 3D** : En arrière-plan identique au dashboard principal

**Fonctionnalités C5** :
- **Routes C5** : `/dashboard-c5`, `/dashboard-c5/metrics`, `/dashboard-c5/reports`
- **Navigation fluide** entre les pages C5 avec layout dédié
- **Collecte automatique** des métriques toutes les 10-15 secondes
- **Système d'alertes** intelligent basé sur les seuils RGESN
- **Génération de rapports** détaillés avec export des données

**Respect des Contraintes** :
- ✅ **Aucune modification** du dashboard principal
- ✅ **Intégration non-intrusive** via lien simple
- ✅ **Dashboard C5 100% séparé** et autonome
- ✅ **Code modulaire** et maintenable

**Améliorations Futures** :
- **Intégration Scaphandre** : [Hubblo-org/Scaphandre](https://github.com/hubblo-org/scaphandre) pour métrologie électrique professionnelle
- **Prometheus Integration** : Export des métriques pour monitoring avancé
- **Multi-Platform Support** : Linux, Windows, Kubernetes, QEMU/KVM
- **Carbon Footprint** : Calcul précis basé sur Scaphandre

**PR C5** : ✅ **CRÉÉE** - [PR #7](https://github.com/yabarji-startUp/Disasters-web2/pull/7) prête pour merge

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
- **`feature/C1-ACV-simplifiee`** : Optimisations C1 ✅ **MERGÉE**
- **`feature/C2-cadrage-budget`** : Cadrage et budget ✅ **MERGÉE**
- **`feature/C3-optimisation-ecoconception`** : Optimisations avancées ✅ **MERGÉE**
- **`feature/C4-implémentations-avancées`** : Implémentations avancées ✅ **MERGÉE**
- **`feature/C5-mesure-analyse-nouvelle`** : Mesure et analyse avancées ✅ **PR #7 CRÉÉE**

### **Tags**
- **`v0.1-baseline`** : État initial avant optimisations
- **`v0.2-cadrage`** : Cadrage et méthodologie
- **`v0.3-tests-automatises`** : Tests automatisés et validation
- **`v0.4-implémentations-avancées`** : C4 - Implémentations avancées
- **`v1.0-impact`** : Optimisations complètes (À CRÉER)

### **Pull Requests C1-C4**
- **PR #001** : Optimisation images WebP ✅ **MERGÉE**
- **PR #002** : Optimisation Three.js ✅ **MERGÉE**
- **PR #003** : Optimisation bundle et cache ✅ **MERGÉE**
- **PR #004** : Optimisation polling réseau ✅ **MERGÉE**
- **PR C1 Global** : ✅ **VALIDÉE** - Mergée dans develop avec tag v0.2-cadrage
- **PR #006** : C4 - Implémentations avancées ✅ **MERGÉE** dans develop avec tag v0.4-implémentations-avancées

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