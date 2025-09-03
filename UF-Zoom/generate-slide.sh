#!/bin/bash
echo "🎯 Génération de la présentation Slide-Oral.md..."

# Vérifier si Marp CLI est installé
if ! command -v marp &> /dev/null; then
    echo "❌ Marp CLI n'est pas installé. Installation..."
    npm install -g @marp-team/marp-cli
fi

# Vérifier si le thème existe
if [ ! -f "../Themes/yas-eco.css" ]; then
    echo "❌ Le thème yas-eco.css n'existe pas dans Themes/"
    echo "Recherche depuis le répertoire racine..."
    if [ ! -f "Themes/yas-eco.css" ]; then
        echo "❌ Le thème yas-eco.css n'existe pas non plus dans Themes/ depuis le répertoire racine"
        exit 1
    else
        echo "✅ Thème trouvé depuis le répertoire racine"
        THEME_PATH="Themes/yas-eco.css"
    fi
else
    echo "✅ Thème trouvé depuis UF-Zoom/"
    THEME_PATH="../Themes/yas-eco.css"
fi

# Vérifier si le fichier de présentation existe
if [ ! -f "Slide-Oral.md" ]; then
    echo "Recherche depuis le répertoire racine..."
    if [ ! -f "UF-Zoom/Slide-Oral.md" ]; then
        echo "❌ Le fichier Slide-Oral.md n'existe pas dans UF-Zoom/ ni dans le répertoire racine"
        exit 1
    else
        echo "✅ Fichier trouvé depuis le répertoire racine"
        SLIDE_FILE="UF-Zoom/Slide-Oral.md"
        OUTPUT_DIR="UF-Zoom/output"
    fi
else
    echo "✅ Fichier trouvé depuis UF-Zoom/"
    SLIDE_FILE="Slide-Oral.md"
    OUTPUT_DIR="output"
fi

# Créer le dossier de sortie
mkdir -p "$OUTPUT_DIR"

echo "📄 Génération de Slide-Oral.md..."

# HTML
echo "  📄 HTML..."
marp "$SLIDE_FILE" \
    --theme-set "$THEME_PATH" \
    --html \
    --output "$OUTPUT_DIR/Slide-Oral.html"

# PDF
echo "  📄 PDF..."
marp "$SLIDE_FILE" \
    --theme-set "$THEME_PATH" \
    --pdf \
    --allow-local-files \
    --output "$OUTPUT_DIR/Slide-Oral.pdf"

# PowerPoint
echo "  📄 PPTX..."
marp "$SLIDE_FILE" \
    --theme-set "$THEME_PATH" \
    --pptx \
    --allow-local-files \
    --output "$OUTPUT_DIR/Slide-Oral.pptx"

echo ""
echo "✅ Présentation Slide-Oral.md générée avec succès !"
echo "📁 Fichiers créés dans le dossier '$OUTPUT_DIR/' :"
ls -la "$OUTPUT_DIR"/ | grep -E 'Slide-Oral\.(html|pdf|pptx)$' | awk '{print "   - " $9}'

# Ouvrir la présentation HTML
if [ -f "$OUTPUT_DIR/Slide-Oral.html" ]; then
    echo "🌐 Ouverture de la présentation..."
    if command -v xdg-open &> /dev/null; then
        xdg-open "$OUTPUT_DIR/Slide-Oral.html"
    elif command -v open &> /dev/null; then
        open "$OUTPUT_DIR/Slide-Oral.html"
    else
        echo "💡 Ouvrez manuellement : $OUTPUT_DIR/Slide-Oral.html"
    fi
fi 