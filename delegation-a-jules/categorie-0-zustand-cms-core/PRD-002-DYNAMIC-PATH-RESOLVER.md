# PRD-002 : Dynamic Path Resolver & Navigation Sans Bureau Émulé

## 1. Contexte & Problématique
Dans l'ancien modèle Desktop OS, naviguer dans une arborescence ouvrait des fenêtres superposées créant des collisions graphiques. Dans OMK Office, la navigation s'effectue via un résolveur dynamique de chemins (Path Resolver) qui projette le nœud actif dans une mise en page responsive fluide (Canvas, Slide-over Drawer et Breadcrumbs).

## 2. Objectifs & Exigences Techniques
* Résoudre l'état du CMS à partir des URLs : `/pole/:poleSlug/:serviceSlug/:stepSlug`.
* Calculer dynamiquement le fil d'Ariane (`BreadcrumbTrail`) en remontant récursivement la chaîne des `parentId` en $O(N)$ où $N \le 10$.
* Remplacer les modales fenêtrées par un composant `ContextDrawer` (tiroir coulissant animé par `motion/react`) pour l'affichage des détails d'un nœud sans masquer le contexte.

## 3. Composants Cibles
Fichiers cibles :
* `src/lib/cms/pathResolver.ts` : Fonctions pures de parsing et matching d'URL.
* `src/components/cms/BreadcrumbTrail.tsx` : Rendu du fil d'Ariane navigable.
* `src/components/cms/ContextDrawer.tsx` : Tiroir latéral animé pour édition/inspection de nœud.

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/cms/pathResolver.test.ts`
* Un chemin `/legal/omk-translate/visa-b2` sélectionne avec exactitude le nœud correspondant.
* Si un slug est inexistant, le résolveur renvoie un statut de fallback propre sans crash applicatif.
* Le fil d'Ariane génère les liens corrects pour chaque niveau de l'arborescence.
