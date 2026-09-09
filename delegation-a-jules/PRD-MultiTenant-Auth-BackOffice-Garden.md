# PRD — Refonte Multi-Tenant, Cloisonnement des Espaces & Integration Agency Garden

## 1. Contexte & Probleme
Le depot The-OMK-Office-V1-JaaS-Landing-Site-Web a ete prototype via Google AI Studio. Faute de planification modulaire, AI Studio a compresse les differents espaces de travail dans une seule interface confuse melangeant Landing Page publique et fragments de back-office.

## 2. Mission pour Jules (Google Labs)
1. **Cloisonnement Hermetique** : Separer la Landing Page publique (presentation, 75 Actes MSG2, poles 1/2/3) de l'Espace Membre authentifie.
2. **Sas de Connexion / Inscription** :
   - Creer un composant Modal ou Page dedie \AuthModal.tsx\ / \AuthPage.tsx\ dans \src/components/auth/\.
   - Permettre la connexion, inscription et bascule immediate entre profils demo (\dmin\, \mployer\, \client\, \isiteur\).
3. **Back-Office Administrateur & Employeur (Inspire de 00-AaaS-Agency-Garden)** :
   - Tableau de bord executif pour le staff : suivi des dossiers (Cases), avancement des actes, Kanban des taches par pole (Juridique, Finance, Carriere).
   - Validation des pieces, gestion RLS et revue des documents.
4. **Portail Client Apprenant (Inspire de Coursera / Udemy)** :
   - Transformer l'espace client en portail guide par etapes (Milestones & Modules).
   - Jauge de progression claire, depot des pieces d'identite / procurations simplifie, et fiches explicatives pour chaque acte en cours.
5. **Portail Visiteur** :
   - Conserver le sas d'onboarding et prise de rendez-vous Cincinnati sans surcharger la navigation.

## 3. Criteres de Qualite & Validation
- Compilation stricte : \un run build\ ou \	sc\ doit passer avec 0 erreur.
- Design System Stitch : Classes Tailwind propres, palette officielle (navy, emerald, purple), pas de texte tronque.
- Zero regression sur les poles d'actes juridiques et financiers existants.
