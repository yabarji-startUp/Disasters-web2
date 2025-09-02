# 📋 C1 - Méthodologie ACV Simplifiée

## 🎯 Compétence C1 : Conduire une ACV simplifiée d'un service numérique

### **Unité Fonctionnelle (UF)**
**"Participer à une formation éco-conception via la plateforme disaster-web2"**

### **Contexte du projet**
Disaster-web2 est une plateforme de formation à l'éco-conception web conçue pour l'apprentissage de l'optimisation des performances et de l'impact environnemental des applications web.

---

## 📊 Méthodologie ACV Simplifiée

### **1. Définition du périmètre**

#### **Frontend (React + TypeScript)**
- **Composants** : Dashboard de monitoring, animations 3D, métriques temps réel
- **Technologies** : React 18, Vite, Tailwind CSS, Three.js
- **Ressources** : Images, CSS, JavaScript, données JSON

#### **Backend (Express.js)**
- **API** : Métriques serveur, payload volumineux, cache
- **Technologies** : Node.js, Express, compression, sécurité
- **Ressources** : CPU, mémoire, bande passante

#### **Infrastructure**
- **Développement** : Local (localhost:3000)
- **Données** : Fichiers statiques, JSON volumineux
- **Monitoring** : Métriques temps réel

### **2. Phases du cycle de vie analysées**

#### **Phase 1 : Développement**
- **Activités** : Codage, tests, build
- **Ressources** : Énergie développeur, serveur de développement
- **Impacts** : Consommation électrique, émissions CO2

#### **Phase 2 : Déploiement**
- **Activités** : Build production, déploiement
- **Ressources** : Serveur de build, bande passante
- **Impacts** : Énergie serveur, transfert de données

#### **Phase 3 : Utilisation**
- **Activités** : Formation, monitoring, interactions
- **Ressources** : Serveur production, navigateur utilisateur
- **Impacts** : Énergie client/serveur, bande passante

#### **Phase 4 : Fin de vie**
- **Activités** : Maintenance, mise à jour, obsolescence
- **Ressources** : Serveur, stockage, bande passante
- **Impacts** : Énergie continue, émissions CO2

### **3. Métriques d'impact environnemental**

#### **Indicateurs directs**
- **Consommation électrique** : kWh par session
- **Émissions CO2** : gCO2e par utilisation
- **Bande passante** : MB transférés
- **Ressources serveur** : CPU, RAM, stockage

#### **Indicateurs proxy**
- **Lighthouse Performance** : Score 0-100
- **Temps de chargement** : Millisecondes
- **Taille des ressources** : Kilobytes
- **Complexité DOM** : Nombre d'objets

### **4. Données et sources**

#### **Données primaires (mesurées)**
- **Métriques internes** : Dashboard disaster-web2
- **Lighthouse** : Audit performance complet
- **Monitoring serveur** : CPU, mémoire, RPS

#### **Données secondaires (estimées)**
- **Facteurs d'émission** : Base Carbone ADEME
- **Consommation électrique** : Standards serveur
- **Impact réseau** : Facteurs de transmission

### **5. Limites et incertitudes**

#### **Limites méthodologiques**
- **Périmètre simplifié** : Focus sur l'utilisation
- **Données proxy** : Lighthouse comme indicateur EcoIndex
- **Facteurs d'émission** : Valeurs moyennes

#### **Incertitudes**
- **Variabilité réseau** : ±20% sur bande passante
- **Hétérogénéité clients** : ±30% sur consommation
- **Facteurs d'émission** : ±15% sur CO2

---

## 🎯 Objectifs de l'ACV

### **1. Identifier les hotspots**
- **Composants critiques** : Plus gros impact environnemental
- **Phases critiques** : Plus gros impact par phase
- **Optimisations prioritaires** : Plus gros gain potentiel

### **2. Quantifier les impacts**
- **Baseline** : Impact actuel mesuré
- **Cibles** : Objectifs de réduction
- **Gains** : Améliorations attendues

### **3. Prioriser les actions**
- **Impact élevé, effort faible** : Quick wins
- **Impact élevé, effort moyen** : Optimisations majeures
- **Impact moyen, effort élevé** : Optimisations avancées

---

## 📈 Méthode de calcul

### **Formule ACV simplifiée**
```
Impact = (Ressources × Facteur_émission) + (Bande_passante × Facteur_réseau)
```

### **Facteurs d'émission utilisés**
- **Électricité serveur** : 0.5 kgCO2e/kWh
- **Électricité client** : 0.1 kgCO2e/kWh
- **Réseau** : 0.05 kgCO2e/GB

### **Normalisation par UF**
```
Impact_par_UF = Impact_total / Nombre_utilisations
```

---

## 🔄 Processus d'analyse

### **Étape 1 : Mesure baseline**
1. Démarrer l'application
2. Mesurer avec Lighthouse
3. Capturer métriques internes
4. Calculer impact initial

### **Étape 2 : Identification hotspots**
1. Analyser par composant
2. Analyser par phase
3. Identifier optimisations
4. Prioriser actions

### **Étape 3 : Optimisation**
1. Implémenter optimisations
2. Mesurer gains
3. Valider améliorations
4. Documenter résultats

### **Étape 4 : Validation**
1. Comparer avant/après
2. Calculer gains
3. Analyser incertitudes
4. Rédiger rapport

---

*Méthodologie ACV simplifiée pour disaster-web2 - Compétence C1* 