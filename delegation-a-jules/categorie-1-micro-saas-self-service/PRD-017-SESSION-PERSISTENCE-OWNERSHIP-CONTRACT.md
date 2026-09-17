# PRD-017 : Session & Workspace Persistence Ownership Contract

## 1. Contexte & Mission
Établir une frontière étanche entre la persistance du CMS (PRD-005 : catalogue des services, pages, métadonnées partagées) et la persistance des sessions de travail client (PRD-015 : données de formulaire saisies, brouillons, uploads).

## 2. Ownership Boundary
* **Owns :**
  - `src/contracts/persistenceOwnership.ts`
* **Règle Fondamentale :**
  - **Base CMS (Store 001/005) :** Clé IndexedDB `omk_cms_catalog`. Accessible en lecture seule par le client, écriture réservée admin.
  - **Base Session Client (Store 015) :** Clé IndexedDB `omk_client_sessions`. Scellée par `${clientId}:${serviceId}`.

## 3. Critères d'Acceptation
* Une réinitialisation du catalogue CMS n'écrase jamais les données d'un dossier client en cours.
* Un vidage de cache client n'altère pas les nœuds canoniques du catalogue.
