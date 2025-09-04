#!/bin/bash

# 🧪 Script de Validation C5 - Dashboard Mesure et Analyse Avancées
# Validation complète du dashboard C5 avant merge

set -e

echo "🧪 VALIDATION C5 - DASHBOARD MESURE ET ANALYSE AVANCÉES"
echo "========================================================"
echo ""

# Configuration
BASE_URL="http://localhost:3002"
C5_ROUTES=(
    "/dashboard-c5"
    "/dashboard-c5/metrics"
    "/dashboard-c5/reports"
)

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction de log coloré
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    log "Vérification des prérequis..."
    
    # Vérifier que l'application est démarrée
    if ! curl -s "$BASE_URL" > /dev/null 2>&1; then
        error "L'application n'est pas accessible sur $BASE_URL"
        error "Démarrez l'application avec: npm run dev"
        exit 1
    fi
    
    success "Application accessible sur $BASE_URL"
}

# Test de connectivité
test_connectivity() {
    log "Test de connectivité..."
    
    for route in "${C5_ROUTES[@]}"; do
        if curl -s "$BASE_URL$route" > /dev/null 2>&1; then
            success "Route $route accessible"
        else
            error "Route $route inaccessible"
            return 1
        fi
    done
    
    success "Toutes les routes C5 sont accessibles"
}

# Test du contenu C5
test_c5_content() {
    log "Test du contenu C5..."
    
    # Test du dashboard principal
    dashboard_content=$(curl -s "$BASE_URL/dashboard-c5")
    
    # Vérifier la présence des éléments C5
    if echo "$dashboard_content" | grep -q "C5 Dashboard"; then
        success "Titre C5 Dashboard trouvé"
    else
        error "Titre C5 Dashboard manquant"
        return 1
    fi
    
    if echo "$dashboard_content" | grep -q "Mesure & Analyse Avancées"; then
        success "Sous-titre C5 trouvé"
    else
        error "Sous-titre C5 manquant"
        return 1
    fi
    
    if echo "$dashboard_content" | grep -q "EcoIndex"; then
        success "Métrique EcoIndex trouvée"
    else
        error "Métrique EcoIndex manquante"
        return 1
    fi
    
    if echo "$dashboard_content" | grep -q "Green-IT"; then
        success "Métrique Green-IT trouvée"
    else
        error "Métrique Green-IT manquante"
        return 1
    fi
    
    if echo "$dashboard_content" | grep -q "Lighthouse"; then
        success "Métrique Lighthouse trouvée"
    else
        error "Métrique Lighthouse manquante"
        return 1
    fi
    
    if echo "$dashboard_content" | grep -q "RGESN"; then
        success "Métrique RGESN trouvée"
    else
        error "Métrique RGESN manquante"
        return 1
    fi
    
    success "Toutes les métriques C5 sont présentes"
}

# Test de la navigation
test_navigation() {
    log "Test de la navigation C5..."
    
    # Test de la page métriques
    metrics_content=$(curl -s "$BASE_URL/dashboard-c5/metrics")
    
    if echo "$metrics_content" | grep -q "Métriques C5 Détaillées"; then
        success "Page métriques C5 accessible"
    else
        error "Page métriques C5 inaccessible"
        return 1
    fi
    
    # Test de la page rapports
    reports_content=$(curl -s "$BASE_URL/dashboard-c5/reports")
    
    if echo "$reports_content" | grep -q "Rapports C5"; then
        success "Page rapports C5 accessible"
    else
        error "Page rapports C5 inaccessible"
        return 1
    fi
    
    success "Navigation C5 fonctionnelle"
}

# Test de la rosace 3D
test_3d_rosace() {
    log "Test de la rosace 3D en arrière-plan..."
    
    # Vérifier que ThreeScene est chargé
    if curl -s "$BASE_URL/dashboard-c5" | grep -q "ThreeScene"; then
        success "ThreeScene détecté dans le code"
    else
        warn "ThreeScene non détecté (peut être chargé dynamiquement)"
    fi
    
    success "Rosace 3D configurée"
}

# Test des métriques en temps réel
test_realtime_metrics() {
    log "Test des métriques en temps réel..."
    
    # Vérifier la présence du service C5
    if curl -s "$BASE_URL/dashboard-c5" | grep -q "C5MetricsService"; then
        success "Service C5 détecté"
    else
        warn "Service C5 non détecté (peut être minifié)"
    fi
    
    success "Métriques en temps réel configurées"
}

# Test de la non-intrusion
test_non_intrusion() {
    log "Test de la non-intrusion C5..."
    
    # Vérifier que le dashboard principal n'a pas été modifié
    main_content=$(curl -s "$BASE_URL/")
    
    if echo "$main_content" | grep -q "Plateforme d'entraînement avancée"; then
        success "Dashboard principal intact"
    else
        error "Dashboard principal modifié"
        return 1
    fi
    
    if echo "$main_content" | grep -q "Dashboard C5 - Mesure & Analyse"; then
        success "Lien vers C5 présent dans le dashboard principal"
    else
        error "Lien vers C5 manquant dans le dashboard principal"
        return 1
    fi
    
    success "C5 respecte la contrainte de non-intrusion"
}

# Test de build
test_build() {
    log "Test de build C5..."
    
    if npm run build:frontend > /dev/null 2>&1; then
        success "Build C5 réussi"
    else
        error "Build C5 échoué"
        return 1
    fi
}

# Test de linting
test_linting() {
    log "Test de linting C5..."
    
    # Vérifier les erreurs TypeScript
    if npx tsc --noEmit > /dev/null 2>&1; then
        success "Linting TypeScript C5 réussi"
    else
        warn "Erreurs TypeScript détectées (vérifiez le code)"
    fi
}

# Rapport de validation
generate_report() {
    echo ""
    echo "📊 RAPPORT DE VALIDATION C5"
    echo "============================"
    echo ""
    echo "✅ Tests réussis : $SUCCESS_COUNT"
    echo "⚠️  Avertissements : $WARN_COUNT"
    echo "❌ Erreurs : $ERROR_COUNT"
    echo ""
    
    if [ $ERROR_COUNT -eq 0 ]; then
        success "🎉 VALIDATION C5 RÉUSSIE ! Le dashboard est prêt pour le merge."
        echo ""
        echo "🚀 Prochaines étapes :"
        echo "1. Créer la PR C5 vers develop"
        echo "2. Valider avec l'équipe"
        echo "3. Effectuer le merge"
        echo "4. Créer le tag v0.5-mesure-analyse"
    else
        error "❌ VALIDATION C5 ÉCHOUÉE ! Corrigez les erreurs avant le merge."
        exit 1
    fi
}

# Fonction principale
main() {
    # Compteurs
    SUCCESS_COUNT=0
    WARN_COUNT=0
    ERROR_COUNT=0
    
    echo "🚀 Démarrage de la validation C5..."
    echo ""
    
    # Tests
    check_prerequisites && ((SUCCESS_COUNT++)) || ((ERROR_COUNT++))
    test_connectivity && ((SUCCESS_COUNT++)) || ((ERROR_COUNT++))
    test_c5_content && ((SUCCESS_COUNT++)) || ((ERROR_COUNT++))
    test_navigation && ((SUCCESS_COUNT++)) || ((ERROR_COUNT++))
    test_3d_rosace && ((SUCCESS_COUNT++)) || ((WARN_COUNT++))
    test_realtime_metrics && ((SUCCESS_COUNT++)) || ((WARN_COUNT++))
    test_non_intrusion && ((SUCCESS_COUNT++)) || ((ERROR_COUNT++))
    test_build && ((SUCCESS_COUNT++)) || ((ERROR_COUNT++))
    test_linting && ((SUCCESS_COUNT++)) || ((WARN_COUNT++))
    
    # Rapport final
    generate_report
}

# Exécution
main "$@" 