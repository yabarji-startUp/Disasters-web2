# 🌱 Disaster-web2 - Plateforme d'Éco-conception

> **🎯 Mission: Du diagnostic à l'impact - Optimiser, Mesurer, Décider**  
> Projet de formation à l'éco-conception web avec implémentation pratique sur disaster-web2 et cadrage théorique pour Zoom.

## 📋 Contexte du Projet

### **Unité Fonctionnelle (UF)**
**"Participer à une visioconférence avec Zoom"**

### **Approche Dual**
- **Zoom** : Cadrage théorique et préconisations (code source non accessible)
- **Disaster-web2** : Implémentation pratique et mesures concrètes

### **Objectifs**
- Conduire une ACV simplifiée d'un service numérique
- Cadrer un projet d'éco-conception avec budget environnemental
- Appliquer le référentiel RGESN
- Implémenter des optimisations concrètes
- Mesurer et analyser les gains obtenus

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js ≥ 18
- npm ≥ 9
- Git (pour le workflow GitFlow)

### Installation & Lancement

```bash
# Installation des dépendances
npm install

# Démarrage de l'application complète
npm run dev
```

L'application sera disponible sur :
- Frontend: http://localhost:3000 (ou 3001 si port occupé)
- Backend: http://localhost:5001

### Scripts Disponibles

- `npm run dev` - Lance frontend et backend simultanément
- `npm run frontend` - Lance uniquement le frontend (Vite)
- `npm run backend` - Lance uniquement le backend (Express)
- `npm run build` - Build de production
- `npm run lint` - Analyse du code

---

## 📊 Métriques en Temps Réel

La plateforme affiche en continu :

### **Performance Frontend**
- **Taille du bundle** : Poids total des ressources chargées
- **Poids page** : Poids total de la page (toutes ressources confondues)
- **Objets DOM** : Complexité de la page (nombre de nœuds)
- **Ressources** : Nombre de ressources chargées
- **JS** : Poids total des fichiers JavaScript
- **CSS** : Poids total des fichiers CSS
- **Images** : Poids total des images chargées
- **Cache hit** : Taux d'utilisation du cache navigateur

### **Performance Backend**
- **Utilisation mémoire** : Consommation RAM côté serveur
- **CPU** : Charge processeur du serveur
- **Requêtes/seconde** : Fréquence des appels API (RPS)
- **Temps de rendu** : Performance d'affichage (temps de chargement)

---

## 🎓 Compétences Évaluées (C1-C5)

### **C1 - ACV Simplifiée** ✅ COMPLÉTÉE
- **Méthodologie** : UF définie, phases analysées, hotspots identifiés
- **Mesures** : Lighthouse Performance 25/100 (baseline)
- **Impact** : 0.44 gCO2e par session estimé
- **Objectifs** : Performance 25→85, CO2 -75%, bande passante -75%
- **Documents** : `UF-Zoom/docs/C1-ACV-methodologie.md`, `UF-Zoom/docs/C1-ACV-analyse.md`
- **Présentation** : `UF-Zoom/Slide-Oral.md` (Section 2)

### **C2 - Cadrage et Budget Environnemental** 🔄 EN COURS
- **Budget CO2** : Objectifs chiffrés par phase
- **Arbitrages** : Gains vs efforts vs contraintes
- **Accompagnement** : Plan de mise en œuvre
- **Documents** : À créer dans `UF-Zoom/docs/`
- **Présentation** : `UF-Zoom/Slide-Oral.md` (Section 3)

### **C3 - Référentiel RGESN** 📋 PLANIFIÉ
- **Bonnes pratiques** : Adaptation au contexte disaster-web2
- **Conditions de succès** : Critères de validation
- **Moyens de test** : Protocoles de vérification
- **Documents** : À créer dans `UF-Zoom/docs/`
- **Présentation** : `UF-Zoom/Slide-Oral.md` (Section 4)

### **C4 - Implémentations Réalisées** 🛠️ PLANIFIÉ
- **Optimisations** : 2-3 nouvelles implémentations
- **Pull Requests** : Traçabilité technique
- **Tests** : Avant/après validation
- **Documents** : À créer dans `UF-Zoom/docs/`
- **Présentation** : `UF-Zoom/Slide-Oral.md` (Section 4)

### **C5 - Mesure et Analyse** 📈 PLANIFIÉ
- **Protocole** : Outils, environnement, UF, parcours utilisateur
- **Gains quantifiés** : Mesures réelles avant/après
- **Analyse** : Interprétation approfondie des résultats
- **Documents** : À créer dans `UF-Zoom/docs/`
- **Présentation** : `UF-Zoom/Slide-Oral.md` (Section 5)
- **Mesures** : `UF-Zoom/metrics/` (baseline et après optimisations)

---

## 📁 Structure du Projet

```
├── src/                    # Application React + TypeScript
├── backend/               # Serveur Express.js
├── data/                  # Fichiers de données volumineux
├── UF-Zoom/              # Documentation Zoom UF (approche dual)
│   ├── README.md         # Architecture et documentation du dossier
│   ├── slide.md          # Présentation originale
│   ├── Slide-Oral.md     # Présentation finale C1-C5
│   ├── note-Modif-Slide-Oral.md # Notes des modifications
│   ├── generate-slide.sh # Script de génération des présentations
│   ├── docs/             # Documentation des compétences C1-C5
│   │   ├── C1-ACV-methodologie.md
│   │   ├── C1-ACV-analyse.md
│   │   └── template-dossier-projet.md
│   ├── metrics/          # Résultats de mesure et analyse
│   │   ├── README.md     # Protocole et structure des métriques
│   │   ├── lighthouse-before.json
│   │   └── lighthouse-after.json
│   └── output/           # Présentations générées (HTML/PDF/PPTX)
├── .yassen/              # Documents de cadrage
└── README.md             # Ce fichier
```

---

## 🛠️ Outils et Technologies

### **Frontend**
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Three.js** (animations 3D)
- **Lucide React** (icônes)
- **Recharts/Victory** (graphiques)

### **Backend**
- **Express.js** (serveur)
- **Compression** (gzip)
- **Helmet** (sécurité)
- **RPS middleware** (monitoring)

### **Mesure et Analyse**
- **Lighthouse** (audit performance)
- **Chrome DevTools** (développement)
- **EcoIndex** (impact environnemental)
- **GreenIT Analysis** (bonnes pratiques)

---

## 📈 Métriques Actuelles (Baseline)

### **Lighthouse Scores**
- **Performance** : 25/100 ❌ (Critique)
- **Accessibility** : 79/100 ✅ (Bon)
- **Best Practices** : 100/100 ✅ (Excellent)
- **SEO** : 75/100 ✅ (Bon)

### **Hotspots Identifiés**
- **Images non optimisées** : 6,830 KiB d'économies possibles
- **Bundle JavaScript** : Volumineux, nécessite optimisation
- **DOM complexe** : 174 éléments, TBT 950ms
- **Cache non optimisé** : Rechargement systématique

### **Impact Environnemental**
- **CO2 par session** : 0.44 gCO2e (estimé)
- **Bande passante** : 8,830 KiB par session
- **EcoIndex** : Estimé C/D (à améliorer)

---

## 🎯 Objectifs d'Optimisation

### **Objectifs Chiffrés**
- **Performance Lighthouse** : 25 → 85 (+240%)
- **Taille images** : 6,830 → 1,366 KiB (-80%)
- **Bundle JavaScript** : ~2MB → 800KB (-60%)
- **Impact CO2** : 0.44 → 0.11 gCO2e (-75%)

### **Indicateurs de Succès**
- **EcoIndex** : C/D → A/B (+2 grades)
- **Temps de chargement** : Réduction significative
- **Bande passante** : -75% de consommation
- **Expérience utilisateur** : Amélioration perçue

---

## 🔄 Workflow Git

### **Branches**
- `main` : Code de production
- `develop` : Branche de développement principale
- `feature/C1-ACV-simplifiee` : Compétence C1 ✅
- `feature/C2-cadrage-budget` : Compétence C2 🔄
- `feature/C3-referentiel-rgesn` : Compétence C3 📋
- `feature/C4-implementations` : Compétence C4 🛠️
- `feature/C5-mesure-analyse` : Compétence C5 📈

### **Pull Requests**
- Une PR par compétence après validation
- Tests et build obligatoires
- Documentation complète

---

## 📚 Livrables Attendus

### **Dossier Projet (PDF)**
- Résumé exécutif
- Contexte et ACV
- Cadrage et budget
- Référentiel et optimisations
- Mesures et analyse
- Annexes techniques

### **Support de Décision (15-30 slides)**
- Problématique et UF
- Impacts identifiés
- Objectifs et budget
- 3 bonnes pratiques clés
- Résultats avant/après
- Décisions et prochaines étapes
- **Fichier source** : `UF-Zoom/Slide-Oral.md`
- **Génération** : `UF-Zoom/generate-slide.sh`

### **Traçabilité Technique**
- Repository Git avec tags
- Backlog v2 (5-8 user stories)
- Roadmap v2 spécifique disaster-web2
- **Documentation** : `UF-Zoom/README.md` (architecture complète)
- **Notes de modifications** : `UF-Zoom/note-Modif-Slide-Oral.md`

---

## 🌱 Impact Environnemental

Cette plateforme permet d'apprendre :
- **Éco-conception web** : Principes et bonnes pratiques
- **ACV simplifiée** : Méthodologie d'analyse
- **Mesure d'impact** : Outils et métriques
- **Optimisation** : Techniques concrètes
- **RGESN** : Référentiel français

---

## 📚 Documentation Complète

### **UF-Zoom** : Documentation Zoom UF
- **README** : `UF-Zoom/README.md` - Architecture et contenu du dossier
- **Présentation** : `UF-Zoom/Slide-Oral.md` - Version finale C1-C5
- **Notes** : `UF-Zoom/note-Modif-Slide-Oral.md` - Modifications apportées
- **Génération** : `UF-Zoom/generate-slide.sh` - Script automatique

### **Approche Dual Documentée**
- **Zoom UF** : Cadrage théorique et préconisations
- **Disaster-web2** : Implémentation pratique et mesures
- **Méthodologie** : Applicable et reproductible

---

**Bonne formation ! 🚀**

*L'objectif est d'apprendre à identifier, mesurer et corriger les problèmes de performance et d'impact environnemental.*