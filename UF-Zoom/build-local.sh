#!/bin/bash

# Script de build local pour le développement
# Génère les documents sans passer par GitHub Actions
# Auteur : Yassen ABARJI
# Date : 04/09/2025

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Build Local - Génération des Documents${NC}"
echo "=========================================="
echo ""

# Vérifier que nous sommes dans le bon répertoire
if [[ ! -f "$PROJECT_ROOT/package.json" ]]; then
    echo -e "${YELLOW}⚠️  Ce script doit être exécuté depuis le répertoire UF-Zoom${NC}"
    exit 1
fi

echo -e "${BLUE}📁 Répertoire de travail :${NC} $PROJECT_ROOT"
echo -e "${BLUE}📁 Scripts :${NC} $SCRIPT_DIR"
echo ""

# Vérifier les prérequis
echo -e "${BLUE}🔍 Vérification des prérequis...${NC}"

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}❌ Node.js n'est pas installé${NC}"
    exit 1
fi

# Vérifier npm
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}❌ npm n'est pas installé${NC}"
    exit 1
fi

# Vérifier Marp
if ! command -v marp &> /dev/null; then
    echo -e "${YELLOW}⚠️  Marp n'est pas installé. Installation...${NC}"
    npm install -g @marp-team/marp-cli
fi

echo -e "${GREEN}✅ Tous les prérequis sont satisfaits${NC}"
echo ""

# Installation des dépendances si nécessaire
if [[ ! -d "$PROJECT_ROOT/node_modules" ]]; then
    echo -e "${BLUE}📦 Installation des dépendances...${NC}"
    cd "$PROJECT_ROOT"
    npm install
    echo -e "${GREEN}✅ Dépendances installées${NC}"
    echo ""
fi

# Build du projet
echo -e "${BLUE}🔨 Build du projet...${NC}"
cd "$PROJECT_ROOT"
npm run build
echo -e "${GREEN}✅ Build du projet terminé${NC}"
echo ""

# Génération des documents
echo -e "${BLUE}📄 Génération des documents...${NC}"

# Générer le PDF
echo -e "${BLUE}  📄 Génération du PDF Dossier-Projet2.md...${NC}"
if bash "$SCRIPT_DIR/generate-dossier-pdf.sh"; then
    echo -e "${GREEN}  ✅ PDF généré avec succès${NC}"
else
    echo -e "${YELLOW}  ⚠️  Échec de la génération du PDF${NC}"
fi

# Générer les slides
echo -e "${BLUE}  📄 Génération des slides Slide-Oral.md...${NC}"
if bash "$SCRIPT_DIR/generate-slide.sh"; then
    echo -e "${GREEN}  ✅ Slides générés avec succès${NC}"
else
    echo -e "${YELLOW}  ⚠️  Échec de la génération des slides${NC}"
fi

echo ""

# Vérification des résultats
echo -e "${BLUE}🔍 Vérification des documents générés...${NC}"

# Vérifier le PDF
if [[ -f "$SCRIPT_DIR/docs/output/Dossier-Projet2.pdf" ]]; then
    PDF_SIZE=$(du -h "$SCRIPT_DIR/docs/output/Dossier-Projet2.pdf" | cut -f1)
    echo -e "${GREEN}✅ PDF Dossier-Projet2.pdf créé (Taille: $PDF_SIZE)${NC}"
else
    echo -e "${YELLOW}⚠️  PDF Dossier-Projet2.pdf non trouvé${NC}"
fi

# Vérifier les slides
if [[ -f "$SCRIPT_DIR/output/Slide-Oral.pdf" ]]; then
    echo -e "${GREEN}✅ Slide PDF créé${NC}"
else
    echo -e "${YELLOW}⚠️  Slide PDF non trouvé${NC}"
fi

if [[ -f "$SCRIPT_DIR/output/Slide-Oral.html" ]]; then
    echo -e "${GREEN}✅ Slide HTML créé${NC}"
else
    echo -e "${YELLOW}⚠️  Slide HTML non trouvé${NC}"
fi

echo ""

# Résumé
echo -e "${BLUE}📋 Résumé du build local :${NC}"
echo "  🏗️  Projet : Build terminé"
echo "  📄 Documents : Génération terminée"
echo "  📁 Sortie : $SCRIPT_DIR/docs/output/ et $SCRIPT_DIR/output/"
echo ""

echo -e "${GREEN}🎉 Build local terminé avec succès !${NC}"
echo ""
echo -e "${BLUE}💡 Prochaines étapes :${NC}"
echo "  - Vérifiez les documents générés"
echo "  - Committez les changements si nécessaire"
echo "  - Poussez vers GitHub pour déclencher le workflow CI/CD" 