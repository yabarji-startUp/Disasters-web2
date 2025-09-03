#!/bin/bash

# 🚀 Script Principal de Génération - Tous les Documents
# Génération complète du Dossier-Projet2.pdf et de la présentation Slide-Oral

set -e

echo "🚀 GÉNÉRATION COMPLÈTE - TOUS LES DOCUMENTS"
echo "============================================="
echo ""

# Configuration
DOSSIER_SCRIPT="scripts/generate-dossier-projet2-pdf.sh"
SLIDE_SCRIPT="scripts/generate-slide-oral-presentation.sh"
DOSSIER_OUTPUT_DIR="UF-Zoom/docs"
SLIDE_OUTPUT_DIR="UF-Zoom"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Fonction de log coloré
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    log "Vérification des prérequis..."
    
    # Vérifier que les scripts existent
    if [ ! -f "$DOSSIER_SCRIPT" ]; then
        error "Script Dossier-Projet2 non trouvé : $DOSSIER_SCRIPT"
        exit 1
    fi
    
    if [ ! -f "$SLIDE_SCRIPT" ]; then
        error "Script Slide-Oral non trouvé : $SLIDE_SCRIPT"
        exit 1
    fi
    
    # Vérifier que les scripts sont exécutables
    if [ ! -x "$DOSSIER_SCRIPT" ]; then
        error "Script Dossier-Projet2 non exécutable"
        chmod +x "$DOSSIER_SCRIPT"
        success "Permissions corrigées pour Dossier-Projet2"
    fi
    
    if [ ! -x "$SLIDE_SCRIPT" ]; then
        error "Script Slide-Oral non exécutable"
        chmod +x "$SLIDE_SCRIPT"
        success "Permissions corrigées pour Slide-Oral"
    fi
    
    success "Tous les scripts sont prêts"
}

# Génération du Dossier-Projet2.pdf
generate_dossier() {
    log "Génération du Dossier-Projet2.pdf..."
    
    echo "📋 GÉNÉRATION DOSSIER-PROJET2.PDF"
    echo "=================================="
    
    # Générer PDF uniquement
    echo "1" | "$DOSSIER_SCRIPT"
    
    if [ $? -eq 0 ]; then
        success "Dossier-Projet2.pdf généré avec succès"
    else
        error "Erreur lors de la génération du Dossier-Projet2.pdf"
        return 1
    fi
}

# Génération de la présentation Slide-Oral
generate_slides() {
    log "Génération de la présentation Slide-Oral..."
    
    echo ""
    echo "🎯 GÉNÉRATION PRÉSENTATION SLIDE-ORAL"
    echo "======================================"
    
    # Générer tous les formats
    echo "4" | "$SLIDE_SCRIPT"
    
    if [ $? -eq 0 ]; then
        success "Présentation Slide-Oral générée avec succès"
    else
        error "Erreur lors de la génération de la présentation Slide-Oral"
        return 1
    fi
}

# Vérification des fichiers générés
verify_outputs() {
    log "Vérification des fichiers générés..."
    
    local all_success=true
    
    # Vérifier Dossier-Projet2.pdf
    if [ -f "$DOSSIER_OUTPUT_DIR/Dossier-Projet2.pdf" ] && [ -s "$DOSSIER_OUTPUT_DIR/Dossier-Projet2.pdf" ]; then
        FILE_SIZE=$(du -h "$DOSSIER_OUTPUT_DIR/Dossier-Projet2.pdf" | cut -f1)
        success "Dossier-Projet2.pdf : $FILE_SIZE"
    else
        error "Dossier-Projet2.pdf manquant ou invalide"
        all_success=false
    fi
    
    # Vérifier Slide-Oral.pdf
    if [ -f "$SLIDE_OUTPUT_DIR/Slide-Oral.pdf" ] && [ -s "$SLIDE_OUTPUT_DIR/Slide-Oral.pdf" ]; then
        FILE_SIZE=$(du -h "$SLIDE_OUTPUT_DIR/Slide-Oral.pdf" | cut -f1)
        success "Slide-Oral.pdf : $FILE_SIZE"
    else
        error "Slide-Oral.pdf manquant ou invalide"
        all_success=false
    fi
    
    # Vérifier Slide-Oral.html
    if [ -f "$SLIDE_OUTPUT_DIR/Slide-Oral.html" ] && [ -s "$SLIDE_OUTPUT_DIR/Slide-Oral.html" ]; then
        FILE_SIZE=$(du -h "$SLIDE_OUTPUT_DIR/Slide-Oral.html" | cut -f1)
        success "Slide-Oral.html : $FILE_SIZE"
    else
        error "Slide-Oral.html manquant ou invalide"
        all_success=false
    fi
    
    # Vérifier Slide-Oral.pptx
    if [ -f "$SLIDE_OUTPUT_DIR/Slide-Oral.pptx" ] && [ -s "$SLIDE_OUTPUT_DIR/Slide-Oral.pptx" ]; then
        FILE_SIZE=$(du -h "$SLIDE_OUTPUT_DIR/Slide-Oral.pptx" | cut -f1)
        success "Slide-Oral.pptx : $FILE_SIZE"
    else
        error "Slide-Oral.pptx manquant ou invalide"
        all_success=false
    fi
    
    if [ "$all_success" = true ]; then
        success "Tous les documents ont été générés avec succès !"
    else
        error "Certains documents n'ont pas pu être générés"
        return 1
    fi
}

# Affichage du résumé
show_summary() {
    echo ""
    echo "📊 RÉSUMÉ DE LA GÉNÉRATION"
    echo "============================"
    echo ""
    
    echo "✅ DOCUMENTS GÉNÉRÉS :"
    echo "   📋 Dossier-Projet2.pdf : $(du -h "$DOSSIER_OUTPUT_DIR/Dossier-Projet2.pdf" 2>/dev/null | cut -f1 || echo "N/A")"
    echo "   🎯 Slide-Oral.pdf : $(du -h "$SLIDE_OUTPUT_DIR/Slide-Oral.pdf" 2>/dev/null | cut -f1 || echo "N/A")"
    echo "   🌐 Slide-Oral.html : $(du -h "$SLIDE_OUTPUT_DIR/Slide-Oral.html" 2>/dev/null | cut -f1 || echo "N/A")"
    echo "   📊 Slide-Oral.pptx : $(du -h "$SLIDE_OUTPUT_DIR/Slide-Oral.pptx" 2>/dev/null | cut -f1 || echo "N/A")"
    echo ""
    
    echo "🎯 COMPÉTENCES C1-C5 :"
    echo "   ✅ C1 - ACV Simplifiée : COMPLÉTÉE"
    echo "   ✅ C2 - Cadrage & Budget : COMPLÉTÉE"
    echo "   ✅ C3 - Référentiel : COMPLÉTÉE"
    echo "   ✅ C4 - Implémentations Avancées : COMPLÉTÉE"
    echo "   ✅ C5 - Mesure & Analyse : COMPLÉTÉE"
    echo ""
    
    echo "🚀 PROCHAINES ÉTAPES :"
    echo "   1. Validation de la PR C5"
    echo "   2. Merge vers develop"
    echo "   3. Tests de déploiement sur Render"
    echo "   4. Préparation C6 avec Scaphandre"
    echo ""
    
    echo "📁 FICHIERS DISPONIBLES :"
    echo "   - $DOSSIER_OUTPUT_DIR/Dossier-Projet2.pdf"
    echo "   - $SLIDE_OUTPUT_DIR/Slide-Oral.pdf"
    echo "   - $SLIDE_OUTPUT_DIR/Slide-Oral.html"
    echo "   - $SLIDE_OUTPUT_DIR/Slide-Oral.pptx"
}

# Menu principal
show_menu() {
    echo ""
    echo "🎯 OPTIONS DE GÉNÉRATION :"
    echo "1. Générer Dossier-Projet2.pdf uniquement"
    echo "2. Générer présentation Slide-Oral uniquement"
    echo "3. Générer tous les documents"
    echo "4. Vérifier les fichiers existants"
    echo "5. Quitter"
    echo ""
    read -p "Choisissez une option (1-5) : " choice
    
    case $choice in
        1)
            generate_dossier
            ;;
        2)
            generate_slides
            ;;
        3)
            generate_dossier
            generate_slides
            verify_outputs
            show_summary
            ;;
        4)
            verify_outputs
            show_summary
            ;;
        5)
            log "Au revoir !"
            exit 0
            ;;
        *)
            error "Option invalide"
            show_menu
            ;;
    esac
}

# Fonction principale
main() {
    echo "🚀 Démarrage de la génération complète des documents..."
    echo ""
    
    # Vérifications
    check_prerequisites
    
    # Menu interactif
    show_menu
}

# Gestion des signaux
trap 'echo ""; log "Génération interrompue"; exit 1' INT TERM

# Exécution
main "$@" 