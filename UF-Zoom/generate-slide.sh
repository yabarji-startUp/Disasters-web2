#!/bin/bash
echo "🎯 Génération de la présentation slide.md..."

# Vérifier si Marp CLI est installé
if ! command -v marp &> /dev/null; then
    echo "❌ Marp CLI n'est pas installé. Installation..."
    npm install -g @marp-team/marp-cli
fi

# Vérifier si le thème existe
if [ ! -f "../Themes/yas-eco.css" ]; then
    echo "❌ Le thème yas-eco.css n'existe pas dans Themes/"
    exit 1
fi

# Vérifier si le fichier de présentation existe
if [ ! -f "slide.md" ]; then
    echo "❌ Le fichier slide.md n'existe pas"
    exit 1
fi

# Créer le dossier de sortie
mkdir -p output

echo "📄 Génération de slide.md..."

# HTML
echo "  📄 HTML..."
marp "slide.md" \
    --theme-set ../Themes/yas-eco.css \
    --html \
    --output "output/slide.html"

# PDF
echo "  📄 PDF..."
marp "slide.md" \
    --theme-set ../Themes/yas-eco.css \
    --pdf \
    --allow-local-files \
    --output "output/slide.pdf"

# PowerPoint
echo "  📄 PPTX..."
marp "slide.md" \
    --theme-set ../Themes/yas-eco.css \
    --pptx \
    --allow-local-files \
    --output "output/slide.pptx"

echo ""
echo "✅ Présentation slide.md générée avec succès !"
echo "📁 Fichiers créés dans le dossier 'output/' :"
ls -la output/ | grep -E 'slide\.(html|pdf|pptx)$' | awk '{print "   - " $9}'

# Ouvrir la présentation HTML
if [ -f "output/slide.html" ]; then
    echo "🌐 Ouverture de la présentation..."
    if command -v xdg-open &> /dev/null; then
        xdg-open output/slide.html
    elif command -v open &> /dev/null; then
        open output/slide.html
    else
        echo "💡 Ouvrez manuellement : output/slide.html"
    fi
fi 