# Catégorie 0 : Zustand CMS Core (Local-First, 0 ms & Standard IA-Native)

## 1. Vision & Architecture Souveraine
Cette catégorie implémente le moteur de gestion de contenu d'**OMK Office** en rupture totale avec les CMS Cloud propriétaires (Wix, Webflow) :
* **Store-as-a-CMS Réactif :** Dictionnaires normalisés en RAM ($O(1)$) pilotés par Zustand pour une latence de 0 ms.
* **Primitive Unique EngramNode :** Modèle d'arbre d'adjacence à imbrication infinie (Pôles -> Services -> Packages -> Formulaires -> Champs Zod).
* **Zéro Bureau Émulé :** Aucune métaphore de fenêtres Desktop instables, mais une interface web/mobile-first responsive avec panneaux latéraux (drawers) et fil d'Ariane dynamique.
* **Standard IA-Native (Edit More, Rebuild Less) :** L'IA et les formulaires modifient directement les propriétés JSON typées sans jamais régénérer de code React ni consommer de tokens inutiles.

## 2. Inventaire des 6 PRD Découplés
| PRD | Titre Canonique | Rôle & Responsabilité |
| :--- | :--- | :--- |
| **PRD-000** | `PRD-000-ZUSTAND-CMS-FOUNDATIONS.md` | Schémas Zod, Types EngramNode canoniques, contrats d'invariance et tests unitaires. |
| **PRD-001** | `PRD-001-ZUSTAND-REACTIVE-STORE.md` | Store central Zustand `useCmsStore`, CRUD atomique O(1), sélecteurs mémoïsés et historique RAM. |
| **PRD-002** | `PRD-002-DYNAMIC-PATH-RESOLVER.md` | Résolution d'URLs dynamiques (`/pole/:pSlug/:sSlug`), Breadcrumbs et Drawers contextuels. |
| **PRD-003** | `PRD-003-REPEATER-ZOD-FIELDS.md` | Composant `<CmsRepeater>` universel, champs éditables inline et barrières de validation Zod. |
| **PRD-004** | `PRD-004-SPLIT-SCREEN-7D-SECRETARY.md` | Écran scindé avec lecteur vidéo narratif 7D (Mannequin 3D) synchronisé sur les champs actifs. |
| **PRD-005** | `PRD-005-HYBRID-PERSISTENCE-BRIDGE.md` | Persistance IndexedDB côté navigateur et pont de synchronisation export/import scellé SHA-256. |
