# PRD-006 : CMS Public Contract & Ownership Boundaries

## 1. Mission
Geler l'API publique du CMS afin que les PRD 001-005 et les catégories supérieures puissent être développés en parallèle sans dépendre des détails internes du store.

## 2. Ownership Boundary
Owns : `src/types/cms.ts`, `src/schemas/cms.schema.ts` pour leurs exports publics et un barrel `src/lib/cms/index.ts`.

May modify : uniquement les contrats publics CMS et leurs tests contractuels.

Must not modify : composants UI, persistence IndexedDB, workspace client, spécialisations métier.

## 3. Published Contracts
Exports minimaux : `EngramNode`, `NodeType`, schémas Zod canoniques, `CmsNodeId`, résultat de validation typé et signatures des opérations CMS publiques.

`properties` reste extensible mais toute mutation passe par un schéma connu. Les consommateurs ne doivent pas écrire directement dans l'objet `nodes`.

## 4. Consumed Contracts
PRD-000 est la source conceptuelle. PRD-007 gouverne toute évolution incompatible du schéma.

## 5. Invariants
- `id` unique et stable.
- `parentId !== id`.
- aucune référence enfant orpheline après une mutation validée.
- `meta` et `properties` sont deux espaces distincts ; une mutation de `properties` ne modifie jamais implicitement `meta`.
- les cycles parent/enfant sont invalides.

## 6. Parallel Development Gate
Publier des fixtures minimales : racine, pôle, service, step, field et arbre multi-niveaux. Les PRD consommateurs peuvent mocker l'API publique mais pas redéfinir `EngramNode`.

Tests contractuels :
- validation d'un graphe sain ;
- rejet d'un self-parent et d'un cycle ;
- rejet d'une référence orpheline ;
- compatibilité des fixtures avec le schéma public.

## 7. Critère de changement
Toute modification breaking de `EngramNode`, des identifiants ou des signatures publiques exige une nouvelle version de schéma et une migration définie par PRD-007.