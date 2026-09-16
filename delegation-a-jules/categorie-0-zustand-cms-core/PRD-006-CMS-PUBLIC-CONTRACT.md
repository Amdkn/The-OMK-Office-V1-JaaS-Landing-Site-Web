# PRD-006 : CMS Public Contract & Ownership Boundaries

## 1. Contexte & Mission
Verrouiller les frontières de propriété et l'API publique que les catégories 1 et 2 consomment sans jamais modifier le substrat CMS.

## 2. Ownership Boundary
* **Owns :**
  - `src/contracts/cmsPublicApi.ts`
* **May Modify :**
  - Exports publics dans `src/types/cms.ts`
* **Must Not Modify :**
  - `src/stores/cms.store.ts` (Propriété exclusive de PRD-001)
  - Tout composant visuel ou vue de landing

## 3. Contrat d'API Publique Gelé (Published Contract)
```typescript
export interface ICmsPublicApi {
  getNodeById: (id: string) => EngramNode | undefined;
  getChildrenNodes: (parentId: string | null) => EngramNode[];
  mutateProperty: <T>(nodeId: string, propertyKey: string, value: T) => ValidationResult;
  subscribeToNode: (nodeId: string, callback: (node: EngramNode) => void) => () => void;
}
```

## 4. Tests & Parallel Development Gate
* Fournir le mock canonique `MockCmsPublicApi` sous `tests/mocks/cmsMock.ts`.
* Tout Jules travaillant sur Catégorie 1 ou 2 DOIT tester son code contre ce mock sans attendre la finalisation du store réel.
