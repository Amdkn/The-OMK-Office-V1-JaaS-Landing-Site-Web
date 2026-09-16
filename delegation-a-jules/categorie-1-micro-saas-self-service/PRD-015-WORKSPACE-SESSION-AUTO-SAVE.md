# PRD-015 : Workspace Session Auto-Save & Local-First Recovery

## 1. Contexte & Problématique
Un client qui remplit un dossier complexe ou personnalise un simulateur ne doit jamais perdre ses données en cas de fermeture accidentelle d'onglet ou de coupure réseau.

## 2. Objectifs & Exigences Techniques
* **Indexation par Session :** Les données de chaque micro-SaaS sont sauvegardées dans Zustand et indexées par la clé composite `${clientId}:${serviceId}`.
* **Persistance Débouncée (IndexedDB) :** Sauvegarde automatique toutes les 500 ms après la dernière frappe.
* **Indicateur Visuel de Sauvegarde :** Badge d'état dans la TopBar affichant dynamiquement :
  - `Sauvegarde en cours...`
  - `Enregistré localement (à 14:32)`
  - `Synchronisé`
* **Restauration Transparente :** À la réouverture du service par le client, l'atelier restaure exactement le dernier état saisi et la dernière étape active du wizard.

## 3. Modules Cibles
Fichiers cibles :
* `src/stores/workspace.store.ts`
* `src/lib/workspace/workspaceStorage.ts`

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/workspace/autoSave.test.ts`
* Les données saisies dans un atelier restent disponibles après un rechargement complet de page (`F5`).
* Deux services différents ouverts successivement par le même client conservent chacun leur propre état sans écrasement mutuel.
* Zéro appel API serveur requis pour garantir la persistance locale.


## 5. Ownership Boundary
Owns: session client/workspace, autosave, reprise et statut de sauvegarde. Must not own: snapshot CMS ou migration CMS.

## 6. Consumed / Published Contracts
Suit PRD-017 et namespace `omk:workspace:{clientId}:{serviceId}:*`. Publie session load/save/status au shell/plugins.

## 7. Parallel Development Gate
Le statut `Synchronisé` n'est affiché que si une sync réelle existe; sinon `local_saved`/`sync_unavailable`. Aucun backend requis pour reprise locale.

Tests: isolation clients/services, F5 recovery, debounce, corruption locale, absence d'écriture `omk:cms:*`.