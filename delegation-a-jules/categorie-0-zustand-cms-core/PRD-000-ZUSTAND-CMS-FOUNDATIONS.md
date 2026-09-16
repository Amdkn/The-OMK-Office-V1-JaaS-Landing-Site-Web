# PRD-000 : Zustand CMS Foundations & Formal Data Contracts

## 1. Contexte & Problématique
Les architectures CMS classiques imposent des schémas de base de données relationnelles rigides créant des cascades de requêtes lentes. Dans OMK Office, l'ensemble des données (services légaux, packs financiers, formulaires d'immigration, capsules d'onboarding) doit être représenté sous une primitive universelle et normalisée : l'**`EngramNode`**.

## 2. Objectifs & Exigences Techniques
* Définir les types TypeScript stricts et les schémas de validation **Zod** pour tous les types de nœuds.
* Garantir l'intégrité référentielle du graphe d'adjacence : tout `parentId` doit pointer vers un nœud existant ou être `null` (racine).
* Toute modification de propriété doit être validée par son schéma Zod avant d'être acceptée en mémoire.
* Zéro dépendance vers un backend ou un serveur externe.

## 3. Schémas & Types à Implémenter
Fichier cible : `src/types/cms.ts` et `src/schemas/cms.schema.ts`

```typescript
export type NodeType = 
  | 'pole'          // Pôle d'activité (Legal, Finance, Career...)
  | 'service'       // Service d'affaires (OMK Translate, Quick CashFlow...)
  | 'package'       // Pack commercial (Pack JOB ATS, Pack SARL...)
  | 'step'          // Étape de formulaire ou de workflow
  | 'field'         // Champ interactif (input Zod déterministe)
  | 'media_doc'     // Capsule d'onboarding vidéo 7D / Document juridique
  | 'repeater_item';// Élément de collection récursive

export interface EngramNode {
  id: string;
  parentId: string | null;
  childrenIds: string[];
  type: NodeType;
  slug: string;
  meta: {
    title: string;
    description: string;
    status: 'draft' | 'published' | 'archived';
    tags: string[];
    updatedAt: string;
  };
  properties: Record<string, any>;
  visualSecretary?: {
    videoId?: string;
    scriptSummary?: string;
    avatarStyle: 'mannequin_3d' | 'cinematic' | 'voice_only';
  };
  validationSchema?: string;
}
```

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/cms/schema.test.ts`
* Validation Zod stricte : un nœud sans `id`, `slug` ou `type` valide lève une exception descriptive.
* Test de validation des propriétés dynamiques (types strings, numbers, booleans, objets imbriqués).
* Test d'invariance : un nœud ne peut pas être son propre parent (`parentId !== id`).


## 5. Ownership Boundary
Owns: modèle conceptuel CMS, invariants de graphe et fondations local-first. Must not own: UI, persistence concrète, workspace client ou règles métier.

## 6. Consumed / Published Contracts
Publie le modèle conceptuel consommé et gelé techniquement par PRD-006. Toute évolution incompatible passe par PRD-007.

## 7. Parallel Development Gate
Jules peut développer 000 contre fixtures de graphe sans implémenter 001-005. Gate: invariants documentés, aucun type concurrent de `EngramNode`, aucun backend obligatoire.

> Gouvernance: PRD-900 et PRD-006 priment pour les frontières d'intégration.