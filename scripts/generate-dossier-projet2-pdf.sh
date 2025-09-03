#!/bin/bash

# 🚀 Script de Génération PDF - Dossier-Projet2.md
# Génération du PDF du dossier projet avec Marp CLI

set -e

echo "🚀 GÉNÉRATION PDF - DOSSIER-PROJET2.MD"
echo "========================================="
echo ""

# Configuration
INPUT_FILE="UF-Zoom/docs/Dossier-Projet2.md"
OUTPUT_FILE="UF-Zoom/docs/Dossier-Projet2.pdf"
THEME="resume2-A4"
PORT=8080

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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
    
    if [ -f "$OUTPUT_FILE" ]; then
        rm "$OUTPUT_FILE"
        success "Ancien PDF supprimé"
    fi
    
    # Nettoyer les fichiers temporaires
    find . -name "*.tmp" -delete 2>/dev/null || true
}

# Génération du PDF
generate_pdf() {
    log "Génération du PDF..."
    
    echo "📊 Paramètres de génération :"
    echo "   - Fichier source : $INPUT_FILE"
    echo "   - Fichier de sortie : $OUTPUT_FILE"
    echo "   - Thème : $THEME"
    echo "   - Format : A4"
    echo ""
    
    # Génération avec Marp CLI
    marp "$INPUT_FILE" \
        --pdf \
        --theme "$THEME" \
        --output "$OUTPUT_FILE" \
        --allow-local-files \
        --html \
        --pdf-notes
    
    if [ $? -eq 0 ]; then
        success "PDF généré avec succès : $OUTPUT_FILE"
    else
        error "Erreur lors de la génération du PDF"
        exit 1
    fi
}

# Vérification du PDF généré
verify_pdf() {
    log "Vérification du PDF généré..."
    
    if [ -f "$OUTPUT_FILE" ]; then
        # Obtenir la taille du fichier
        FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
        success "PDF créé : $OUTPUT_FILE (Taille: $FILE_SIZE)"
        
        # Vérifier que le fichier n'est pas vide
        if [ -s "$OUTPUT_FILE" ]; then
            success "PDF valide et non vide"
        else
            error "PDF généré mais vide"
            exit 1
        fi
    else
        error "PDF non trouvé après génération"
        exit 1
    fi
}

# Génération HTML pour prévisualisation
generate_html() {
    log "Génération HTML pour prévisualisation..."
    
    HTML_OUTPUT="UF-Zoom/docs/Dossier-Projet2.html"
    
    marp "$INPUT_FILE" \
        --html \
        --theme "$THEME" \
        --output "$HTML_OUTPUT" \
        --allow-local-files
    
    if [ $? -eq 0 ]; then
        success "HTML généré : $HTML_OUTPUT"
        log "Vous pouvez ouvrir ce fichier dans un navigateur pour prévisualiser"
    else
        warn "Erreur lors de la génération HTML (non critique)"
    fi
}

# Lancement du serveur de prévisualisation
preview_server() {
    log "Lancement du serveur de prévisualisation..."
    
    echo "🌐 Serveur de prévisualisation lancé sur http://localhost:$PORT"
    echo "   - Appuyez sur Ctrl+C pour arrêter le serveur"
    echo "   - Ouvrez http://localhost:$PORT dans votre navigateur"
    echo ""
    
    marp "$INPUT_FILE" \
        --server \
        --theme "$THEME" \
        --port "$PORT" \
        --allow-local-files
}

# Menu principal
show_menu() {
    echo "🎯 OPTIONS DE GÉNÉRATION :"
    echo "1. Générer PDF uniquement"
    echo "2. Générer PDF + HTML"
    echo "3. Lancer serveur de prévisualisation"
    echo "4. Génération complète (PDF + HTML + Serveur)"
    echo "5. Quitter"
    echo ""
    read -p "Choisissez une option (1-5) : " choice
    
    case $choice in
        1)
            cleanup
            generate_pdf
            verify_pdf
            ;;
        2)
            cleanup
            generate_pdf
            verify_pdf
            generate_html
            ;;
        3)
            preview_server
            ;;
        4)
            cleanup
            generate_pdf
            verify_pdf
            generate_html
            echo ""
            log "Génération complète terminée !"
            log "Lancement du serveur de prévisualisation..."
            preview_server
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
    echo "🚀 Démarrage de la génération PDF..."
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