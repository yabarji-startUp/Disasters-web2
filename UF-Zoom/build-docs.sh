#!/bin/bash

# Script de build intégré pour la génération automatique des documents
# Génère PDF et slides lors du build du projet
# Auteur : Yassen ABARJI
# Date : 04/09/2025

set -e  # Arrêter le script en cas d'erreur

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BUILD_LOG="$PROJECT_ROOT/build-docs.log"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction d'affichage des messages
print_status() {
    echo -e "${BLUE}[BUILD]${NC} $1" | tee -a "$BUILD_LOG"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$BUILD_LOG"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$BUILLD_LOG"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$BUILD_LOG"
}

# Fonction de nettoyage
cleanup() {
    print_status "Nettoyage des fichiers temporaires..."
    rm -f "$BUILD_LOG"
}

# Fonction de vérification des prérequis
check_prerequisites() {
    print_status "Vérification des prérequis..."
    
    # Vérifier que Marp est installé
    if ! command -v marp &> /dev/null; then
        print_error "Marp n'est pas installé. Installation..."
        npm install -g @marp-team/marp-cli
    fi
    
    # Vérifier que les thèmes existent
    if [[ ! -f "$PROJECT_ROOT/Themes/resume2-A4.css" ]]; then
        print_error "Le thème resume2-A4.css n'existe pas"
        exit 1
    fi
    
    if [[ ! -f "$PROJECT_ROOT/Themes/yas-eco.css" ]]; then
        print_error "Le thème yas-eco.css n'existe pas"
        exit 1
    fi
    
    # Vérifier que les fichiers sources existent
    if [[ ! -f "$SCRIPT_DIR/docs/Dossier-Projet2.md" ]]; then
        print_error "Le fichier Dossier-Projet2.md n'existe pas"
        exit 1
    fi
    
    if [[ ! -f "$SCRIPT_DIR/Slide-Oral.md" ]]; then
        print_error "Le fichier Slide-Oral.md n'existe pas"
        exit 1
    fi
    
    print_success "Tous les prérequis sont satisfaits"
}

# Fonction de génération du PDF
generate_pdf() {
    print_status "Génération du PDF Dossier-Projet2.md..."
    
    cd "$PROJECT_ROOT"
    
    if bash "$SCRIPT_DIR/generate-dossier-pdf.sh"; then
        print_success "PDF Dossier-Projet2.md généré avec succès"
    else
        print_error "Échec de la génération du PDF Dossier-Projet2.md"
        return 1
    fi
}

# Fonction de génération des slides
generate_slides() {
    print_status "Génération des slides Slide-Oral.md..."
    
    cd "$SCRIPT_DIR"
    
    if bash "$SCRIPT_DIR/generate-slide.sh"; then
        print_success "Slides Slide-Oral.md générés avec succès"
    else
        print_error "Échec de la génération des slides Slide-Oral.md"
        return 1
    fi
}

# Fonction de vérification des résultats
verify_results() {
    print_status "Vérification des documents générés..."
    
    # Vérifier le PDF
    if [[ -f "$SCRIPT_DIR/docs/output/Dossier-Projet2.pdf" ]]; then
        PDF_SIZE=$(du -h "$SCRIPT_DIR/docs/output/Dossier-Projet2.pdf" | cut -f1)
        print_success "PDF créé : Dossier-Projet2.pdf (Taille: $PDF_SIZE)"
    else
        print_error "Le PDF Dossier-Projet2.pdf n'a pas été créé"
        return 1
    fi
    
    # Vérifier les slides
    if [[ -f "$SCRIPT_DIR/output/Slide-Oral.pdf" ]]; then
        SLIDE_SIZE=$(du -h "$SCRIPT_DIR/output/Slide-Oral.pdf" | cut -f1)
        print_success "Slide PDF créé : Slide-Oral.pdf (Taille: $SLIDE_SIZE)"
    else
        print_error "Le slide PDF Slide-Oral.pdf n'a pas été créé"
        return 1
    fi
    
    if [[ -f "$SCRIPT_DIR/output/Slide-Oral.html" ]]; then
        print_success "Slide HTML créé : Slide-Oral.html"
    else
        print_error "Le slide HTML Slide-Oral.html n'a pas été créé"
        return 1
    fi
    
    if [[ -f "$SCRIPT_DIR/output/Slide-Oral.pptx" ]]; then
        print_success "Slide PPTX créé : Slide-Oral.pptx"
    else
        print_error "Le slide PPTX Slide-Oral.pptx n'a pas été créé"
        return 1
    fi
}

# Fonction de rapport de build
generate_build_report() {
    print_status "Génération du rapport de build..."
    
    REPORT_FILE="$PROJECT_ROOT/build-docs-report.txt"
    
    cat > "$REPORT_FILE" << EOF
# Rapport de Build - Génération des Documents
Date: $(date)
Projet: $(basename "$PROJECT_ROOT")

## Documents générés

### PDF - Dossier-Projet2.md
- Fichier: $SCRIPT_DIR/docs/output/Dossier-Projet2.pdf
- Taille: $(du -h "$SCRIPT_DIR/docs/output/Dossier-Projet2.pdf" | cut -f1)
- Thème: resume2-A4.css
- Format: A4 Portrait

### Slides - Slide-Oral.md
- PDF: $SCRIPT_DIR/output/Slide-Oral.pdf
- HTML: $SCRIPT_DIR/output/Slide-Oral.html
- PPTX: $SCRIPT_DIR/output/Slide-Oral.pptx
- Thème: yas-eco.css

## Logs de build
$(cat "$BUILD_LOG" 2>/dev/null || echo "Aucun log disponible")

## Statut
✅ Build terminé avec succès
EOF
    
    print_success "Rapport de build généré : $REPORT_FILE"
}

# Fonction principale
main() {
    echo "==========================================" | tee -a "$BUILD_LOG"
    echo "  BUILD INTÉGRÉ - Génération Documents" | tee -a "$BUILD_LOG"
    echo "==========================================" | tee -a "$BUILD_LOG"
    echo "" | tee -a "$BUILD_LOG"
    
    # Initialiser le log
    echo "Build démarré le $(date)" > "$BUILD_LOG"
    
    # Afficher les informations du projet
    print_status "Informations du projet :"
    echo "  - Répertoire de travail : $PROJECT_ROOT" | tee -a "$BUILD_LOG"
    echo "  - Scripts : $SCRIPT_DIR" | tee -a "$BUILD_LOG"
    echo "  - Log de build : $BUILD_LOG" | tee -a "$BUILD_LOG"
    echo "" | tee -a "$BUILD_LOG"
    
    # Vérifier les prérequis
    check_prerequisites
    
    # Générer les documents
    print_status "Début de la génération des documents..."
    
    if generate_pdf; then
        print_success "PDF généré avec succès"
    else
        print_error "Échec de la génération du PDF"
        exit 1
    fi
    
    if generate_slides; then
        print_success "Slides générés avec succès"
    else
        print_error "Échec de la génération des slides"
        exit 1
    fi
    
    # Vérifier les résultats
    verify_results
    
    # Générer le rapport
    generate_build_report
    
    echo "" | tee -a "$BUILD_LOG"
    print_success "Build des documents terminé avec succès !"
    echo "" | tee -a "$BUILD_LOG"
    echo "📁 Documents générés :" | tee -a "$BUILD_LOG"
    echo "  - PDF: $SCRIPT_DIR/docs/output/Dossier-Projet2.pdf" | tee -a "$BUILD_LOG"
    echo "  - Slides: $SCRIPT_DIR/output/" | tee -a "$BUILD_LOG"
    echo "  - Rapport: $PROJECT_ROOT/build-docs-report.txt" | tee -a "$BUILD_LOG"
    echo "" | tee -a "$BUILD_LOG"
}

# Gestion des signaux pour le nettoyage
trap cleanup EXIT
trap 'print_error "Interruption détectée"; exit 1' INT TERM

# Exécution du script principal
main "$@" 