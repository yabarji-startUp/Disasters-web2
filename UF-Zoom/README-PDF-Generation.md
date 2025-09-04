# 📄 Génération PDF - Dossier-Projet2.md

## 🎯 Objectif

Ce dossier contient les scripts pour générer automatiquement le fichier PDF du document `Dossier-Projet2.md` en utilisant Marp avec le thème `resume2-A4.css`.

## 📁 Structure des fichiers

```
UF-Zoom/
├── generate-dossier-pdf.sh      # Script principal (depuis le répertoire racine)
├── generate-pdf.sh              # Script de raccourci (depuis UF-Zoom)
├── docs/
│   ├── Dossier-Projet2.md       # Document source Markdown
│   └── output/                  # Dossier de sortie
│       └── Dossier-Projet2.pdf  # PDF généré
└── README-PDF-Generation.md     # Ce fichier
```

## 🚀 Utilisation

### Option 1 : Depuis le répertoire racine du projet

```bash
# Depuis /path/to/Disasters-web2/
./UF-Zoom/generate-dossier-pdf.sh
```

### Option 2 : Depuis le répertoire UF-Zoom

```bash
# Depuis /path/to/Disasters-web2/UF-Zoom/
./generate-pdf.sh
```

## ⚙️ Prérequis

- **Marp CLI** installé globalement : `npm install -g @marp-team/marp-cli`
- **Thème CSS** : `../Themes/resume2-A4.css` doit exister
- **Document source** : `docs/Dossier-Projet2.md` doit exister

## 📋 Fonctionnalités du script principal

### ✅ Vérifications automatiques
- Installation de Marp
- Existence du fichier d'entrée
- Existence du thème CSS
- Création du dossier de sortie

### 🎨 Génération PDF
- Utilisation du thème `resume2-A4.css`
- Format A4 Portrait (210mm × 297mm)
- Gestion des erreurs et nettoyage

### 📊 Validation
- Vérification de la création du fichier
- Contrôle de la taille du fichier
- Messages colorés et informatifs

## 📤 Sortie

Le fichier PDF est généré dans :
```
UF-Zoom/docs/output/Dossier-Projet2.pdf
```

## 🔧 Configuration

### Chemins configurés dans le script
- **Fichier d'entrée** : `UF-Zoom/docs/Dossier-Projet2.md`
- **Fichier de sortie** : `UF-Zoom/docs/output/Dossier-Projet2.pdf`
- **Thème CSS** : `Themes/resume2-A4.css`
- **Fichier temporaire** : `UF-Zoom/docs/output/temp_dossier.html`

### Personnalisation
Pour modifier les chemins, éditez les variables au début du script `generate-dossier-pdf.sh` :

```bash
INPUT_FILE="UF-Zoom/docs/Dossier-Projet2.md"
OUTPUT_FILE="UF-Zoom/docs/output/Dossier-Projet2.pdf"
THEME_FILE="Themes/resume2-A4.css"
```

## 🐛 Résolution des problèmes

### Erreur "Marp n'est pas installé"
```bash
npm install -g @marp-team/marp-cli
```

### Erreur "Fichier d'entrée n'existe pas"
Vérifiez que `Dossier-Projet2.md` existe dans `UF-Zoom/docs/`

### Erreur "Fichier de thème n'existe pas"
Vérifiez que `resume2-A4.css` existe dans `Themes/`

### Erreur de permissions
```bash
chmod +x generate-dossier-pdf.sh
chmod +x generate-pdf.sh
```

## 📝 Notes techniques

- **Format** : A4 Portrait (210mm × 297mm)
- **Thème** : resume2-A4.css (orientation portrait forcée)
- **Pagination** : Automatique avec gestion des débordements
- **Qualité** : Optimisé pour l'impression et la lecture

## 🔄 Mise à jour

Pour régénérer le PDF après modification du document :
1. Modifiez `Dossier-Projet2.md`
2. Exécutez le script de génération
3. Le PDF sera mis à jour dans `docs/output/`

## 📞 Support

En cas de problème, vérifiez :
1. Les prérequis (Marp installé)
2. Les chemins des fichiers
3. Les permissions des scripts
4. La structure des dossiers 