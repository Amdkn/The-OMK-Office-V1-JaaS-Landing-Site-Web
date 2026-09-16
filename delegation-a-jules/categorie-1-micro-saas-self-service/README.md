# Catégorie 1 : Micro-SaaS de Self-Service Client & Découplage Visiteur

## 1. Vision Stratégique & Émancipation Client
Cette catégorie implémente la transformation des 75 services d'**OMK Office** en véritables micro-applications autonomes pour les clients connectés, tout en sanctuarisant l'expérience de découverte pour les visiteurs :
* **Découplage Rôle Déterministe :**
  - **Visiteur (Non connecté) :** Conservation intégrale des pop-ups modales actuelles (tarifs, durée, livrables, prise de RDV / paiement).
  - **Client Titulaire (Espace Membre) :** Le clic sur un service ouvre un **Micro-SaaS dédié en plein écran ou canvas immersif**, inspiré du modèle interactif "Self-Wix" de Jack Roberts.
* **Philosophie "Edit More, Rebuild Less" :** Le client génère, édite et valide ses dossiers (USCIS, CashFlow, CV ATS) via un studio interactif à 0 ms de latence, sans jamais régénérer de code React ni gaspiller de tokens.
* **Structure Standardisée :** Chaque service est mappé sur l'un des 3 archétypes universels (Dossier Builder, Cash Matrix, Career ATS Studio) adossés au store Zustand normalisé de la Catégorie 0.

## 2. Inventaire des 6 PRD de la Catégorie 1
| PRD | Titre Canonique | Rôle & Responsabilité |
| :--- | :--- | :--- |
| **PRD-010** | `PRD-010-SERVICE-CONTEXT-ROUTER.md` | Aiguillage déterministe au clic selon le rôle (`visitor` -> Modal informative vs `client` -> Micro-SaaS Workspace). |
| **PRD-011** | `PRD-011-MICRO-SAAS-WORKSPACE-SHELL.md` | Conteneur d'atelier universel : TopBar d'avancement, Canvas central et Panneau latéral escamotable (`SideStudioDrawer`). |
| **PRD-012** | `PRD-012-DOSSIER-BUILDER-LEGAL-TEMPLATE.md` | Archétype A (Pôle Légal) : Découpage par étapes, contrôle OCR de conformité des pièces et prévisualisation PDF/attestation. |
| **PRD-013** | `PRD-013-CASH-MATRIX-FINANCE-TEMPLATE.md` | Archétype B (Pôle Finance) : Tableaux réactifs Zustand, curseurs de simulation de trésorerie et export proforma scellé. |
| **PRD-014** | `PRD-014-CAREER-ATS-STUDIO-TEMPLATE.md` | Archétype C (Pôle Carrière) : Studio de personnalisation CV/LinkedIn, scoring de mots-clés ATS et micro-actions IA. |
| **PRD-015** | `PRD-015-WORKSPACE-SESSION-AUTO-SAVE.md` | Persistance locale de session (RAM + IndexedDB) par `client_id + service_id`, badge "Enregistré localement" et reprise instantanée. |
