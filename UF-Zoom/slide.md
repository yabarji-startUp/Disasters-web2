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

## Cadrage d'un service numérique responsable
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
<br><br>

### **![2](https://icongr.am/material/numeric-2-circle.svg?color=d5103b) Analyse & Solution**
- Analyse de Cycle de Vie (ACV)  
- Architecture éco-responsable  
- Bonnes pratiques RGESN  
<br><br>

### **![3](https://icongr.am/material/numeric-3-circle.svg?color=d5103b) Organisation & Planning**
- Structure des équipes (9 équipes)  
- Roadmap 6 mois - Development  
- Roadmap 6 mois - Marketing  

</div>

<div>

### **![4](https://icongr.am/material/numeric-4-circle.svg?color=d5103b) Actions & Métriques**
- Actions par équipe - Development  
- Actions par équipe - Marketing  
- KPIs et métriques environnementaux  
- KPIs techniques & business  
<br><br>

### **![5](https://icongr.am/material/numeric-5-circle.svg?color=d5103b) Budget & Coordination**
- Budget et ROI (340k€)  
- Coordination Development & Marketing  
- Système de feedback  
<br><br>

### **![6](https://icongr.am/material/numeric-6-circle.svg?color=d5103b) Objectifs & Conclusion**
- Objectifs & résultats attendus  
- Conclusion et prochaines étapes  
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
- **2/3 de l'impact** = fabrication des équipements
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
<div class="metric-value">9%</div>
<div class="metric-label">Croissance annuelle impact</div>
</div>

</div>

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

# ✨ **Bonnes pratiques concrètes**
<br>

## **Mise en œuvre dans notre projet Zoom**

<div class="two-columns">

<div>

### **Optimisations Techniques**
- 📦 **Réduire le poids** des pages & images
- 🔌 **Minimiser les requêtes** serveur
- 🧹 **Supprimer le superflu** dans le code
- 🔄 **Favoriser la réutilisation** et la modularité
<br><br>

### **Mesures et Outils**
- 📊 **EcoIndex** : Score environnemental
- 🌱 **GreenIT Analysis** : Audit complet
- 📈 **Lighthouse** : Performance web
- 🎯 **RGESN** : Référentiel français

</div>

<div>

<div class="metric">
<div class="metric-value">85/100</div>
<div class="metric-label">Score EcoIndex cible</div>
</div>
<br>

<div class="result">
<div class="result-value">Objectif atteignable</div>
<div class="metric-label">Avec nos optimisations</div>
</div>

</div>

</div>

---

<!--
header: ""
-->

<!-- _class: lead -->

![2 w:256 h:256](https://icongr.am/material/numeric-2-circle.svg?color=2e7d32)

# Analyse & Solution

---

<!--
header: "![2](https://icongr.am/material/numeric-2-circle.svg?color=d5103b) Analyse & Solution"
-->

# 🎯 **Problématique**
<br>

## **Le défi environnemental des visioconférences**


<div class="two-columns">

<div>

### **Impact actuel de Zoom**
- **2.3 kg CO2/jour** par session
- **Consommation énergétique élevée**
- **Bande passante excessive**
- **Ressources système non optimisées**

</div>

<div>

### **Notre ambition**
- **Réduction de 30%** de l'empreinte carbone
- **Optimisation énergétique** < 2.5 kWh/heure
- **Bande passante réduite** de 40%
- **Score EcoIndex** > 85/100

</div>

</div>

---

# 📊 **Analyse de Cycle de Vie (ACV)**
<br>

## **Répartition de l'impact environnemental**


<div class="chart-container">

| Phase | Impact | Consommation | Actions principales |
|-------|--------|--------------|-------------------|
| **Conception** | 5% | 2 kWh/jour | Choix technologiques éco-responsables |
| **Développement** | 25% | 15 kWh/jour | Implémentation des optimisations |
| **Exploitation** | 65% | 50 kWh/jour | Déploiement sur infrastructure verte |
| **Fin de vie** | 5% | 1 kWh/jour | Gestion responsable des ressources |

</div>

<br>

<div class="metric">
<div class="metric-value">2.3 kg CO2/jour</div>
<div class="metric-label">Empreinte carbone totale</div>
</div>

---

# 🛠️ **Solution Proposée**
<br>

## **Architecture éco-responsable**


<div class="two-columns">

<div>

### **Optimisations Frontend**
- **Compression des ressources** (gzip/brotli)
- **Lazy loading** des composants
- **Code splitting** intelligent
- **Cache optimisé** (HTTP/Service Worker)
<br>

### **Optimisations Backend**
- **API RESTful** optimisées
- **Compression vidéo** adaptative
- **Cache Redis** pour les données
- **CDN** éco-responsable

</div>

<div>

### **Bonnes Pratiques RGESN**
- **RGESN 1.1** : Optimiser les ressources
- **RGESN 1.2** : Optimiser le chargement
- **RGESN 2.1** : Optimiser les images/vidéos
- **RGESN 3.1** : Optimiser le cache
- **RGESN 4.1** : Optimiser les API

</div>

</div>

---

<!--
header: ""
-->

<!-- _class: lead -->

![3 w:256 h:256](https://icongr.am/material/numeric-3-circle.svg?color=2e7d32)

# Organisation & Planning

---

<!--
header: "![3](https://icongr.am/material/numeric-3-circle.svg?color=d5103b) Organisation & Planning"
-->

# 🗺️ **Structure des Équipes**
<br>

## **Organisation par spécialités**

<div class="two-columns">

<div>

### 🛠️ **Development Team (5 équipes)**
- **UI/UX Team :** Design sobre, accessibilité, animation
- **Frontend Team :** Code interface, optimisation JS, compression
- **Backend Team :** Réglages serveur, vidéo/audio, timeout
- **Testing Team :** QA, tests de performance, A/B test
- **DevOps Team :** Infrastructure, CI/CD, monitoring

</div>

<div>

### 📢 **Marketing Team (4 équipes)**
- **KPI & ACV :** Suivi indicateurs, mesure d'impact environnemental
- **Content Team :** Communication interne, onboarding, blog
- **Growth Team :** Adoption utilisateurs, A/B testing, analytics
- **Pilotage projet :** Coordination transverse, planning, restitution

</div>

</div>
<br>

<div class="metric">
<div class="metric-value">9 équipes</div>
<div class="metric-label">Total spécialisées</div>
</div>

---

# 🗓️ **Roadmap 6 Mois - Development**
<br>
<br>
<br>

## **Planning détaillé par mois**

<div class="chart-container">

| Mois | Action de mise en œuvre | Mesure d'impact | Activité support |
|------|------------------------|-----------------|------------------|
| **M1** | Audit complet système | Setup EcoIndex | Formation équipes |
| **M2** | Optimisation frontend | Dashboard temps réel | Documentation technique |
| **M3** | Optimisation backend | KPIs serveur | Formation admin |
| **M4** | Optimisation vidéo | KPIs bande passante | Formation vidéo |
| **M5** | Infrastructure green | KPIs énergie | Formation monitoring |
| **M6** | Tests & optimisation finale | Validation EcoIndex | Formation finale |

</div>

---

# 🗓️ **Roadmap 6 Mois - Marketing**
<br>
<br>
<br>

## **Planning détaillé par mois**

<div class="chart-container">

| Mois | Action de mise en œuvre | Mesure d'impact | Activité support |
|------|------------------------|-----------------|------------------|
| **M1** | Définition KPIs éco | Setup dashboard | Création baseline |
| **M2** | Communication projet | Création documentation | Formation équipes |
| **M3** | Alignement objectifs | Planning détaillé | Formation PO éco |
| **M4** | Mesure impact vidéo | KPIs bande passante | Formation vidéo |
| **M5** | Mesure impact infrastructure | KPIs énergie | Formation monitoring |
| **M6** | Mesure impact final | KPIs globaux | Formation finale |

</div>

---

<!--
header: ""
-->

<!-- _class: lead -->

![4 w:256 h:256](https://icongr.am/material/numeric-4-circle.svg?color=2e7d32)

# Actions & Métriques

---

<!--
header: "![4](https://icongr.am/material/numeric-4-circle.svg?color=d5103b) Actions & Métriques"
-->

# 📊 **KPIs et Métriques**
<br>

## **Indicateurs de performance environnementaux**

<div class="three-columns">

<div class="metric">
<div class="metric-value">-30%</div>
<div class="metric-label">Réduction CO2 vs Zoom</div>
</div>

<div class="metric">
<div class="metric-value">< 2.5</div>
<div class="metric-label">kWh/heure d'utilisation</div>
</div>

<div class="metric">
<div class="metric-value">-40%</div>
<div class="metric-label">Bande passante utilisée</div>
</div>

</div>
<br>

<div class="result">
<div class="result-value">Score EcoIndex : 85/100</div>
<div class="metric-label">Objectif atteint avec marge</div>
</div>

---

# 🎯 **KPIs Techniques & Business**
<br>
<br>


## **Indicateurs complémentaires**


<div class="two-columns">

<div>

### **KPIs Techniques**
- **Latence :** < 150ms
- **Qualité vidéo :** Adaptative 360p-1080p
- **Concurrence :** 100+ participants
- **Disponibilité :** 99.9%

</div>

<div>

### **KPIs Business**
- **ROI environnemental :** Mesurable
- **Différenciation :** Avantage éco
- **Adoption :** Croissance organique
- **Satisfaction :** > 4.5/5

</div>

</div>
<br>

<div class="metric">
<div class="metric-value">340k€</div>
<div class="metric-label">Budget total sur 6 mois</div>
</div>

---

<!--
header: ""
-->

<!-- _class: lead -->

![5 w:256 h:256](https://icongr.am/material/numeric-5-circle.svg?color=2e7d32)

# Budget & Coordination

<!--
header: "![5](https://icongr.am/material/numeric-5-circle.svg?color=d5103b) Budget & Coordination"
-->

---

# 💰 **Budget et ROI**
<br>
<br>

## **Investissement responsable**

<div class="chart-container">

| Équipe | Budget | % Total | Responsabilités |
|--------|--------|---------|-----------------|
| **Backend Team** | 66k€ | 19% | API, vidéo/audio, hébergement |
| **Frontend Team** | 47k€ | 14% | Optimisation JS, compression |
| **UI/UX Team** | 40k€ | 12% | Design sobre, accessibilité |
| **Testing Team** | 40k€ | 12% | QA, tests performance |
| **DevOps Team** | 45k€ | 13% | Infrastructure, CI/CD |
| **KPI & ACV** | 29k€ | 9% | Métriques environnementales |
| **Growth Team** | 32k€ | 9% | Adoption utilisateurs, analytics |
| **Content Team** | 23k€ | 7% | Communication, documentation |
| **Pilotage projet** | 18k€ | 5% | Coordination, planning |
| **Total** | **340k€** | **100%** | **Projet complet** |
</div>

<br>

### **ROI Environnemental**
- **Réduction CO2 :** 30% par heure de visioconférence
- **Économies énergétiques :** 40% sur la bande passante
- **Impact utilisateur :** 1M utilisateurs = 150 tonnes CO2 économisées/an

---

# 🔄 **Coordination Development & Marketing**
<br>
<br>
<br>

## **Points de Synchronisation Mensuels**

<div class="chart-container">

| Mois | Development | Marketing | Coordination |
|------|-------------|-----------|--------------|
| **M1** | 🏗️ Architecture validée | 📊 KPIs définis | 🎯 Alignement objectifs |
| **M2** | 🎨 Interface optimisée | 📱 Onboarding prêt | 👥 Test utilisateurs |
| **M3** | 🔧 Backend optimisé | 📝 Documentation | 📊 Mesures alignées |
| **M4** | 🎬 Vidéo optimisée | 📱 Communication mobile | 📈 Adoption mesurée |
| **M5** | 🌱 Infrastructure green | 🎥 Tutoriels créés | 🧪 Tests A/B coordonnés |
| **M6** | ✅ Optimisation finale | 🎉 Communication résultats | 🏆 Validation globale |
</div>

<br>

### **Réunions Hebdomadaires**
- **Lundi :** Review KPIs environnementaux par équipe
- **Mercredi :** Review KPIs techniques et performance
- **Vendredi :** Planning actions suivantes et coordination

---

# 🔄 **Système de Feedback**
<br>

## **Monitoring et amélioration continue**

<div class="two-columns">

<div>

### **Métriques Techniques**
- **Performance :** Temps de chargement, bande passante
- **Ressources :** CPU, RAM, GPU utilisation
- **Qualité :** Score EcoIndex, métriques RGESN
<br><br>

### **Métriques Business**
- **Adoption :** Taux d'utilisation des fonctionnalités
- **Satisfaction :** Feedback utilisateurs
- **Impact :** Réduction CO2 mesurée

</div>

<div>

### **Mécanismes de Feedback**
- **Dashboard temps réel** pour les équipes
- **Alertes automatiques** sur les seuils
- **Rapports mensuels** d'impact environnemental
- **Ajustements itératifs** basés sur les données

</div>

</div>

---

<!--
header: ""
-->

<!-- _class: lead -->

![6 w:256 h:256](https://icongr.am/material/numeric-6-circle.svg?color=2e7d32)

# Objectifs & Conclusion

---

<!--
header: "![6](https://icongr.am/material/numeric-6-circle.svg?color=d5103b) Objectifs & Conclusion"
-->

# 🎯 **Objectifs & Résultats Attendus**
<br>
<br>

## **Impact environnemental mesurable**

<div class="quote-highlight">
"Réduire l'empreinte carbone des visioconférences de 30% tout en maintenant une expérience utilisateur optimale"
</div>

<div class="three-columns">

<div class="objective">
<div class="objective-title">Réduction CO2</div>
-30% vs Zoom actuel
</div>

<div class="objective">
<div class="objective-title">Efficacité énergétique</div>
< 2.5 kWh/heure
</div>

<div class="objective">
<div class="objective-title">Score environnemental</div>
A+ (85/100 EcoIndex)
</div>

</div>

---

# 🚀 **Conclusion**
<br>
<br>

## **Valeur ajoutée et prochaines étapes**

<div class="two-columns">

<div>

### **Valeur ajoutée**
- **Impact environnemental** mesurable et significatif
- **Expérience utilisateur** préservée voire améliorée
- **Modèle économique** viable et durable
- **Réplicabilité** sur d'autres services numériques
<br><br>

### **Innovation**
- **Première application** de RGESN à grande échelle
- **Méthodologie** reproductible pour l'éco-conception
- **Benchmark** pour l'industrie des visioconférences

</div>

<div>

### **Prochaines étapes**
- **Validation technique** des optimisations
- **Tests utilisateurs** sur prototypes
- **Partnerships** avec hébergeurs verts
- **Déploiement progressif** avec monitoring

</div>

</div>

<br>

<div class="result">
<div class="result-value">Prêt pour le développement responsable !</div>
</div>

---

<!-- _class: cover -->

<br><br><br><br>
<br><br><br><br>

# 🙏 **Questions & Discussion**

## **Merci pour votre attention**

### **Contact & Ressources**

<br><br><br><br>
<br><br><br><br>

- **Dépôt Git :** [Lien vers le projet](https://github.com/yabarji-startUp/Disasters-web/)
- **Documentation complète :** UF_Zoom/
- **Métriques détaillées :** Fichiers Excel ACV 