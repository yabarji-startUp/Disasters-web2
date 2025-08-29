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
    exit 1
fi

# Vérifier si le fichier de présentation existe
if [ ! -f "Slide-Oral.md" ]; then
    echo "❌ Le fichier Slide-Oral.md n'existe pas"
    exit 1
fi

# Créer le dossier de sortie
mkdir -p output

echo "📄 Génération de Slide-Oral.md..."

# HTML
echo "  📄 HTML..."
marp "Slide-Oral.md" \
    --theme-set ../Themes/yas-eco.css \
    --html \
    --output "output/Slide-Oral.html"

# PDF
echo "  📄 PDF..."
marp "Slide-Oral.md" \
    --theme-set ../Themes/yas-eco.css \
    --pdf \
    --allow-local-files \
    --output "output/Slide-Oral.pdf"

# PowerPoint
echo "  📄 PPTX..."
marp "Slide-Oral.md" \
    --theme-set ../Themes/yas-eco.css \
    --pptx \
    --allow-local-files \
    --output "output/Slide-Oral.pptx"

echo ""
echo "✅ Présentation Slide-Oral.md générée avec succès !"
echo "📁 Fichiers créés dans le dossier 'output/' :"
ls -la output/ | grep -E 'Slide-Oral\.(html|pdf|pptx)$' | awk '{print "   - " $9}'

# Ouvrir la présentation HTML
if [ -f "output/Slide-Oral.html" ]; then
    echo "🌐 Ouverture de la présentation..."
    if command -v xdg-open &> /dev/null; then
        xdg-open output/Slide-Oral.html
    elif command -v open &> /dev/null; then
        open output/Slide-Oral.html
    else
        echo "💡 Ouvrez manuellement : output/Slide-Oral.html"
    fi
fi 