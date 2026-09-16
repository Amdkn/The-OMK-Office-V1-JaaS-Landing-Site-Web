# PRD-024 : L'Usine d'Affiliation & Vidéo Virale (Module 3.5)

## 1. Contexte & Problématique
Le modèle économique du Pack JOB ($300/an) repose sur une boucle virale d'acquisition : un client qui parraine 6 proches reçoit $50 par conversion, remboursant intégralement son investissement et générant de la croissance organique.

## 2. Objectifs & Exigences Techniques
* **Studio d'Affiliation & Parrainage (Sous-cadre 3.5) :**
  - Interface de saisie rapide de 6 contacts (Nom, Prénom, Email, Téléphone WhatsApp).
  - Générateur de liens de parrainage uniques avec attribution cryptographique (`ref_code`).
* **Pipeline de Génération de Briefs Vidéo :**
  - Moteur de templating générant les scripts personnalisés de recommandation.
  - Payload structuré JSON prêt pour l'API d'avatar vidéo (HeyGen / Creatomate / 11Labs).
* **Tableau de Bord de Rémunération :**
  - Jauge visuelle de conversion : `0/6 convertis ($0)`, ..., `6/6 convertis ($300 - Pack intégralement remboursé !)`.

## 3. Composants Cibles
Fichiers cibles :
* `src/components/workspace/career/ReferralViralStudio.tsx`
* `src/lib/career/referralEngine.ts`

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/workspace/referralEngine.test.ts`
* La validation bloque les adresses emails en doublon ou les numéros de téléphone mal formatés.
* Le calcul des commissions s'incrémente rigoureusement de 50 $ par statut converti validé.
