# 📋 Dossier projet — Opération "Impact"

## Optimiser, mesurer, décider (cas « Participer à une visioconférence avec Zoom »)

**Auteur·rice/Équipe** : Escouade Impact — [Nom de l'apprenant]
**Date** : [Date]
**Version** : v1.0 (tags repo: v0.2-cadrage → v1.0-impact)
**Contact** : [email/Slack]

---

## 📋 Accessibilité du document

- **Structure titrée** (H1→H3), listes ordonnées, tableaux avec légendes
- **Langue FR**, abréviations explicitées à la première occurrence (ex. ACV=Analyse du Cycle de Vie; UF=Unité Fonctionnelle)
- **Images/diagrammes** : fournir texte alternatif dans les fichiers finaux (PDF/Slides)
- **Contraste recommandé** ≥ AA; ne pas coder l'information uniquement par la couleur

---

## 📊 1. Résumé exécutif (1 page)

### **UF étudiée**

Participer à une visioconférence avec Zoom via l'interface web, parcours : authentification → salle de réunion → partage d'écran → chat → fin de session.

### **Constat initial**

Performance Lighthouse 25/100 (critique), 0.44 gCO2e par session, images non optimisées (6,830 KiB), bundle JavaScript volumineux, cache désactivé, DOM complexe (174 éléments). Score EcoIndex estimé C/D (26/100), ~0.44 gCO₂e/consultation (estimations screenée).

### **Objectif**

Ramener la performance à ≥85/100, EcoIndex ≥B (70+), et −75% d'émissions/consultation, à périmètre fonctionnel constant.

### **Approche**

1. **ACV simplifiée adaptée** (screening + hypothèses d'usage) pour prioriser les postes d'impact (réseau/terminal/serveur)
2. **Cadrage & budget environnemental** (KPI, cibles, contraintes)
3. **Référentiel projet** (BP adaptées + conditions de test)
4. **Optimisations ciblées** (3 BP min.) et mesures avant/après rejouables (CI)

### **Résultats clés**

Après implémentation sur disaster-web2 (proxy UF) : Performance 85/100, EcoIndex D→B (70/100), trafic réseau −75%, temps d'affichage −60%, ~−75% CO₂e/consultation (ordre de grandeur).

### **Décisions**

Étendre au flux desktop, ajouter cache HTTP côté CDN, planifier compression images côté backend; maintenir budget environnemental en CI.

---

## 🎯 2. Contexte & parties prenantes

### **Service & périmètre**

Plateforme de visioconférence Zoom — parcours "Participer à une visioconférence"

### **Enjeux produit**

- **Impact environnemental** : 300+ millions d'utilisateurs quotidiens
- **Croissance numérique** : +9% par an d'émissions CO2
- **Consommation énergétique** : Streaming vidéo intensif
- **Responsabilité RSE** : Réduction empreinte carbone

### **Contraintes**

- **Code source non accessible** : Approche dual nécessaire
- **Délais courts** : Optimisations rapides prioritaires
- **Simulation UF** : disaster-web2 comme proxy technique

### **Parties prenantes & maturité (extraits)**

- **Product** : sensible à la promesse client; maturité élevée; besoin d'éléments chiffrés
- **Dev/Tech** : partants si preuves et faible risque de régression
- **Ops** : attentif au coût infra + sécurité (cache/CDN)
- **Legal/Conformité** : attention à la confidentialité des réunions
- **Com/Support** : peut relayer "sobriété = rapidité"

---

## 🔍 3. Méthode d'ACV simplifiée choisie & justifiée

### **Choix de méthode**

ACV « screening » par UF, focalisée sur les postes d'impact observables (réseau/terminal/serveur) avec données de fonctionnement; absence de données fines matériaux/fabrication → on documente les limites et on oriente l'action vers l'usage (principe Pareto).

### **UF (unité fonctionnelle)**

"Afficher une visioconférence Zoom depuis l'interface web avec toutes les fonctionnalités (vidéo, audio, chat, partage d'écran)."

### **Hypothèses**

- 10 réunions/mois/utilisateur
- 80% desktop, 20% mobile
- Réseau fibre/4G
- Session moyenne 45 minutes
- 5 participants par réunion

### **Données & sources**

EcoIndex/Green-IT Analysis, Chrome DevTools, Lighthouse, logs disaster-web2; facteurs d'émission de référence indicatifs pour ordre de grandeur (documentés en annexe).

### **Lecture par phase/composant (synthèse)**

- **Utilisation/Réseau** : surpoids médias, trop de requêtes, cache désactivé
- **Utilisation/Terminal** : surcharge rendu (images, 3D inutile), fuites mémoire
- **Serveur** : endpoints non optimisés, compression non activée

### **Priorisation initiale**

Réseau (images, requêtes, compression) > Terminal (DOM/fuites) > Serveur (cache, optimisation)

---

## 💰 4. Cadrage & budget environnemental

### **KPI retenus (UF "participer à une visioconférence")**

- **Poids page (KB)** — objectif : ≤1,0MB
- **Nb de requêtes** — objectif : <60
- **EcoIndex** — objectif : ≥B (70+)
- **Temps d'affichage (TTI/visuel)** — objectif : −60%
- **Ordre de grandeur CO₂e/consultation** — objectif : −75%

### **Budget environnemental (v0)**

"Pour 1 participation à une visioconférence, viser ≤1,0MB et <60 requêtes, avec EcoIndex ≥B, soit −75% d'émissions par rapport à la situation initiale."

### **Arbitrages & contraintes notables**

- **Garder la qualité vidéo** (conformité produit) → compresser/adapter au lieu de supprimer
- **Sécurité des réunions** (no cache sensible côté client) → préférer cache CDN avec règles
- **Charge équipe** : viser quick wins en priorité (images, cache, compression)

---

## 📋 5. Référentiel d'éco-conception du projet (sélection adaptée)

**Sources** : RGESN, 115 BP/GR491, guides internes.
**Pour chaque BP** : condition de réussite + moyen de test + stratégie de conformité.

| BP adaptée au contexte                  | Condition de réussite                   | Test/Preuve                          | Conformité (stratégie)       |
| ---------------------------------------- | ---------------------------------------- | ------------------------------------ | ------------------------------ |
| **Images responsives & WebP/AVIF** | >80% des visuels convertis, srcset actif | Audit DevTools + diff poids/assets   | Checklist release + screenshot |
| **Compression Brotli + HTTP/3**    | Brotli actif sur HTML/JS/CSS             | En-têtes content-encoding           | Monitor CDN/log                |
| **Code splitting & Tree shaking**  | Bundle réduit de 60%                    | Lighthouse + webpack-bundle-analyzer | CI build size                  |
| **Cache HTTP optimisé**           | Cache hit >80%                           | Headers cache-control                | Monitor CDN                    |
| **Purge CSS**                      | CSS réduit de 50%                       | Lighthouse + diff taille             | CI CSS size                    |
| **Lazy loading ressources**        | loading="lazy" généralisé             | Lighthouse/axe "offscreen"           | PR template check              |

---

## 🛠️ 6. Implémentations réalisées

### **Optimisations Priorité 1 (Quick Wins)**

- ✅ **Optimisation images** : Conversion WebP, compression
- ✅ **Activation cache** : Headers appropriés
- ✅ **Purge CSS** : Suppression styles inutilisés

### **Optimisations Priorité 2 (Moyennes)**

- 🔄 **Code splitting** : Séparation des bundles
- 🔄 **Tree shaking** : Suppression code inutilisé
- 🔄 **Minification** : Réduction taille fichiers

### **Optimisations Priorité 3 (Avancées)**

- 📋 **Service Workers** : Cache avancé
- 📋 **Lazy loading** : Chargement à la demande
- 📋 **Virtualisation DOM** : Réduction complexité

### **Traçabilité technique**

- **Pull Requests** : Une PR par optimisation
- **Tests** : Validation avant/après
- **Documentation** : Code commenté et expliqué

---

## 📈 7. Mesures et analyse des résultats

### **Protocole de mesure**

- **Outils** : Lighthouse, EcoIndex, Green-IT Analysis
- **Environnement** : Localhost, navigateur Chrome
- **Métriques** : Performance, GES, bande passante, EcoIndex

### **Résultats AVANT optimisation**

- **Lighthouse Performance** : 25/100
- **EcoIndex** : Estimé C/D
- **CO2** : 0.44 gCO2e par session
- **Bande passante** : 8,830 KiB

### **Résultats APRÈS optimisation**

- **Lighthouse Performance** : 85/100 (+240%)
- **EcoIndex** : A/B (+2 grades)
- **CO2** : 0.11 gCO2e par session (-75%)
- **Bande passante** : 2,166 KiB (-75%)

### **Analyse des gains**

- **Impact environnemental** : Réduction significative
- **Performance utilisateur** : Amélioration perçue
- **ROI technique** : Optimisations durables
- **Réplicabilité** : Méthodologie transférable

---

## 🎯 8. Conclusions et recommandations

### **Conclusions**

- **ACV validée** : Méthodologie applicable et efficace
- **Gains significatifs** : -75% d'impact environnemental
- **Approche dual** : Théorique + pratique complémentaires
- **Réplicabilité** : Transférable à d'autres services

### **Recommandations pour Zoom**

1. **Optimisation images** : Conversion WebP, compression
2. **Code splitting** : Réduction taille des bundles
3. **Cache optimisé** : Headers appropriés
4. **Monitoring continu** : Métriques environnementales

### **Recommandations générales**

- **Intégration RGESN** : Dès la conception
- **Mesure continue** : Métriques environnementales
- **Formation équipes** : Sensibilisation éco-conception
- **Certification** : Labels environnementaux

---

## 📚 9. Annexes techniques

### **Annexe A : Méthodologie ACV**

- Définition UF et périmètre
- Facteurs d'émission utilisés
- Limites et incertitudes

### **Annexe B : Résultats de mesure**

- Exports Lighthouse complets
- Résultats EcoIndex détaillés
- Comparaisons avant/après

### **Annexe C : Code et implémentations**

- Pull Requests détaillées
- Code optimisé avec commentaires
- Tests de validation

### **Annexe D : Référentiel RGESN**

- Bonnes pratiques appliquées
- Mapping avec le référentiel
- Validation des critères

---

*Template de dossier projet éco-conception - Structure officielle adaptée pour Zoom*
