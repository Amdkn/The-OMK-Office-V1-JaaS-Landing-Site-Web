# PRD-017 : Session / CMS Persistence Ownership Contract

## 1. Mission
Éliminer le chevauchement entre PRD-005 (contenu CMS) et PRD-015 (session client workspace).

## 2. Ownership Boundary
PRD-005 owns : contenu CMS canonique, snapshots CMS, IndexedDB CMS, export/import du CMS et bridge optionnel local.

PRD-015 owns : progression utilisateur, state d'un atelier, étape active, brouillons et reprise par `${clientId}:${serviceId}`.

PRD-017 owns uniquement les namespaces, interfaces communes de stockage et règles de coexistence.

## 3. Namespaces obligatoires
- `omk:cms:*` réservé au PRD-005.
- `omk:workspace:{clientId}:{serviceId}:*` réservé au PRD-015.
- aucune écriture croisée entre namespaces.

## 4. Published Contract
Une abstraction `StorageEnvelope<T>` expose : `namespace`, `schemaVersion`, `updatedAt`, `payload`, `checksum?`.

La présence de `Synchronisé` dans PRD-015 ne signifie pas qu'un backend existe : le statut doit distinguer `local_saved`, `sync_pending`, `synced` et `sync_unavailable`.

## 5. Backend Boundary
Le Core PRD-000 reste backend-independent. `/api/cms/sync` de PRD-005 est un adaptateur optionnel ; son absence ne doit jamais empêcher l'édition ou la restauration locale.

## 6. Parallel Development Gate
Tests de coexistence :
- purge d'une session n'efface pas le CMS ;
- migration CMS n'altère pas les sessions ;
- deux services d'un client restent isolés ;
- deux clients restent isolés ;
- corruption d'un envelope retourne une erreur typée sans purge globale.

## 7. Definition of Done
PRD-005 et PRD-015 peuvent évoluer indépendamment et leurs adapters ne partagent aucune clé IndexedDB ambiguë.