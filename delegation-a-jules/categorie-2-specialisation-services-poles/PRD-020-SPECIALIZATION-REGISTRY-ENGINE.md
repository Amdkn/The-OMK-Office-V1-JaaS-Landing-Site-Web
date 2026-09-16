# PRD-020 : Specialization Registry Engine & Service Mapping

## 1. Contexte & Problématique
Les 75 services d'OMK Office sont répertoriés dans `src/data/msg2MatrixData.ts`. Pour que l'espace membre client sache quel gabarit charger, quelles règles appliquer et quelles données injecter, un registre de spécialisation centralisé et typé est indispensable.

## 2. Objectifs & Exigences Techniques
* Implémenter le registre `ServiceSpecializationRegistry` :
  - Clé primaire : `serviceId` canonique (ex: `1.1-2`, `2.1-1`, `3.2-1`).
  - Métadonnées associées :
    * `archetype` : `'dossier_builder' | 'cash_matrix' | 'career_studio' | 'custom'`.
    * `zodSchema` : Schéma de validation des données du formulaire métier.
    * `officialDocumentType` : Type de document officiel cible (ex: `'USCIS_I765'`, `'W2_TAX'`, `'RESUME_ATS'`).
    * `visualSecretaryScriptId` : Identifiant du script d'accueil 7D.
* Fonction d'extraction et de projection : `getServiceSpecialization(serviceId: string)` s'exécutant en $O(1)$.

## 3. Schéma & Types Cibles
Fichier cible : `src/lib/services/specializationRegistry.ts`

```typescript
export interface ServiceSpecializationConfig {
  serviceId: string;
  poleId: 'POLE_1_LEGAL_ADMIN' | 'POLE_2_FINANCE_ACCOUNTING' | 'POLE_3_EDUCATION_JAAS';
  archetype: 'dossier_builder' | 'cash_matrix' | 'career_studio';
  titleFr: string;
  titleEn: string;
  validationSchemaName: string;
  defaultProperties: Record<string, any>;
  officialFormTemplateId?: string;
  estimatedMinutes: number;
}
```

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/services/registry.test.ts`
* Les 75 codes de services sont indexés dans le registre sans aucun manquant.
* Tout appel à `getServiceSpecialization` pour un service valide retourne une configuration complète et typée.
* Zéro doublon d'identifiant de service.


## 5. Ownership Boundary
Owns: types/API/lookup/validation structurelle du registry. Must not own: contenu des 75 entrées ni règles métier des pôles.

## 6. Consumed / Published Contracts
Suit PRD-026. Publie `ServiceSpecializationConfig` et `getServiceSpecialization`. PRD-025 consomme ces types sans les redéfinir.

## 7. Parallel Development Gate
Registry testable avec fixtures 026, sans attendre les 75 services. `Record<string, any>` doit être borné progressivement par types/config schemas publics plutôt que devenir un canal de données non validées.

Tests: lookup O(1), ID inconnu typé, doublon rejeté, contribution invalide rejetée.