# PRD-031 — End-to-End Integration & User Journeys

## Mission
Prouver que les Waves B→E fonctionnent ensemble comme produit complet, pas seulement comme modules isolés.

## Dépendance
Consomme PRD-030 et tous les contrats publics CMS/Workspace/Registry.

## Parcours obligatoires
1. visiteur → service → BookingModal
2. client authentifié → service → Micro-SaaS workspace
3. Legal → saisie → sauvegarde → reload → restauration
4. Finance → calculs déterministes → sauvegarde/restauration
5. Career → scoring ATS déterministe → sauvegarde/restauration
6. changement client/service → isolation stricte des sessions
7. catalogue 75 → chaque service résout un archetype valide
8. sync indisponible → UX contrôlée sans perte locale

## Scope propriétaire
- tests E2E et fixtures
- données synthétiques non sensibles
- harness navigateur
- matrice de parcours et résultats

## Ne possède pas
Aucun composant métier ne doit être réécrit pour faire passer un test. Tout défaut est renvoyé au PRD propriétaire.

## Gate
Tous les parcours critiques PASS sur build production/staging représentatif.