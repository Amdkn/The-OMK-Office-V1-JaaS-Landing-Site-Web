# PRD-016 : Workspace Archetype Plugin Contract

## 1. Contexte & Mission
Permettre le développement parallèle des 3 archétypes (012 Dossier Builder, 013 Cash Matrix, 014 Career Studio) sans qu'aucun d'eux n'ait besoin de modifier le shell `MicroSaaSWorkspace` (PRD-011).

## 2. Ownership Boundary
* **Owns :**
  - `src/types/workspacePlugin.ts`
  - `src/components/workspace/ArchetypeRegistry.ts`
* **Must Not Modify :**
  - Les vues individuelles des archétypes (PRD-012, 013, 014)
  - Le router de service (PRD-010)

## 3. Interface de Plugin Contractuelle
```typescript
export interface IWorkspaceArchetypePlugin {
  archetypeId: 'dossier_builder' | 'cash_matrix' | 'career_studio';
  renderWorkspace: (props: { serviceId: string; onComplete?: () => void }) => React.ReactElement;
  renderSideDrawer?: (props: { serviceId: string }) => React.ReactElement;
  validateData: (serviceId: string) => { isValid: boolean; errors: string[] };
}
```

## 4. Parallel Development Gate
* Jules travaillant sur 012, 013 ou 014 n'a besoin d'importer que `IWorkspaceArchetypePlugin` et d'exporter une constante conforme.
* Le shell 011 consomme ce plugin via le registre dynamique sans imports cycliques.
