# PRD-004 : Split-Screen 7D & Volet de Secrétariat Visuel

## 1. Contexte & Problématique
Les services administratifs et juridiques complexes (75 services d'OMK Office) créent une surcharge cognitive lorsqu'ils sont présentés sous forme de formulaires froids. Le secrétariat visuel 7D résout ce problème en introduisant une disposition en écran scindé (Split-Screen) avec un agent d'accueil narratif (Mannequin 3D / vidéo d'onboarding) guidant l'utilisateur étape par étape.

## 2. Objectifs & Exigences Techniques
* Implémenter le layout `<SplitScreenLayout>` :
  - **Volet Gauche (60s d'onboarding) :** Lecteur vidéo optimisé avec avatar statutaire et transcription synchronisée issue de NotebookLM.
  - **Volet Droit (Action déterministe) :** Formulaire ou fiche de service rendu via le Repeater et les champs Zod.
* Synchronisation temporelle : la vidéo émet des balises d'horodatage (`timeupdate`) pour illuminer le champ actif correspondant à droite.
* Responsive : sur mobile, basculement fluide de l'écran scindé vers un mode accordéon ou tiroir rétractable.

## 3. Composants Cibles
Fichiers cibles :
* `src/components/cms/SplitScreenLayout.tsx`
* `src/components/cms/VisualSecretaryPlayer.tsx`

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/cms/splitScreen.test.tsx`
* Le volet vidéo charge la ressource associée au champ `visualSecretary.videoId` du nœud actif.
* L'événement de fin de vidéo déclenche automatiquement le focus sur le premier champ requis du formulaire.
* L'adaptation responsive passe sous les 768px sans cassure visuelle.


## 5. Ownership Boundary
Owns: expérience split-screen/7D Secretary et adaptation visuelle. Must not own: store CMS, persistence, règles métier ou provider IA.

## 6. Consumed / Published Contracts
Consomme selectors/actions publics 001-003. Publie composants UI et callbacks, sans exposer l'état interne du CMS.

## 7. Parallel Development Gate
Développable contre fixtures et mocks. Les animations utilisent un budget mesurable; `60 fps` est une cible de rendu, pas une garantie absolue sur tout matériel.

Tests: montage/démontage, focus clavier, responsive, aucune mutation hors callbacks publics.