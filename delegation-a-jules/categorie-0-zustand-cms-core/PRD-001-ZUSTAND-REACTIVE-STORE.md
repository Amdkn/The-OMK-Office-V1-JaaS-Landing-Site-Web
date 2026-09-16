# PRD-001 : Zustand Reactive Store & Topological Engine

## 1. Contexte & Problématique
Pour atteindre 0 ms de latence et éliminer les re-renders intempestifs sur des arbres de données profonds, le store ne doit pas stocker un arbre JSON imbriqué récursif, mais un **dictionnaire normalisé à plat** `byId: Record<string, EngramNode>` combiné aux listes d'adjacence `childrenIds`.

## 2. Objectifs & Exigences Techniques
* Implémenter le store central `useCmsStore` avec Zustand.
* Toutes les opérations de lecture par ID doivent s'exécuter en **$O(1)$**.
* Fournir des actions atomiques et pures :
  - `addNode(node: EngramNode, parentId?: string)`
  - `updateNodeProperties(id: string, properties: Record<string, any>)`
  - `moveNode(id: string, newParentId: string | null, index?: number)`
  - `deleteNodeTree(id: string)` (suppression en cascade de tous les descendants sans fuite de mémoire).
* Historique en RAM : intégration de l'action `undo()` et `redo()` pour l'édition en direct.

## 3. Architecture du Store
Fichier cible : `src/stores/cms.store.ts`

```typescript
interface CmsStoreState {
  nodes: Record<string, EngramNode>;
  rootIds: string[];
  activeNodeId: string | null;
  history: {
    past: Array<Record<string, EngramNode>>;
    future: Array<Record<string, EngramNode>>;
  };
  
  // Actions
  addNode: (node: Omit<EngramNode, 'childrenIds'>, parentId?: string | null) => void;
  updateNodeProperties: (id: string, properties: Partial<Record<string, any>>) => void;
  moveNode: (id: string, targetParentId: string | null, targetIndex?: number) => void;
  deleteNodeTree: (id: string) => void;
  setActiveNodeId: (id: string | null) => void;
  undo: () => void;
  redo: () => void;
}
```

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/cms/store.test.ts`
* `addNode` insère le nœud dans `nodes` et met à jour les `childrenIds` du parent.
* `moveNode` déplace un service d'un pôle à un autre sans corrompre l'ordre des autres enfants.
* `deleteNodeTree` supprime récursivement les enfants et nettoie les identifiants orphelins.
* `undo` restaure l'état exact des nœuds avant la dernière mutation.
