# PRD-007 : CMS Schema Versioning & Migration Contract

## 1. Contexte & Mission
Empêcher que l'introduction d'un nouveau champ dans `EngramNode` par un travail futur ne corrompe l'arbre existant stocké en RAM ou IndexedDB.

## 2. Ownership Boundary
* **Owns :**
  - `src/schemas/cmsMigration.ts`
  - `src/schemas/versions/`
* **Must Not Modify :**
  - Moteur de persistance (PRD-005)

## 3. Spécifications Techniques
* Numérotation sémantique du schéma : `SCHEMA_VERSION = "1.0.0"`.
* Pipeline de migration déterministe en entrée :
  ```typescript
  export function migrateEngramNode(rawNode: unknown): EngramNode;
  ```
* En cas de schéma obsolète ou non reconnu, application de valeurs par défaut saines avec émission d'un warning sans rupture de service.

## 4. Parallel Development Gate
* Fixtures de test avec nœuds v0.9.0 et v1.0.0 validant la rétrocompatibilité sous `tests/fixtures/legacyNodes.json`.
