# PRD-016 : Workspace Archetype Plugin Contract

## 1. Mission
Découpler le shell PRD-011 des archétypes PRD-012/013/014 afin que quatre sessions Jules puissent les développer simultanément.

## 2. Ownership Boundary
Owns : interface d'un plugin workspace, registre d'archétypes et fixtures de contexte.

Fichiers cibles : `src/types/workspacePlugin.ts`, `src/lib/workspace/archetypeRegistry.ts`.

Must not modify : implémentation du shell 011, vues métier 012-014, registre des 75 services 020/025.

## 3. Published Contract
Un plugin expose au minimum : `id`, `canHandle(serviceConfig)`, `createInitialState(context)`, `render` ou composant racine typé, `validate(state)` et métadonnées de capabilities.

Le shell fournit un `WorkspaceContext` stable : `clientId`, `serviceId`, configuration de service, session, callbacks save/close et accès contrôlé au CMS.

## 4. Consumed Contracts
Consomme PRD-006 pour le CMS public et PRD-011 pour les slots du shell. PRD-012/013/014 consomment PRD-016 et ne s'importent jamais mutuellement.

## 5. Isolation
Chaque archétype possède son state métier. Aucun archétype ne stocke de state privé dans le shell global hors API prévue.

## 6. Parallel Development Gate
Fournir un `FakeWorkspacePlugin` et un `FakeWorkspaceContext`. PRD-011 doit pouvoir tester le shell avec le fake ; chaque archétype doit pouvoir tester son plugin sans le shell réel.

Contract tests :
- résolution d'un plugin par archetype ;
- fallback typé si plugin absent ;
- état initial déterministe ;
- fermeture/save via callbacks publics ;
- aucune dépendance circulaire shell <-> plugin.

## 7. Definition of Done
012, 013 et 014 peuvent être développés et testés dans trois branches indépendantes, puis enregistrés sans modification de leurs voisins.