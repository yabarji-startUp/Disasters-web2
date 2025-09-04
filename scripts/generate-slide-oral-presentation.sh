#!/bin/bash

# 🎯 Script de Génération Présentation - Slide-Oral.md
# Génération de la présentation orale avec Marp CLI

set -e

echo "🎯 GÉNÉRATION PRÉSENTATION - SLIDE-ORAL.MD"
echo "============================================"
echo ""

# Configuration
INPUT_FILE="UF-Zoom/Slide-Oral.md"
OUTPUT_DIR="UF-Zoom/output"
OUTPUT_PDF="$OUTPUT_DIR/Slide-Oral.pdf"
OUTPUT_HTML="$OUTPUT_DIR/Slide-Oral.html"
OUTPUT_PPTX="$OUTPUT_DIR/Slide-Oral.pptx"
THEME="yas-eco"
PORT=8081

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
    
    # Vérifier que Marp CLI est installé
    if ! command -v marp &> /dev/null; then
        error "Marp CLI n'est pas installé"
        log "Installation de Marp CLI..."
        npm install -g @marp-team/marp-cli
    else
        success "Marp CLI détecté"
    fi
    
    # Vérifier que le fichier d'entrée existe
    if [ ! -f "$INPUT_FILE" ]; then
        error "Fichier d'entrée non trouvé : $INPUT_FILE"
        exit 1
    fi
    
    success "Fichier d'entrée trouvé : $INPUT_FILE"
}

# Nettoyage des fichiers précédents
cleanup() {
    log "Nettoyage des fichiers précédents..."
    
    # Supprimer les anciens fichiers de sortie
    if [ -d "$OUTPUT_DIR" ]; then
        rm -r "$OUTPUT_DIR"
        success "Anciens fichiers de sortie supprimés"
    fi
    
    # Créer le dossier output
    mkdir -p "$OUTPUT_DIR"
    success "Dossier de sortie créé : $OUTPUT_DIR"
    
    # Nettoyer les fichiers temporaires
    find . -name "*.tmp" -delete 2>/dev/null || true
}

# Génération PDF
generate_pdf() {
    log "Génération du PDF..."
    
    echo "📊 Paramètres de génération PDF :"
    echo "   - Fichier source : $INPUT_FILE"
    echo "   - Fichier de sortie : $OUTPUT_PDF"
    echo "   - Thème : $THEME"
    echo ""
    
    marp "$INPUT_FILE" \
        --pdf \
        --theme "$THEME" \
        --output "$OUTPUT_PDF" \
        --allow-local-files \
        --html \
        --pdf-notes
    
    if [ $? -eq 0 ]; then
        success "PDF généré avec succès : $OUTPUT_PDF"
    else
        error "Erreur lors de la génération du PDF"
        return 1
    fi
}

# Génération HTML
generate_html() {
    log "Génération du HTML..."
    
    echo "🌐 Paramètres de génération HTML :"
    echo "   - Fichier source : $INPUT_FILE"
    echo "   - Fichier de sortie : $OUTPUT_HTML"
    echo "   - Thème : $THEME"
    echo ""
    
    marp "$INPUT_FILE" \
        --html \
        --theme "$THEME" \
        --output "$OUTPUT_HTML" \
        --allow-local-files
    
    if [ $? -eq 0 ]; then
        success "HTML généré avec succès : $OUTPUT_HTML"
    else
        error "Erreur lors de la génération du HTML"
        return 1
    fi
}

# Génération PowerPoint (PPTX)
generate_pptx() {
    log "Génération du PowerPoint (PPTX)..."
    
    echo "📊 Paramètres de génération PPTX :"
    echo "   - Fichier source : $INPUT_FILE"
    echo "   - Fichier de sortie : $OUTPUT_PPTX"
    echo "   - Thème : $THEME"
    echo ""
    
    marp "$INPUT_FILE" \
        --pptx \
        --theme "$THEME" \
        --output "$OUTPUT_PPTX" \
        --allow-local-files
    
    if [ $? -eq 0 ]; then
        success "PowerPoint généré avec succès : $OUTPUT_PPTX"
    else
        error "Erreur lors de la génération du PowerPoint"
        return 1
    fi
}

# Vérification des fichiers générés
verify_outputs() {
    log "Vérification des fichiers générés..."
    
    local all_success=true
    
    # Vérifier PDF
    if [ -f "$OUTPUT_PDF" ] && [ -s "$OUTPUT_PDF" ]; then
        FILE_SIZE=$(du -h "$OUTPUT_PDF" | cut -f1)
        success "PDF validé : $OUTPUT_PDF (Taille: $FILE_SIZE)"
    else
        error "PDF invalide ou vide"
        all_success=false
    fi
    
    # Vérifier HTML
    if [ -f "$OUTPUT_HTML" ] && [ -s "$OUTPUT_HTML" ]; then
        FILE_SIZE=$(du -h "$OUTPUT_HTML" | cut -f1)
        success "HTML validé : $OUTPUT_HTML (Taille: $FILE_SIZE)"
    else
        error "HTML invalide ou vide"
        all_success=false
    fi
    
    # Vérifier PPTX
    if [ -f "$OUTPUT_PPTX" ] && [ -s "$OUTPUT_PPTX" ]; then
        FILE_SIZE=$(du -h "$OUTPUT_PPTX" | cut -f1)
        success "PowerPoint validé : $OUTPUT_PPTX (Taille: $FILE_SIZE)"
    else
        error "PowerPoint invalide ou vide"
        all_success=false
    fi
    
    if [ "$all_success" = true ]; then
        success "Tous les fichiers ont été générés avec succès !"
    else
        error "Certains fichiers n'ont pas pu être générés"
        return 1
    fi
}

# Lancement du serveur de prévisualisation
preview_server() {
    log "Lancement du serveur de prévisualisation..."
    
    echo "🌐 Serveur de prévisualisation lancé sur http://localhost:$PORT"
    echo "   - Appuyez sur Ctrl+C pour arrêter le serveur"
    echo "   - Ouvrez http://localhost:$PORT dans votre navigateur"
    echo "   - Navigation : Flèches gauche/droite ou clic sur les slides"
    echo ""
    
    marp "$INPUT_FILE" \
        --server \
        --theme "$THEME" \
        --port "$PORT" \
        --allow-local-files
}

# Génération complète
generate_all() {
    log "Génération complète de tous les formats..."
    
    cleanup
    
    # Génération séquentielle
    generate_pdf || return 1
    generate_html || return 1
    generate_pptx || return 1
    
    # Vérification
    verify_outputs
    
    success "Génération complète terminée avec succès !"
}

# Menu principal
show_menu() {
    echo ""
    echo "🎯 OPTIONS DE GÉNÉRATION :"
    echo "1. Générer PDF uniquement"
    echo "2. Générer HTML uniquement"
    echo "3. Générer PowerPoint uniquement"
    echo "4. Générer tous les formats (PDF + HTML + PPTX)"
    echo "5. Lancer serveur de prévisualisation"
    echo "6. Génération complète + Serveur"
    echo "7. Quitter"
    echo ""
    read -p "Choisissez une option (1-7) : " choice
    
    case $choice in
        1)
            cleanup
            generate_pdf
            verify_outputs
            ;;
        2)
            cleanup
            generate_html
            verify_outputs
            ;;
        3)
            cleanup
            generate_pptx
            verify_outputs
            ;;
        4)
            generate_all
            ;;
        5)
            preview_server
            ;;
        6)
            generate_all
            echo ""
            log "Génération terminée ! Lancement du serveur..."
            preview_server
            ;;
        7)
            log "Au revoir !"
            exit 0
            ;;
        *)
            error "Option invalide"
            show_menu
            ;;
    esac
}

# Affichage des informations du projet
show_project_info() {
    echo "📋 INFORMATIONS DU PROJET :"
    echo "   - Compétences C1-C5 : ✅ COMPLÉTÉES"
    echo "   - Dashboard C5 : ✅ IMPLÉMENTÉ"
    echo "   - PR C5 : #7 créée et prête"
    echo "   - Structure documentaire : ✅ CORRIGÉE"
    echo "   - Numérotation : ✅ COHÉRENTE"
    echo ""
}

# Fonction principale
main() {
    echo "🎯 Démarrage de la génération de présentation..."
    echo ""
    
    # Affichage des informations
    show_project_info
    
    # Vérifications
    check_prerequisites
    
    # Menu interactif
    show_menu
}

# Gestion des signaux
trap 'echo ""; log "Génération interrompue"; exit 1' INT TERM

# Exécution
main "$@" 