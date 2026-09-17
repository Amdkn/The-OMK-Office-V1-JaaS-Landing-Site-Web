# PRD-032 — Persistence, Recovery & Failure Engineering

## Mission
Garantir qu’aucune panne locale, migration ou indisponibilité réseau ne corrompt silencieusement CMS ou sessions workspace.

## Scope propriétaire
- migrations/versioning persistence
- corruption detection et recovery
- retry/backoff/idempotence du sync
- gestion quota/IndexedDB indisponible
- tests crash/reload/offline
- isolation `omk:cms:*` vs `omk:workspace:*`

## Scénarios obligatoires
1. IndexedDB indisponible
2. envelope corrompu
3. ancien schema à migrer
4. quota storage dépassé
5. fermeture/reload pendant écriture
6. sync distant indisponible puis retour réseau
7. retry sans duplication
8. client A/B et service A/B restent isolés

## États contractuels
`local_saved`, `sync_pending`, `synced`, `sync_unavailable`, `recovery_required`.

## Ne possède pas
- contrats métier
- UI métier hors états d’erreur nécessaires
- auth

## Gate
Aucune perte silencieuse de données dans les scénarios supportés; recovery explicite et testée.