# PRD-011 : Micro-SaaS Workspace Shell & Layout Déterministe

## 1. Contexte & Problématique
Pour éviter de réinventer l'enveloppe applicative pour chacun des 75 services, nous devons fournir un conteneur d'atelier universel (`MicroSaaSWorkspace`) inspiré du studio interactif de Jack Roberts.

## 2. Objectifs & Exigences Techniques
* Implémenter le conteneur plein écran ou responsive canvas `<MicroSaaSWorkspace />` :
  - **TopBar de Pilotage :**
    * Titre du service et référence canonique (ex: `1.1-2 : Renouvellement EAD`).
    * Stepper ou badge d'état (`Brouillon`, `En revue Zod`, `Prêt pour génération`).
    * Bouton "Fermer l'atelier" (retour doux au hub).
    * Indicateur de sauvegarde automatique ("Enregistré localement il y a 2s").
  - **Zone Centrale (Canvas de Travail) :** Vue active du livrable (Formulaire interactif, Tableur de trésorerie, ou Page CV ATS).
  - **Panneau Latéral Rétractable (`SideStudioDrawer`) :** Panneau à onglets (ex: `Données`, `Pièces justificatives`, `Assistant IA`) animé par `motion/react`.
* Gestion responsive : le panneau latéral devient un drawer basculant sur mobile et tablette.

## 3. Composants Cibles
Fichiers cibles :
* `src/components/workspace/MicroSaaSWorkspace.tsx`
* `src/components/workspace/WorkspaceTopBar.tsx`
* `src/components/workspace/SideStudioDrawer.tsx`

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/workspace/shell.test.tsx`
* Le conteneur se charge avec les données initiales du service passé en paramètre.
* Le clic sur le bouton de fermeture démonte proprement l'atelier sans fuite de mémoire.
* Le panneau latéral s'ouvre et se ferme avec une animation fluide à 60 fps sans masquer les zones de saisie obligatoires.


## 5. Ownership Boundary
Owns: layout shell, TopBar, canvas slot, drawer et lifecycle visuel. Must not own: state métier des archétypes ou persistence.

## 6. Consumed / Published Contracts
Consomme PRD-016 `WorkspacePluginContract` et PRD-015 pour statut de session. Publie les slots/context nécessaires aux plugins.

## 7. Parallel Development Gate
Doit être testable avec `FakeWorkspacePlugin`; aucun import direct de 012/013/014. Budget UI local cible ~16 ms par interaction lorsque mesurable, plutôt que promesse littérale `0 ms`.

Tests: responsive, accessibilité, close propre, plugin absent/failure boundary.