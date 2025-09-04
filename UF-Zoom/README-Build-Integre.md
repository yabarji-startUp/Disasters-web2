# 🚀 Système de Build Intégré - Génération Automatique des Documents

## 🎯 Objectif

Ce système permet la génération automatique des documents (PDF et slides) lors des builds du projet, que ce soit en local ou via GitHub Actions CI/CD.

## 📁 Structure des Scripts

```
UF-Zoom/
├── build-docs.sh              # Script de build intégré (GitHub Actions)
├── build-local.sh             # Script de build local (développement)
├── generate-dossier-pdf.sh    # Script de génération PDF
├── generate-slide.sh          # Script de génération slides
├── docs/
│   ├── Dossier-Projet2.md     # Document source
│   └── output/                # PDF généré
└── output/                    # Slides générés
```

## 🔄 Intégration dans le Build

### Package.json

Les scripts npm ont été modifiés pour inclure la génération des documents :

```json
{
  "scripts": {
    "build": "npm run build:frontend && npm run build:backend && npm run build:docs",
    "build:docs": "npm run generate:pdf && npm run generate:slides",
    "generate:pdf": "bash UF-Zoom/generate-dossier-pdf.sh",
    "generate:slides": "bash UF-Zoom/generate-slide.sh"
  }
}
```

### Déclenchement Automatique

La génération des documents se déclenche automatiquement lors de :
- `npm run build` (build complet)
- `npm run build:docs` (documents uniquement)
- Push/Pull Request sur GitHub (workflow CI/CD)

## 🚀 Utilisation

### 1. Build Complet (Recommandé)

```bash
# Depuis le répertoire racine du projet
npm run build
```

**Ce qui se passe :**
1. ✅ Build frontend (Vite)
2. ✅ Build backend (Node.js)
3. ✅ Génération PDF Dossier-Projet2.md
4. ✅ Génération slides Slide-Oral.md

### 2. Génération des Documents Seulement

```bash
# Depuis le répertoire racine du projet
npm run build:docs
```

### 3. Scripts Individuels

```bash
# Générer uniquement le PDF
npm run generate:pdf

# Générer uniquement les slides
npm run generate:slides
```

### 4. Scripts Directs

```bash
# Depuis UF-Zoom/
./build-local.sh          # Build local complet
./build-docs.sh           # Build intégré (CI/CD)
./generate-dossier-pdf.sh # PDF uniquement
./generate-slide.sh       # Slides uniquement
```

## 🌐 GitHub Actions CI/CD

### Workflow Automatique

Le fichier `.github/workflows/build-docs.yml` déclenche automatiquement :

**Déclencheurs :**
- Push sur `main`, `develop`, `feature/*`
- Pull Request sur `main`, `develop`
- Modification des fichiers :
  - `UF-Zoom/docs/**`
  - `UF-Zoom/Slide-Oral.md`
  - `Themes/**`
  - `package.json`

**Actions :**
1. 🏗️ Build du projet
2. 📄 Génération des documents
3. 📤 Upload des artifacts
4. 💬 Commentaire automatique sur les PR
5. 📊 Rapport de build

### Artifacts Générés

Chaque build génère un artifact `documents-generes` contenant :
- `UF-Zoom/docs/output/Dossier-Projet2.pdf`
- `UF-Zoom/output/Slide-Oral.pdf`
- `UF-Zoom/output/Slide-Oral.html`
- `UF-Zoom/output/Slide-Oral.pptx`
- `build-docs-report.txt`

## 🛠️ Développement Local

### Script de Build Local

```bash
cd UF-Zoom/
./build-local.sh
```

**Fonctionnalités :**
- ✅ Vérification des prérequis
- 📦 Installation automatique des dépendances
- 🔨 Build du projet
- 📄 Génération des documents
- 🔍 Vérification des résultats
- 📋 Résumé détaillé

### Prérequis Locaux

- **Node.js** (18.x ou 20.x)
- **npm** ou **yarn**
- **Marp CLI** (installé automatiquement si manquant)

## 📊 Monitoring et Rapports

### Logs de Build

- **Local** : Affichage en temps réel avec couleurs
- **CI/CD** : Logs GitHub Actions + rapport détaillé

### Rapport de Build

Le fichier `build-docs-report.txt` contient :
- Date et heure du build
- Liste des documents générés
- Tailles des fichiers
- Logs détaillés
- Statut du build

## 🔧 Configuration

### Personnalisation des Chemins

Modifiez les variables dans les scripts :

```bash
# Dans generate-dossier-pdf.sh
INPUT_FILE="UF-Zoom/docs/Dossier-Projet2.md"
OUTPUT_FILE="UF-Zoom/docs/output/Dossier-Projet2.pdf"
THEME_FILE="Themes/resume2-A4.css"

# Dans generate-slide.sh
THEME_FILE="../Themes/yas-eco.css"
OUTPUT_DIR="output"
```

### Ajout de Nouveaux Documents

1. Créez le script de génération
2. Ajoutez-le dans `package.json`
3. Intégrez-le dans `build-docs.sh`
4. Mettez à jour le workflow GitHub Actions

## 🐛 Résolution des Problèmes

### Erreur "Marp non installé"

```bash
npm install -g @marp-team/marp-cli
```

### Erreur "Thème non trouvé"

Vérifiez que les thèmes existent dans `Themes/` :
- `resume2-A4.css`
- `yas-eco.css`

### Erreur "Fichier source non trouvé"

Vérifiez que les fichiers sources existent :
- `UF-Zoom/docs/Dossier-Projet2.md`
- `UF-Zoom/Slide-Oral.md`

### Erreur de permissions

```bash
chmod +x UF-Zoom/*.sh
```

## 📈 Avantages

### ✅ Automatisation
- Génération automatique lors des builds
- Pas de risque d'oublier de générer les documents
- Documents toujours à jour

### ✅ CI/CD
- Intégration GitHub Actions
- Artifacts disponibles pour chaque build
- Commentaires automatiques sur les PR

### ✅ Qualité
- Vérifications automatiques
- Rapports détaillés
- Gestion des erreurs

### ✅ Flexibilité
- Build local pour le développement
- Build CI/CD pour la production
- Scripts individuels si nécessaire

## 🔄 Workflow Recommandé

### Développement
1. Modifiez les documents Markdown
2. Testez localement : `./build-local.sh`
3. Committez les changements
4. Poussez vers GitHub

### Production
1. GitHub Actions se déclenche automatiquement
2. Build et génération des documents
3. Artifacts disponibles
4. Commentaire automatique sur les PR

## 📞 Support

En cas de problème :
1. Vérifiez les logs de build
2. Consultez le rapport `build-docs-report.txt`
3. Vérifiez les prérequis
4. Testez les scripts individuellement

---

**💡 Conseil :** Utilisez `npm run build` pour un build complet incluant la génération des documents ! 