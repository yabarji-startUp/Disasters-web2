#!/bin/bash

# Script de génération PDF pour Dossier-Projet2.md
# Utilise Marp avec le thème resume2-A4.css pour générer un PDF A4 portrait
# Auteur : Yassen ABARJI
# Date : 04/09/2025

set -e  # Arrêter le script en cas d'erreur

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
INPUT_FILE="UF-Zoom/docs/Dossier-Projet2.md"
OUTPUT_FILE="UF-Zoom/docs/output/Dossier-Projet2.pdf"
THEME_FILE="Themes/resume2-A4.css"
TEMP_HTML="UF-Zoom/docs/output/temp_dossier.html"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction d'affichage des messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Fonction de vérification des prérequis
check_prerequisites() {
    print_status "Vérification des prérequis..."
    
    # Vérifier que Marp est installé
    if ! command -v marp &> /dev/null; then
        print_error "Marp n'est pas installé. Veuillez l'installer avec : npm install -g @marp-team/marp-cli"
        exit 1
    fi
    
    # Vérifier que le fichier d'entrée existe
    if [[ ! -f "$INPUT_FILE" ]]; then
        print_error "Le fichier d'entrée '$INPUT_FILE' n'existe pas"
        exit 1
    fi
    
    # Vérifier que le thème existe
    if [[ ! -f "$THEME_FILE" ]]; then
        print_error "Le fichier de thème '$THEME_FILE' n'existe pas"
        exit 1
    fi
    
    print_success "Tous les prérequis sont satisfaits"
}

# Fonction de nettoyage
cleanup() {
    if [[ -f "$TEMP_HTML" ]]; then
        rm -f "$TEMP_HTML"
        print_status "Fichier temporaire supprimé"
    fi
}

# Fonction de génération HTML intermédiaire
generate_html() {
    print_status "Génération du fichier HTML intermédiaire..."
    
    cd "$PROJECT_ROOT"
    
    if marp --theme-set "$THEME_FILE" --html "$INPUT_FILE" -o "$TEMP_HTML"; then
        print_success "Fichier HTML généré avec succès"
    else
        print_error "Échec de la génération du fichier HTML"
        exit 1
    fi
}

# Fonction de génération PDF
generate_pdf() {
    print_status "Génération du fichier PDF..."
    
    cd "$PROJECT_ROOT"
    
    if marp --theme-set "$THEME_FILE" --pdf "$INPUT_FILE" -o "$OUTPUT_FILE"; then
        print_success "Fichier PDF généré avec succès : $OUTPUT_FILE"
    else
        print_error "Échec de la génération du fichier PDF"
        exit 1
    fi
}

# Fonction de vérification du PDF généré
verify_pdf() {
    print_status "Vérification du fichier PDF généré..."
    
    if [[ -f "$OUTPUT_FILE" ]]; then
        # Obtenir la taille du fichier
        FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
        print_success "Fichier PDF créé : $OUTPUT_FILE (Taille: $FILE_SIZE)"
        
        # Vérifier que le fichier n'est pas vide
        if [[ -s "$OUTPUT_FILE" ]]; then
            print_success "Le fichier PDF n'est pas vide"
        else
            print_warning "Le fichier PDF semble vide"
        fi
    else
        print_error "Le fichier PDF n'a pas été créé"
        exit 1
    fi
}

# Fonction d'affichage des informations du projet
show_project_info() {
    print_status "Informations du projet :"
    echo "  - Répertoire de travail : $PROJECT_ROOT"
    echo "  - Fichier d'entrée : $INPUT_FILE"
    echo "  - Thème utilisé : $THEME_FILE"
    echo "  - Fichier de sortie : $OUTPUT_FILE"
    echo "  - Dossier de sortie : docs/output/"
    echo "  - Format : A4 Portrait (210mm × 297mm)"
    echo ""
}

# Fonction principale
main() {
    echo "=========================================="
    echo "  Générateur PDF - Dossier-Projet2.md"
    echo "=========================================="
    echo ""
    
    # Afficher les informations du projet
    show_project_info
    
    # Vérifier les prérequis
    check_prerequisites
    
    # Générer le PDF
    generate_pdf
    
    # Vérifier le résultat
    verify_pdf
    
    echo ""
    print_success "Génération PDF terminée avec succès !"
    echo ""
    echo "Fichier généré : $OUTPUT_FILE"
    echo "Emplacement : $PROJECT_ROOT/$OUTPUT_FILE"
    echo ""
}

# Gestion des signaux pour le nettoyage
trap cleanup EXIT
trap 'print_error "Interruption détectée"; exit 1' INT TERM

# Exécution du script principal
main "$@" 