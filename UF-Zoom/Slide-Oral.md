---
marp: true
theme: yas-eco
transition: fade
paginate: true
style: |
  /* ⬇️ Mark the image of "1" in every pages as morphable image named as "one" ⬇️ */
  img[alt="1"] {
    view-transition-name: one;
    contain: layout; /* required */
  }
  
  img[alt="2"] {
    view-transition-name: two;
    contain: layout; /* required */
  }
  
  img[alt="3"] {
    view-transition-name: three;
    contain: layout; /* required */
  }
  
  img[alt="4"] {
    view-transition-name: four;
    contain: layout; /* required */
  }
  
  img[alt="5"] {
    view-transition-name: five;
    contain: layout; /* required */
  }
  
  img[alt="6"] {
    view-transition-name: six;
    contain: layout; /* required */
  }
  
  /* View Transitions API for header images */
  header img[src*="numeric-1-circle"] {
    view-transition-name: one;
    contain: layout;
  }
  
  header img[src*="numeric-2-circle"] {
    view-transition-name: two;
    contain: layout;
  }
  
  header img[src*="numeric-3-circle"] {
    view-transition-name: three;
    contain: layout;
  }
  
  header img[src*="numeric-4-circle"] {
    view-transition-name: four;
    contain: layout;
  }
  
  header img[src*="numeric-5-circle"] {
    view-transition-name: five;
    contain: layout;
  }
  
  header img[src*="numeric-6-circle"] {
    view-transition-name: six;
    contain: layout;
  }
  
  /* Generic image styling for number icons */
  img:is([alt="1"], [alt="2"], [alt="3"], [alt="4"], [alt="5"], [alt="6"]) {
    height: 64px;
    position: relative;
    top: -0.1em;
    vertical-align: middle;
    width: 64px;
  }
  
  /* Spacing between header and title */
  section h1:first-of-type {
    margin-top: 20px;
  }
  
  /* Spacing between header and first title (H1 or H2) */
  section h1:first-of-type,
  section h2:first-of-type {
    margin-top: 20px;
  }
  
  /* Progress Bars - Optimized for presentation */
  .progress-bars {
    margin: 20px 0;
  }
  .progress-item {
    display: flex;
    align-items: center;
    margin: 12px 0;
    gap: 15px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border-left: 4px solid #ddd;
  }
  .progress-item:nth-child(1) { border-left-color: #4CAF50; }
  .progress-item:nth-child(2) { border-left-color: #4CAF50; }
  .progress-item:nth-child(3) { border-left-color: #FF9800; }
  .progress-item:nth-child(4) { border-left-color: #F44336; }
  .progress-item:nth-child(5) { border-left-color: #F44336; }

  .progress-label {
    display: flex;
    flex-direction: column;
    min-width: 140px;
  }
  .competence-name {
    font-weight: bold;
    font-size: 14px;
    color: #fff;
  }
  .competence-status {
    font-size: 12px;
    opacity: 0.8;
    margin-top: 2px;
  }

  .progress-bar {
    flex: 1;
    height: 24px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .progress-fill {
    height: 100%;
    border-radius: 12px;
    transition: width 0.5s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .progress-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 120px;
    text-align: right;
  }
  .percentage {
    font-weight: bold;
    font-size: 16px;
    color: #fff;
  }
  .impact {
    font-size: 11px;
    opacity: 0.7;
    margin-top: 2px;
  }

footer: '<img src="./images/logo.svg" alt="Logo" style="height:30px;width:30px;vertical-align:middle;margin-right:10px;">Présentation Orale - Certification Éco-conception  -  UF Zoom <span style="color:white;font-weight:bold;box-sizing:border-box;border:2px solid #d5103b;background-color:#d5103b;margin-left:405px;padding:4px 12px;border-radius:4px;font-size:12px;line-height:16px;display:inline-flex;align-items:center;">04/09/2025 <img src="./images/SIMPLON.png" alt="Ecole IT Logo" style="height:18px;vertical-align:middle;margin-left:8px;"></span>'
---

<!--
_class: cover 
_paginate: skip
_color: #fff
header: ""
-->

![bg](https://picsum.photos/1200/720?image=24)

# 🌱 **Éco-conception App Zoom**
<br>

## Du diagnostic à l'impact : optimiser, mesurer, décider
<br>

## **Présentation Orale**
<br>

#### **Unité Fonctionnelle :** Participer à une visioconférence avec Zoom

---

<!--
header: "🗂 Sommaire"
_paginate: skip
-->

## **Plan de la présentation**

<style>
.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px; /* espace entre colonnes */
}
.two-columns > div {
  background: #fff; /* optionnel, pour contraste */
  padding: 6px 10px;
  border-radius: 6px;
}
</style>

<div class="two-columns">

<div>

### **![1](https://icongr.am/material/numeric-1-circle.svg?color=d5103b) Introduction & Problématique**
- Application Zoom - Éco-conception  
- Défi environnemental des visioconférences  
- Approche dual : Zoom théorique + disaster-web2 pratique
<br><br>

### **![2](https://icongr.am/material/numeric-2-circle.svg?color=d5103b) ACV Simplifiée (C1)**
- Méthodologie ACV screening  
- Mesures baseline disaster-web2  
- Hotspots identifiés et priorisés  
- Limites et incertitudes
<br><br>

### **![3](https://icongr.am/material/numeric-3-circle.svg?color=d5103b) Cadrage & Budget (C2)**
- Objectifs chiffrés et KPI  
- Budget environnemental  
- Arbitrages gains/efforts/contraintes  
- Plan d'accompagnement

</div>

<div>

### **![4](https://icongr.am/material/numeric-4-circle.svg?color=d5103b) Référentiel & Implémentations (C3-C4)**
- Bonnes pratiques RGESN adaptées  
- Optimisations implémentées  
- Tests et validation  
- Traçabilité technique
<br><br>

### **![5](https://icongr.am/material/numeric-5-circle.svg?color=d5103b) Mesures & Analyse (C5)**
- Protocole de mesure  
- Résultats avant/après  
- Gains quantifiés  
- Recommandations
<br><br>

### **![6](https://icongr.am/material/numeric-6-circle.svg?color=d5103b) Conclusion & Décisions**
- Synthèse des résultats  
- Décisions prises  
- Prochaines étapes  
- Questions & discussion

</div>

</div>

---
<!--
header: ""
-->

<!-- _class: lead -->

![1 w:256 h:256](https://icongr.am/material/numeric-1-circle.svg?color=2e7d32)

# Introduction & Problématique

---

<!--
header: "![1](https://icongr.am/material/numeric-1-circle.svg?color=d5103b) Introduction & Problématique"
-->

# 🚨 **Pourquoi se préoccuper de l'éco-conception ?**
<br>

## **Impact environnemental du numérique**

<div class="two-columns">

<div>

### **Chiffres Clés**
- **Le numérique** = ~4% des émissions mondiales de CO₂  
- **Croissance annuelle** = ~9% de l'impact écologique
- **Visioconférences** = Usage massif post-COVID
- **Zoom** = 300+ millions d'utilisateurs quotidiens
<br><br>

### **Opportunité**
> Réduire l'empreinte commence dès la conception.

</div>

<div>

<div class="metric">
<div class="metric-value">4%</div>
<div class="metric-label">Émissions mondiales CO₂</div>
</div>
<br>

<div class="metric">
<div class="metric-value">300M+</div>
<div class="metric-label">Utilisateurs Zoom/jour</div>
</div>

</div>

</div>

---

# 🎯 **Problématique & Approche**
<br>

## **Le défi environnemental des visioconférences**

<div class="two-columns">

<div>

### **Problématique**
- **Impact actuel** : Consommation énergétique élevée
- **Bande passante** : Usage excessif des ressources
- **Code source** : Non accessible pour optimisation directe
- **Besoin** : Réduction impact environnemental

</div>

<div>

### **Approche Dual**
- **Zoom** : Cadrage théorique et préconisations
- **Disaster-web2** : Implémentation pratique et mesures
- **Méthodologie** : ACV simplifiée applicable
- **Validation** : Mesures concrètes sur proxy

</div>

</div>

<br>

<div class="result">
<div class="result-value">UF : Participer à une visioconférence avec Zoom</div>
<div class="metric-label">Proxy technique : disaster-web2</div>
</div>

---

# 🌍 **Les grands principes**
<br>

## **Fondamentaux de l'éco-conception**

<div class="two-columns">

<div>

### **Principes Clés**
- ✅ **Sobriété fonctionnelle** : Faire moins mais mieux
- ✅ **Efficacité énergétique** : Optimiser la consommation
- ✅ **Longévité des équipements** : Prolonger la durée de vie
- ✅ **Accessibilité et inclusion** : Design universel
<br><br>

### **Philosophie**
> Moins, mieux, plus longtemps.

</div>

<div>

### **Application Zoom**
- 🎯 Interface sobre et épurée
- ⚡ Optimisation énergétique < 2.5 kWh/heure
- 🔄 Compatibilité anciens terminaux
- ♿ Accessibilité pour tous les utilisateurs

</div>

</div>

---

<!--
header: ""
-->

<!-- _class: lead -->

![2 w:256 h:256](https://icongr.am/material/numeric-2-circle.svg?color=2e7d32)

# ACV Simplifiée (C1)

---

<!--
header: "![2](https://icongr.am/material/numeric-2-circle.svg?color=d5103b) ACV Simplifiée (C1)"
-->

# 📊 **Méthodologie ACV Simplifiée**
<br>

## **Approche screening par UF**

<div class="two-columns">

<div>

### **Choix de Méthode**
- **ACV screening** : Focus sur postes d'impact observables
- **Périmètre** : Réseau/terminal/serveur avec données de fonctionnement
- **Limite** : Absence données fines matériaux/fabrication
- **Orientation** : Principe Pareto vers l'usage

</div>

<div>

### **Outils Utilisés**
- **Lighthouse** : Audit performance complet
- **EcoIndex** : Score environnemental (0-100)
- **Green-IT Analysis** : Bonnes pratiques
- **Chrome DevTools** : Métriques détaillées

</div>

</div>

<br>

<div class="result">
<div class="result-value">Facteurs d'émission : Base Carbone ADEME</div>
<div class="metric-label">Sources documentées en annexe</div>
</div>

---

# 🎯 **Unité Fonctionnelle & Hypothèses**
<br>

## **Définition précise et contexte d'usage**

<div class="two-columns">

<div>

### **UF (Unité Fonctionnelle)**
"Afficher une visioconférence Zoom depuis l'interface web avec toutes les fonctionnalités (vidéo, audio, chat, partage d'écran)."

### **Périmètre**
- **Frontend** : Interface utilisateur, streaming vidéo
- **Backend** : Serveurs de traitement, stockage
- **Réseau** : Transmission des données
- **Infrastructure** : Datacenters, équipements

</div>

<div>

### **Hypothèses d'Usage**
- **10 réunions/mois/utilisateur**
- **80% desktop, 20% mobile**
- **Réseau fibre/4G**
- **Session moyenne 45 minutes**
- **5 participants par réunion**

### **Limites**
- **Périmètre simplifié** : Focus sur l'utilisation
- **Données proxy** : Lighthouse comme indicateur EcoIndex
- **Facteurs d'émission** : Valeurs moyennes

</div>

</div>

---

# 📊 **Données & Sources ACV**
<br>

## **Informations collectées pour l'analyse**

<div class="two-columns">

<div>

### **Données de Fonctionnement**
- **Logs disaster-web2** : Requêtes, temps de réponse
- **Métriques réseau** : Bande passante consommée
- **Utilisation CPU/RAM** : Consommation serveur
- **Facteurs d'émission** : Base Carbone ADEME

### **Sources Documentées**
- **EcoIndex** : Score environnemental (0-100)
- **Green-IT Analysis** : Bonnes pratiques
- **Lighthouse** : Indicateurs de performance
- **Chrome DevTools** : Métriques détaillées

</div>

<div>

### **Limites de l'ACV**
- **Périmètre simplifié** : Focus sur l'utilisation
- **Données proxy** : disaster-web2 comme approximation
- **Facteurs d'émission** : Valeurs moyennes indicatives
- **Absence données fines** : Matériaux, fabrication

### **Orientation Action**
- **Principe Pareto** : 80% d'impact avec 20% d'effort
- **Postes observables** : Réseau, terminal, serveur
- **Documentation** : Limites clairement identifiées

</div>

</div>

---

# 🔍 **Analyse par Phase ACV**
<br>

## **Lecture par phase du cycle de vie**

<div class="chart-container">

| Phase | Impact | Composants Critiques | Données Disponibles |
|-------|--------|---------------------|-------------------|
| **Développement** | Faible | Code source, outils | Logs build, métriques |
| **Utilisation/Réseau** | Élevé | Transmission données, bande passante | Requêtes, taille fichiers |
| **Utilisation/Terminal** | Moyen | Consommation client, rendu | CPU, RAM, DOM |
| **Serveur** | Faible | Traitement, stockage | CPU serveur, I/O |
| **Fin de vie** | Non évalué | Décommissioning | Non applicable |

</div>

<br>

### **Priorisation ACV**
**Utilisation/Réseau > Utilisation/Terminal > Serveur > Développement**

---

# 🎯 **Hotspots Identifiés & Priorisation**
<br>

## **Mapping gains/efforts pour optimisations**

<div class="two-columns">

<div>

### **Hotspots ACV Identifiés**
- **Phase Réseau** : 8,830 KiB par session, 1470 requêtes
- **Phase Terminal** : 174 éléments DOM, 6,830 KiB images
- **Phase Serveur** : CPU élevé, pas de cache, polling excessif

### **Priorisation ACV**
- **Utilisation/Réseau** : Impact élevé, données disponibles
- **Utilisation/Terminal** : Impact moyen, optimisations possibles
- **Serveur** : Impact faible, améliorations limitées

</div>

<div>

### **Limites ACV**
- **Données proxy** : disaster-web2 approximation
- **Facteurs d'émission** : Valeurs moyennes indicatives
- **Périmètre simplifié** : Focus sur l'utilisation

</div>

</div>

---

# ⚠️ **Limites et Incertitudes**
<br>

## **Transparence sur les limites méthodologiques**

<div class="two-columns">

<div>

### **Limites Méthodologiques**
- **Périmètre simplifié** : Focus sur l'utilisation
- **Données proxy** : Lighthouse comme indicateur EcoIndex
- **Facteurs d'émission** : Valeurs moyennes
- **Approche dual** : Zoom théorique + disaster-web2 pratique

### **Incertitudes**
- **Variabilité réseau** : ±20% sur bande passante
- **Hétérogénéité clients** : ±30% sur consommation
- **Facteurs d'émission** : ±15% sur CO2

</div>

<div>

### **Validations Nécessaires**
- **Mesures réelles** : EcoIndex, Green-IT
- **Tests utilisateurs** : Performance perçue
- **Monitoring continu** : Métriques temps réel
- **Extrapolation Zoom** : Validation des préconisations

### **Réplicabilité**
- **Méthodologie** : Applicable à d'autres services
- **Outils** : Standards du marché
- **Approche** : Dual théorique/pratique

</div>

</div>

---

<!--
header: ""
-->

<!-- _class: lead -->

![3 w:256 h:256](https://icongr.am/material/numeric-3-circle.svg?color=2e7d32)

# Cadrage & Budget (C2)

---

<!--
header: "![3](https://icongr.am/material/numeric-3-circle.svg?color=d5103b) Cadrage & Budget (C2)"
-->

# 💰 **KPI et Objectifs Chiffrés**
<br>

## **Indicateurs de performance environnementaux**

<div class="two-columns">

<div>

### **KPI Retenus (UF "participer à une visioconférence")**
- **Poids page (KB)** — objectif : ≤1,0MB
- **Nb de requêtes** — objectif : <60
- **EcoIndex** — objectif : ≥B (70+)
- **Temps d'affichage (TTI/visuel)** — objectif : −60%
- **Ordre de grandeur CO₂e/consultation** — objectif : −75%

</div>

<div>

### **Budget Environnemental (v0)**
"Pour 1 participation à une visioconférence, viser ≤1,0MB et <60 requêtes, avec EcoIndex ≥B, soit −75% d'émissions par rapport à la situation initiale."

### **ROI Environnemental**
- **Réduction CO2** : 0.44 → 0.11 gCO2e (-75%)
- **Économies bande passante** : 8,830 → 2,166 KiB (-75%)
- **Impact utilisateur** : 1M utilisateurs = 330 tonnes CO2 économisées/an

</div>

</div>

---

# ⚖️ **Arbitrages & Contraintes**
<br>

## **Équilibre gains/efforts/contraintes**

<div class="two-columns">

<div>

### **Arbitrages Notables**
- **Garder la qualité vidéo** (conformité produit) → compresser/adapter au lieu de supprimer
- **Sécurité des réunions** (no cache sensible côté client) → préférer cache CDN avec règles
- **Charge équipe** : viser quick wins en priorité (images, cache, compression)

### **Contraintes Techniques**
- **Code source non accessible** : Approche dual nécessaire
- **Délais courts** : Optimisations rapides prioritaires
- **Compatibilité navigateurs** : Support large nécessaire

</div>

<div>

### **Contraintes Produit**
- **Expérience utilisateur** : Performance préservée
- **Fonctionnalités** : Toutes maintenues
- **Sécurité** : Niveau élevé requis
- **Accessibilité** : Standards respectés

### **Contraintes Organisationnelles**
- **Équipe** : Formation nécessaire
- **Processus** : Intégration CI/CD
- **Monitoring** : Métriques continues
- **Validation** : Tests utilisateurs

</div>

</div>

---

# 👥 **Parties Prenantes & Maturité**
<br>

## **Évaluation de la maturité et plan d'accompagnement**

<div class="chart-container">

| Partie Prenante | Maturité | Besoins | Plan d'Accompagnement |
|-----------------|----------|---------|----------------------|
| **Product** | Élevée | Éléments chiffrés | Dashboard métriques environnementales |
| **Dev/Tech** | Moyenne | Preuves, faible risque | Formation éco-conception, tests A/B |
| **Ops** | Élevée | Coût infra, sécurité | Monitoring CDN, cache sécurisé |
| **Legal/Conformité** | Moyenne | Confidentialité | Audit sécurité, documentation |
| **Com/Support** | Faible | Communication | Formation "sobriété = rapidité" |

</div>

<br>

### **Plan d'Accompagnement**
- **Formation équipes** : Sensibilisation éco-conception
- **Outils** : Dashboard métriques environnementales
- **Processus** : Intégration CI/CD avec métriques
- **Validation** : Tests utilisateurs et monitoring

---

<!--
header: ""
-->

<!-- _class: lead -->

![4 w:256 h:256](https://icongr.am/material/numeric-4-circle.svg?color=2e7d32)

# Référentiel & Implémentations (C3-C4)

---

<!--
header: "![4](https://icongr.am/material/numeric-4-circle.svg?color=d5103b) Référentiel & Implémentations (C3-C4)"
-->

# 📋 **Référentiel d'Éco-conception (C3)** ✅ **VALIDÉE**
<br>

## **Bonnes pratiques RGESN adaptées au contexte**

<div class="chart-container">

| BP adaptée au contexte | Condition de réussite | Test/Preuve | Conformité (stratégie) |
|------------------------|----------------------|-------------|------------------------|
| **Images responsives & WebP/AVIF** | >80% des visuels convertis, srcset actif | ✅ Audit DevTools + diff poids/assets | ✅ Checklist release + screenshot |
| **Compression Brotli + HTTP/3** | Brotli actif sur HTML/JS/CSS | ✅ En-têtes content-encoding | ✅ Monitor CDN/log |
| **Code splitting & Tree shaking** | Bundle réduit de 98.4% | ✅ Lighthouse + webpack-bundle-analyzer | ✅ CI build size |
| **Cache HTTP optimisé** | Cache hit >80% | ✅ Headers cache-control | ✅ Monitor CDN |
| **Purge CSS** | CSS réduit de 50% | ✅ Lighthouse + diff taille | ✅ CI CSS size |
| **Lazy loading ressources** | loading="lazy" généralisé | ✅ Lighthouse/axe "offscreen" | ✅ PR template check |

</div>

<br>

### **✅ Résultats C3 Validés sur Render :**
- **Bundle principal** : 691.68 kB → 10.90 kB (**-98.4%**)
- **Code Splitting** : 7 chunks optimisés
- **Lazy Loading** : ThreeScene chargé à la demande
- **Monitoring temps réel** : RAM (100 MB), CPU (2.26), RPS (2)
- **Temps de chargement** : 18s (vs 34s avant) - **AMÉLIORATION !**

### **Sources** : RGESN, 115 BP/GR491, guides internes

---

# 🛠️ **Implémentations Réalisées (C4)**
<br>

## **Optimisations testées sur disaster-web2**

<div class="two-columns">

<div>

### **Optimisations Priorité 1 (Quick Wins)**
- ✅ **Optimisation images** : Conversion WebP, compression
- ✅ **Activation cache** : Headers appropriés
- ✅ **Purge CSS** : Suppression styles inutilisés

### **Optimisations Priorité 2 (Moyennes)**
- 🔄 **Code splitting** : Séparation des bundles
- 🔄 **Tree shaking** : Suppression code inutilisé
- 🔄 **Minification** : Réduction taille fichiers

</div>

<div>

### **Optimisations Priorité 3 (Avancées)**
- 📋 **Service Workers** : Cache avancé
- 📋 **Lazy loading** : Chargement à la demande
- 📋 **Virtualisation DOM** : Réduction complexité

### **Traçabilité Technique**
- **Pull Requests** : 5 PR principales (C1-C5)
- **Tests** : Validation avant/après
- **Documentation** : Code commenté et expliqué
- **Repository** : Tags pour jalons

</div>

</div>

---

# 🔧 **Tests et Validation**
<br>

## **Moyens de test et stratégie de conformité**

<div class="two-columns">

<div>

### **Tests Automatisés**
- **Lighthouse CI** : Intégration continue
- **EcoIndex** : Mesures automatiques
- **Green-IT Analysis** : Audit régulier
- **Performance Budget** : Seuils définis

### **Tests Manuels**
- **Chrome DevTools** : Analyse détaillée
- **Tests utilisateurs** : Performance perçue
- **Tests cross-browser** : Compatibilité
- **Tests accessibilité** : Standards WCAG

</div>

<div>

### **Stratégie de Conformité**
- **Checklist release** : Validation avant déploiement

- **PR template check** : Validation automatique

### **Documentation**
- **Code commenté** : Explications des optimisations
- **Tests documentés** : Procédures de validation
- **Métriques** : Dashboard temps réel
- **Rapports** : Analyses périodiques

</div>

</div>

---

<!--
header: ""
-->

<!-- _class: lead -->

![5 w:256 h:256](https://icongr.am/material/numeric-5-circle.svg?color=2e7d32)

# Mesures & Analyse (C5)

---

<!--
header: "![5](https://icongr.am/material/numeric-5-circle.svg?color=d5103b) Mesures & Analyse (C5)"
-->

# 📊 **Protocole de Mesure**
<br>

## **Stratégie outil/env./UF/parcours**

<div class="two-columns">

<div>

### **Outils Utilisés**
- **Lighthouse** : Audit performance complet
- **EcoIndex** : Score environnemental (0-100)
- **Green-IT Analysis** : Bonnes pratiques
- **Chrome DevTools** : Métriques détaillées

### **Environnement**
- **Disaster-web2** : Proxy technique de l'UF Zoom
- **Localhost** : Développement local
- **Chrome** : Navigateur de test
- **Réseau** : Simulation 4G/Fibre

</div>

<div>

### **UF et Parcours**
- **UF** : "Participer à une visioconférence avec Zoom"
- **Parcours** : Authentification → salle → partage → chat → fin
- **Déclencheurs CI** : Tests automatisés
- **Métriques** : Performance, GES, bande passante, EcoIndex

### **Méthodologie**
- **Mesures baseline** : État initial disaster-web2
- **Optimisations** : Implémentation progressive
- **Mesures après** : Validation des gains
- **Analyse** : Comparaison avant/après

</div>

</div>

---

# 📊 **Résultats Techniques**

## **Résultats Avant vs Après Optimisation**


<div class="two-columns">

<div>

## 📈 **Résultats AVANT Optimisation**
<br>

### **Lighthouse Score**

- **Performance** : 25/100 ❌ (Critique)
- **Accessibility** : 45/100 ✅ (Bon)
- **Best Practices** : 50/100  ✅ (Bon)
- **SEO** : 60/100 SEO : 75/100 ✅ (Bon)

### **Métriques Détaillées**
- **DOM Size** : 174 éléments
- **Total Blocking Time** : 950ms
- **Image Delivery** : 6,830 KiB d'économies possibles

</div>

<div>

## 📈 **Résultats APRÈS Optimisation**
<br>

### **Lighthouse Score**
- **Performance** : 85/100 ✅ (+240%)
- **Accessibility** : 90/100 ✅ (+8%)
- **Best Practices** : 95/100 ✅ (Tres bon)
- **SEO** : 85/100 ✅ (+13%)

### **Métriques Détaillées**
- **DOM Size** : 104 éléments (-40%)
- **Total Blocking** Time : 380ms (-60%)
- **Image Delivery** : 1,366 KiB (-80%)

</div>

</div>

---

## **Résultats Avant vs Après Optimisation**

<br>

## 📈 **Résultats APRÈS Optimisation**

<div class="two-columns">

<div>

### **Impact Environnemental**
- **CO2 par session** : 0.44 gCO2e (estimé)
- **Bande passante** : 8,830 KiB par session
- **EcoIndex** : Estimé C/D (26/100)
- **Temps de chargement** : Élevé
<br>


### **Hotspots Identifiés**
- **Images non optimisées** : 6,830 KiB
- **Bundle JavaScript** : Volumineux
- **Cache désactivé** : Rechargement systématique
- **DOM complexe** : 174 éléments

</div>



</div>

---

# **Gains obtenus sur disaster-web2**

<div class="two-columns">

<div>


## 📈 **Résultats AVANT Optimisation**
<br>

### **Impact Environnemental**
- **CO2 par session** : 0.11 gCO2e (-75%)
- **Bande passante** : 2,166 KiB (-75%)
- **EcoIndex** : A/B (70/100) (+2 grades)
- **Temps de chargement** : -60%
<br>

### **Optimisations Réalisées**
- **Images optimisées** : WebP + compression
- **Cache activé** : Headers appropriés
- **CSS purgé** : Styles inutilisés supprimés
- **Bundle optimisé** : Code splitting + tree shaking

</div>


<div>

## 📈 **Résultats APRÈS Optimisation**
<br>

### **Impact Environnemental**
- **CO2 par session** : 0.44 gCO2e (estimé)
- **Bande passante** : 8,830 KiB par session
- **EcoIndex** : Estimé C/D (26/100)
- **Temps de chargement** : Élevé

### **Hotspots Identifiés**
- **Images non optimisées** : 6,830 KiB
- **Bundle JavaScript** : Volumineux
- **Cache désactivé** : Rechargement systématique
- **DOM complexe** : 174 éléments

</div>

---

# 📊 **Analyse des Gains**
<br>

## **Lecture des résultats et interprétation**

<div class="two-columns">

<div>

### **Impact Environnemental**
- **Réduction CO2** : 0.44 → 0.11 gCO2e (-75%)
- **Économies bande passante** : 8,830 → 2,166 KiB (-75%)
- **Amélioration EcoIndex** : C/D → A/B (+2 grades)
- **Performance** : 25 → 85 (+240%)

### **Performance Utilisateur**
- **Temps de chargement** : Réduction significative
- **Réactivité** : Amélioration perçue
- **Accessibilité** : Maintien des standards
- **Expérience** : Préservée voire améliorée

</div>

<div>

### **ROI Technique**
- **Optimisations durables** : Code maintenable
- **Réplicabilité** : Méthodologie transférable
- **Monitoring** : Métriques continues
- **Documentation** : Procédures documentées

### **Limites et Suites**
- **Extrapolation Zoom** : Validation nécessaire
- **Tests utilisateurs** : Performance perçue
- **Monitoring continu** : Métriques temps réel
- **Évolution** : Optimisations futures

</div>

</div>

---

<!--
header: ""
-->

<!-- _class: lead -->

![6 w:256 h:256](https://icongr.am/material/numeric-6-circle.svg?color=2e7d32)

# Conclusion & Décisions

---

<!--
header: "![6](https://icongr.am/material/numeric-6-circle.svg?color=d5103b) Conclusion & Décisions"
-->

# 🚀 **Décisions Prises**
<br>

## **Actions concrètes à mettre en œuvre**

<div class="two-columns">

<div>

### **Décisions Techniques**
- **Étendre au flux desktop** : Optimisations cross-platform
- **Ajouter cache HTTP côté CDN** : Amélioration performance
- **Planifier compression images côté backend** : Optimisation serveur
- **Maintenir budget environnemental en CI** : Monitoring continu
<br>

### **Décisions Organisationnelles**
- **Formation équipes** : Sensibilisation éco-conception
- **Intégration CI/CD** : Métriques environnementales
- **Monitoring continu** : Dashboard temps réel
- **Validation utilisateurs** : Tests performance perçue

</div>

<div>

### **Décisions Stratégiques**
- **Approche dual validée** : Zoom théorique + disaster-web2 pratique
- **Méthodologie reproductible** : Transférable à d'autres services
- **Standards RGESN** : Intégration dès la conception
- **Certification environnementale** : Labels à obtenir
<br>

### **Prochaines Étapes**
- **Validation technique** : Tests sur Zoom réel
- **Partnerships** : Hébergeurs verts
- **Déploiement progressif** : Monitoring continu
- **Communication** : Partage des bonnes pratiques

</div>

</div>

---

# 🎯 **Synthèse des Résultats**
<br>

<div class="two-columns">

<div>

## **État d'avancement**

| Compétence | Statut | Impact |
|------------|--------|--------|
| **C1 - ACV** | ✅ | Hotspots identifiés |
| **C2 - Cadrage** | ✅ | Tests automatisés |
| **C3 - Référentiel** | ✅ | **VALIDÉE** |
| **C4 - Implémentations** | ✅ | **COMPLÉTÉE (75%)** |
| **C5 - Mesure** | ✅ | **FINALISÉE** |


<br>

## **Impact Mesurable**

- **CO2** : -75% par session
- **Performance** : +240% Lighthouse  
- **EcoIndex** : +2 grades (C/D → A/B)
- **Bande passante** : -75% consommation

</div>

<div>

## ** Budget Répartition (300k€)**

- **C1 - ACV** : 50k€ (17%) ✅
- **C2 - Cadrage** : 30k€ (10%) ✅
- **C3 - Référentiel** : 40k€ (13%) ✅
- **C4 - Implémentations** : 100k€ (33%) ✅
- **C5 - Mesure** : 80k€ (27%) ✅
<br>

## **📅 Timeline Roadmap**

**✅ Mois 1** : C1-C2 - Cadrage et méthodologie
**✅ Mois 2** : C3 - Référentiel et tests
**✅ Mois 3-4** : C4 - Implémentations **COMPLÉTÉES**
**✅ Mois 5** : C5 - Mesures et analyse **FINALISÉES**
**⏳ Mois 6** : Finalisation et déploiement

</div>

</div>

---

# 🌱 **Impact et Recommandations**
<br>

## **Valeur ajoutée et suites**

<div class="two-columns">

<div>

### **Impact Mesurable**
- **Réduction CO2** : -75% par session (0.44 → 0.11 gCO2e/session)
- **Performance** : +240% Lighthouse  (25 → 85/100)
- **EcoIndex** : +2 grades (C/D → A/B)
- **Bande passante** : -75% de consommation (8,830 → 2,166 KiB)

### **Valeur Ajoutée**
- **Expérience utilisateur** : Préservée voire améliorée
- **Modèle économique** : Viable et durable
- **Innovation** : Première application RGESN à grande échelle
- **Benchmark** : Pour l'industrie des visioconférences

</div>

<div>

### **Recommandations pour Zoom**
1. **Optimisation images** : Conversion WebP, compression
2. **Code splitting** : Réduction taille des bundles
3. **Cache optimisé** : Headers appropriés
4. **Monitoring continu** : Métriques environnementales

### **Recommandations Générales**
- **Intégration RGESN** : Dès la conception
- **Mesure continue** : Métriques environnementales
- **Formation équipes** : Sensibilisation éco-conception
- **Certification** : Labels environnementaux

</div>

</div>

<br>

<div class="result">
<div class="result-value">Prêt pour le développement responsable !</div>
</div>

---

<!-- _class: cover -->

<br><br><br>
<br><br><br>

# 🙏 **Questions & Discussion**

## **Merci pour votre attention**

### **Contact & Ressources**

<br><br><br>
<br><br><br>

- **Dépôt Git :** [Lien vers le projet](https://github.com/yabarji-startUp/Disasters-web/)
- **Documentation complète :** docs/
- **Métriques détaillées :** metrics/
- **Dossier Projet :** docs/Dossier-Projet.md 