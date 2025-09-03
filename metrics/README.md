# 📊 Métriques - Disaster-web2

## 🎯 Objectif
Ce dossier contient toutes les métriques de performance et d'impact environnemental pour le projet disaster-web2.

## 📁 Structure

### Mesures Lighthouse
- `lighthouse-before.json` - Mesures AVANT optimisation
- `lighthouse-after.json` - Mesures APRÈS optimisation
- `lighthouse-comparison.md` - Analyse comparative

### Métriques internes
- `internal-before.json` - Métriques dashboard AVANT
- `internal-after.json` - Métriques dashboard APRÈS
- `internal-comparison.md` - Analyse comparative

### Rapports
- `rapport-c1.md` - Rapport compétence C1
- `rapport-c2.md` - Rapport compétence C2
- `rapport-c3.md` - Rapport compétence C3
- `rapport-c4.md` - Rapport compétence C4
- `rapport-c5.md` - Rapport compétence C5

## 🛠️ Commandes de mesure

### Mesure AVANT optimisation
```bash
# 1. Démarrer l'app
npm run dev

# 2. Mesurer avec Lighthouse
npx lighthouse http://localhost:3000 --output=json --output-path=./metrics/lighthouse-before.json

# 3. Capturer métriques internes (via dashboard)
```

### Mesure APRÈS optimisation
```bash
# 1. Redémarrer l'app
npm run dev

# 2. Mesurer avec Lighthouse
npx lighthouse http://localhost:3000 --output=json --output-path=./metrics/lighthouse-after.json

# 3. Capturer métriques internes (via dashboard)
```

## 📊 Métriques surveillées

### Performance Lighthouse
- **Performance Score** : 0-100
- **First Contentful Paint** : ms
- **Largest Contentful Paint** : ms
- **Cumulative Layout Shift** : score
- **Total Blocking Time** : ms

### Métriques internes disaster-web2
- **Bundle Size** : KB
- **Page Weight** : KB
- **DOM Objects** : nombre
- **Resources** : nombre
- **Cache Hit** : %
- **Load Time** : ms

### Impact environnemental (proxy)
- **Lighthouse Performance** ≈ **EcoIndex Score**
- **Temps de chargement** ≈ **Impact CO2**
- **Taille ressources** ≈ **Consommation énergétique**

## 📈 Analyse des gains

### Formule de calcul
```
Gain (%) = ((Avant - Après) / Avant) × 100
```

### Seuils d'amélioration
- **Excellent** : > 50% d'amélioration
- **Bon** : 25-50% d'amélioration
- **Correct** : 10-25% d'amélioration
- **Insuffisant** : < 10% d'amélioration

## 🎓 Compétences évaluées

- **C1** : ACV simplifiée - Méthodologie et impacts
- **C2** : Cadrage - Budget environnemental
- **C3** : Référentiel - Bonnes pratiques RGESN
- **C4** : Implémentations - Optimisations concrètes
- **C5** : Mesure - Protocole et analyse

---
*Dernière mise à jour : $(date)* 