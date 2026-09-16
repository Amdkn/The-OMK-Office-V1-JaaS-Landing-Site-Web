# PRD-007 : CMS Schema Versioning & Migration Contract

## 1. Mission
Permettre l'évolution du CMS sans casser les données IndexedDB, les exports scellés ou les workspaces développés en parallèle.

## 2. Ownership Boundary
Owns : version du schéma CMS, registre de migrations et tests de compatibilité.

Fichiers cibles : `src/lib/cms/schemaVersion.ts`, `src/lib/cms/migrations.ts`, `tests/cms/migrations.test.ts`.

Must not modify : logique métier des services, composants UI ou contenu des 75 configurations.

## 3. Published Contract
Tout snapshot persistant expose `schemaVersion` entier positif. Une migration est pure et déterministe : `migrate(snapshot, fromVersion, toVersion)`.

Aucune migration ne peut silencieusement supprimer une propriété inconnue. Une donnée non migrable retourne une erreur typée et conserve le snapshot source intact.

## 4. Consumed Contracts
Consomme PRD-006 pour les types publics et PRD-000 pour les invariants.

## 5. Persistence Boundary
PRD-005 transporte et hydrate les snapshots ; PRD-007 décide comment les transformer. PRD-005 ne possède aucune règle de migration.

PRD-015 possède les sessions workspace et utilise son propre namespace/version ; il ne doit pas réutiliser implicitement la version CMS.

## 6. Parallel Development Gate
Fixtures obligatoires : snapshot courant, snapshot N-1, snapshot contenant une propriété inconnue et snapshot invalide.

Tests :
- migration N-1 -> N déterministe ;
- migration répétée idempotente lorsque déjà à N ;
- absence de perte silencieuse ;
- rollback logique par conservation de la source ;
- hydration PRD-005 compatible avec le résultat migré.

## 7. Definition of Done
Le contrat est documenté, les fixtures sont exportables pour les autres PRD et aucun consommateur n'a besoin de connaître l'implémentation interne des migrations.