# PRD-035 — Observability, Health & Failure UX

## Mission
Rendre les défaillances détectables, corrélables et compréhensibles sans exposer de données sensibles.

## Scope propriétaire
- endpoint `/health` et readiness
- logs structurés serveur
- request/correlation ID
- error boundaries React
- taxonomie d’erreurs utilisateur
- métriques minimales de disponibilité et sync
- hooks de monitoring provider-agnostic

## États UX minimaux
- service unavailable
- sync unavailable
- validation failed
- authorization denied
- recovery required
- unexpected error avec correlation ID

## Gates obligatoires
1. chaque requête serveur traçable par correlation ID
2. health/readiness séparables si nécessaire
3. aucune donnée sensible dans logs/télémétrie
4. erreurs utilisateur actionnables, pas seulement console.log
5. panne provider externe n’empêche pas le fonctionnement déterministe principal
6. erreurs non gérées capturées par boundary/fallback

## Ne possède pas
- choix imposé d’un fournisseur APM
- authz métier
- règles réglementaires

## Gate
Scénarios de panne injectés observables et UX contrôlée, sans fuite de secret/PII.