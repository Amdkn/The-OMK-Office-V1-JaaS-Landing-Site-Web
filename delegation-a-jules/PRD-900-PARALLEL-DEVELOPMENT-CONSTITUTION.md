# PRD-900 : Constitution Suprême de Parallélisation & Contrat d'Intégration Jules

## 1. Mandat & Portée
Ce document est la loi souveraine d'orchestration pour tout agent de développement Jules opérant sur le dépôt.
Il interdit formellement les modifications sauvages de code en dehors du périmètre strict alloué à chaque PRD et définit la matrice de propriété (Ownership Matrix), les fixtures contractuelles, et les conditions de merge.

## 2. DAG de Dépendances Déterministe
```text
                 PRD-000
                    │
              PRD-006 / 007
              ┌─────┴─────┐
           PRD-001       PRD-002
              │
           PRD-003
              │
           PRD-005
              │
             010
              │
             011
              │
             016
          ┌───┼───┐
         012 013 014
          └───┼───┘
             015
              │
             017
              │
             020
              │
             026
        ┌─────┼─────┐
       021   022   023
        └─────┼─────┘
             025
              │
             024 (Plugin Commercial Transverse)
```

## 3. Matrice de Propriété & Fichiers Réservés (Ownership Matrix)
| PRD | Propriété Exclusif (Owns) | Fichiers Interdits (Must Not Touch) |
| :--- | :--- | :--- |
| **000** | `src/types/cms.ts`, `src/schemas/cms.schema.ts` | Stores, Vues, Composants UI |
| **006/007** | Contrats publics CMS & Migrations | Implémentations UI |
| **001** | `src/stores/cms.store.ts` | `src/types/cms.ts`, Composants UI |
| **002** | `src/lib/cms/pathResolver.ts`, `src/components/cms/ContextDrawer.tsx` | Store central, Schemas Zod |
| **003** | `src/components/cms/CmsRepeater.tsx`, `src/components/cms/CmsField.tsx` | Store central |
| **005** | `src/lib/cms/indexedDbAdapter.ts`, `server/routes/cmsSync.ts` | Store workspace |
| **010** | `src/hooks/useServiceLauncher.ts` | Composants Micro-SaaS |
| **011** | `src/components/workspace/MicroSaaSWorkspace.tsx` | Templates métiers (012, 013, 014) |
| **016** | `src/types/workspacePlugin.ts` | Implémentations spécifiques |
| **012** | `src/components/workspace/templates/DossierBuilderView.tsx` | Shell workspace, Cash, Career |
| **013** | `src/components/workspace/templates/CashMatrixView.tsx` | Dossier builder, Career |
| **014** | `src/components/workspace/templates/CareerStudioView.tsx` | Dossier builder, Cash |
| **015/017** | `src/stores/workspace.store.ts`, `src/lib/workspace/sessionStorage.ts` | Store CMS (001, 005) |
| **020** | `src/lib/services/specializationRegistry.ts` | Données brutes des 75 services (025) |
| **025** | `src/config/services75.compiled.ts` | Registry Engine (020) |
| **026** | Contrat de Plugin de Spécialisation | Données brutes des 75 services |

## 4. Budgets de Performance & Réalisme d'Ingénierie
* Remplacement des claims binaires « 0 ms » ou « 60 fps » par des budgets mesurables :
  - **Latence d'interaction locale :** Temps de réponse `< 16 ms` pour préserver le rafraîchissement à l'écran sans drop de frame.
  - **Accès dictionnaire :** Complexité algorithmique garantie en $O(1)$.
  - **Rerenders :** Zéro re-render sur les éléments frères lors de l'édition d'une propriété atomique.

## 5. Règles de Merge & Dérivation de Branche
1. **Une PR = Un PRD unique.** Zéro bundle sauvage de plusieurs PRD.
2. Tout travail doit être testé contre les interfaces gelées (`Consumed Contracts`) et les fixtures mockées fournies dans `tests/fixtures/`.
3. Interdiction absolue d'ajouter des dépendances NPM non validées sans ADR.
