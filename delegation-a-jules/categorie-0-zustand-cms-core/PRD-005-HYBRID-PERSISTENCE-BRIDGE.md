# PRD-005 : Pipeline de Persistance Hybride (IndexedDB & Pont SQLite)

## 1. Contexte & Problématique
Le store Zustand vit en mémoire vive (RAM). Pour garantir la pérennité des données en mode local-first et permettre l'intégration avec le Blackboard SQLite WAL d'A'Space OS (`Tech_OS` / `Life-OS-2026`), une couche de persistance et de synchronisation sans token est indispensable.

## 2. Objectifs & Exigences Techniques
* **Persistance Navigateur (IndexedDB) :** Sauvegarde asynchrone non-bloquante du dictionnaire des nœuds à chaque mutation via un debounce de 300 ms.
* **Restauration à Chaud :** Au chargement de l'application, hydration immédiate du store depuis IndexedDB avec fallback sur les fixtures canoniques.
* **Pont Export/Import SQLite :** Endpoint API local (`/api/cms/sync`) permettant d'exporter l'état complet en JSON scellé par une empreinte SHA-256.

## 3. Modules Cibles
Fichiers cibles :
* `src/lib/cms/indexedDbAdapter.ts`
* `src/lib/cms/syncBridge.ts`
* `server/routes/cmsSync.ts` (API Express du serveur port 3000)

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/cms/persistence.test.ts`
* Les données saisies dans le store sont récupérées à 100 % après rechargement de la page (IndexedDB).
* L'export génère un payload JSON avec signature SHA-256 valide.
* En cas de corruption des données locales, le système restaure l'état canonique sans planter.


## 5. Ownership Boundary
Owns: persistence/snapshots CMS et adaptateur de sync optionnel. Must not own: migrations (007) ni sessions workspace (015).

## 6. Consumed / Published Contracts
Consomme PRD-006/007. Publie hydrate/save/export/import CMS. Le namespace est `omk:cms:*` selon PRD-017.

## 7. Parallel Development Gate
Le Core fonctionne sans `/api/cms/sync`; cet endpoint est un adaptateur optionnel. Tests offline-first, corruption, migration avant hydration et absence d'écriture dans `omk:workspace:*`.

> Une indisponibilité backend ne bloque jamais l'édition locale.