# PRD-030 — Test Harness & CI Quality Gate

## Mission
Rendre la validation du repository déterministe, reproductible et automatisable avant toute release.

## Scope propriétaire
- scripts `test`, `test:ci`, `typecheck`, `lint`, `build`
- configuration Vitest et environnement jsdom
- conversion des scripts d’assertion historiques en vraies suites Vitest
- pipeline CI obligatoire sur PR/main
- rapport de qualité machine-readable

## Ne possède pas
- logique métier CMS/workspace
- règles Legal/Finance/Career
- catalogue 75 services
- déploiement production

## Gates obligatoires
1. zéro fichier `*.test.*` sans suite Vitest valide
2. tests unitaires/contractuels tous verts
3. typecheck zéro erreur
4. build production PASS
5. lint réel distinct du typecheck
6. commandes locales et CI identiques
7. échec d’un gate bloque la merge/release

## Contrats publiés
`QUALITY_GATE_STATUS` = PASS | FAIL avec détails tests/typecheck/lint/build.