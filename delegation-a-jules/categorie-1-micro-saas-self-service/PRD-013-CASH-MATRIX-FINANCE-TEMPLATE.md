# PRD-013 : Archétype B — "Cash & Business Matrix" (Pôle Finance)

## 1. Contexte & Problématique
Le Pôle 2 (Trésorerie, Facturation, Quick CashFlow, Business Plans) a besoin d'un micro-SaaS orienté calculs déterministes et pilotage de cash en temps réel.

## 2. Objectifs & Exigences Techniques
* Implémenter le gabarit `<CashMatrixView serviceId={...} />` :
  - **Tableau de Trésorerie Réactif :** Grille mensuelle réactive stockée dans le store Zustand avec calcul automatique en 0 ms des soldes initiaux, entrées, sorties et runway.
  - **Simulateurs avec Sliders :** Curseur dynamique de charges d'exploitation, prévisions de chiffre d'affaires et seuil d'atterrissage de trésorerie H90.
  - **Module de Facturation Express :** Création d'une facture / devis en quelques secondes avec sélection des taux de TVA et calcul des totaux instantané.
  - **Génération d'Export Structuré :** Bouton d'export CSV et PDF comptable aux normes légales.

## 3. Composants Cibles
Fichiers cibles :
* `src/components/workspace/templates/CashMatrixView.tsx`
* `src/components/workspace/templates/CashFlowGrid.tsx`
* `src/components/workspace/templates/InvoiceQuickGenerator.tsx`

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/workspace/cashMatrix.test.tsx`
* Toute modification d'une ligne d'encaissement recalcule le solde final sans latence.
* Le simulateur de runway réagit fidèlement aux mouvements des curseurs.
* L'export génère des calculs arithmétiques vérifiés à 100 % (zéro erreur d'arrondi).
