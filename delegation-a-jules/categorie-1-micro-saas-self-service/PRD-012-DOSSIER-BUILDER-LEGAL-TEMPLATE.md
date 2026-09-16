# PRD-012 : Archétype A — "Dossier Builder" (Pôle Légal & Administration)

## 1. Contexte & Problématique
Le Pôle 1 (Immigration, État Civil, Apostilles, Fiscalité internationale) requiert des dossiers documentaires complexes. L'atelier "Dossier Builder" permet au client de constituer son dossier de façon autonome avec validation de conformité en temps réel.

## 2. Objectifs & Exigences Techniques
* Implémenter le gabarit `<DossierBuilderView serviceId={...} />` :
  - **Assistant d'Étapes (Step Wizard) :** Progression pas à pas (Étape 1 : Identité, Étape 2 : Justificatifs, Étape 3 : Révision).
  - **Composant FileDropzone Zod :** Zone de téléversement de documents avec vérification instantanée côté client (extensions autorisées PDF/JPG, taille limite, lisibilité).
  - **Visualiseur de Dossier Assemblé :** Affichage d'un aperçu visuel des pages assemblées du dossier officiel (type formulaire I-765, I-539 ou traduction assermentée OMK).
  - **Bouton d'Export Scellé :** Génération du récapitulatif complet prêt à la transmission USCIS ou notariale.

## 3. Schéma de Données de l'Atelier
```typescript
interface LegalDossierState {
  serviceId: string;
  applicant: {
    fullName: string;
    alienRegistrationNumber?: string;
    dateOfBirth: string;
    address: string;
  };
  attachments: Array<{
    id: string;
    category: 'identity' | 'eligibility' | 'receipt';
    fileName: string;
    fileSize: number;
    status: 'uploaded' | 'verified' | 'rejected';
  }>;
  status: 'draft' | 'ready_for_review' | 'submitted';
}
```

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/workspace/dossierBuilder.test.tsx`
* L'ajout d'une pièce jointe non conforme (ex: exécutable ou fichier trop lourd) est rejeté immédiatement avec un message clair.
* Tous les champs requis du formulaire sont validés par Zod avant de débloquer l'étape suivante.
* La synthèse finale compile toutes les pièces attachées dans l'ordre canonique.
