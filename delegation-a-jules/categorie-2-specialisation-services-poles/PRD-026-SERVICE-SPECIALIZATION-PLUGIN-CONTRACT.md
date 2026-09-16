# PRD-026 : Service Specialization Plugin & Compiler Contract

## 1. Contexte & Mission
Éliminer le risque de collision entre `PRD-020` (Moteur de Registre) et `PRD-025` (Compilation des 75 configurations), et borner les contributions des pôles (021, 022, 023).

## 2. Ownership Boundary
* **PRD-020 Owns :** Moteur d'enregistrement, typage générique, fonctions d'injection `registerService()`, `getService()`.
* **PRD-026 Owns :** Le contrat d'interface `IServiceSpecializationPlugin`.
* **PRD-021, 022, 023 Owns :** Les packs de spécialisation par pôle respectif.
* **PRD-025 Owns :** Le fichier final compilé `services75.compiled.ts`.

## 3. Interface de Spécialisation Gelée
```typescript
export interface IServiceSpecializationPlugin {
  serviceId: string;
  poleCode: 1 | 2 | 3;
  subCategoryCode: string;
  zodValidationSchema: z.ZodTypeAny;
  defaultDataPayload: Record<string, unknown>;
  renderCustomPreview?: React.ComponentType<{ serviceId: string }>;
}
```

## 4. Parallel Development Gate
* Les contributeurs des pôles 1, 2 et 3 fournissent des plugins conformes sans jamais toucher au moteur de registre ni au compilateur 025.
