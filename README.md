# 🏢 The OMK Office - Front-End & Back-End (Full Stack Monorepo)

Ce dépôt contient le code source du **Socle Full-Stack v0** de "The OMK Office". 
Inspiré par la dualité iOS/Android (mobile-first, hubs connectés), il agit comme l'interface et le pont vers le **Business OS** (qui lui, a une approche Desktop Mac/Windows).

Il est conçu pour offrir une **souveraineté totale**, échapper au "vendor lock-in", et s'adapter dynamiquement à toutes les identités visuelles via un moteur de thèmes profond, le tout orchestré au sein d'un **Monorepo (Express + Vite)**.

---

## ✨ Fonctionnalités Principales

*   **🖥️ Full-Stack Monorepo (Node / Express / Vite) :**
    Une architecture unifiée. Le même dépôt gère l'API backend Express (port 3000) et le frontend React/Vite, garantissant qu'aucune clé API ou secret ne soit jamais exposé côté client.

*   **🎨 Moteur de Thèmes Dynamique (Souveraineté Visuelle) :**
    Un système de variables CSS profond (`src/contexts/ThemeContext.tsx`) permettant de métamorphoser instantanément l'architecture visuelle du site. La sélection est sauvegardée dans le navigateur (`localStorage`).
    *   *Thèmes inclus :* 
        *   **Glassmorphism** (Défaut) : Verre dépoli, fluidité et transparence.
        *   **Warm Paper** : Élégance classique, fonds crèmes, bordures dorées et Serif.
        *   **Brutalism** : Industriel, sans arrondis, ombres dures, typographie monospace. Idéal pour *Orbiter*.
        *   **Dark OLED** : Mode sombre "Pro Max" (Noir pur, accents émeraudes fluo).
        *   **Claymorphism** : Mode 3D douce et tactile (ombres internes et externes).

*   **🧭 Navigation Hybride "AnchorNav" :**
    Un menu de progression "in-page" vertical qui s'adapte géométriquement au thème actif. Il permet de naviguer intuitivement entre les sections d'une même vue.

*   **⚙️ Architecture Modulaire (Vues "OS-like") :**
    Une barre latérale (Sidebar) orchestre différentes "Applications" ou sections d'offres : 
    *   **Catalogue (Home)** : Résumé de l'offre globale.
    *   **JaaS (Job-as-a-Service)** : Délégation RH et recrutement.
    *   **BaaS (Business-as-a-Service)** : Opérations, process et directions déléguées.
    *   **PaaS (Project-as-a-Service)** : Ingénierie logicielle, IA et infrastructures.
    *   **Back-Office OS** : Lien sécurisé vers l'instance de bureau virtuelle OMK Web OS.

---

## 🛠️ Stack Technique

*   **Backend** : Node.js, Express, esbuild
*   **Frontend Framework** : React 18, Vite
*   **Langage** : TypeScript (Full Stack)
*   **Styling** : Tailwind CSS (augmenté de variables CSS natives pour les thèmes)
*   **Icônes** : Lucide React

---

## 📂 Architecture des Dossiers

```
./
├── server.ts         # Point d'entrée Backend (Express API + Vite Middleware)
├── package.json      # Configuration Monorepo et Dépendances
├── src/
│   ├── components/
│   │   ├── layout/   # Sidebar, Header, AnchorNav
│   │   ├── shared/   # Composants réutilisables
│   │   └── views/    # Les différentes "pages" de The OMK Office
│   ├── contexts/     # États globaux (ThemeContext, etc.)
│   ├── types/        # Définitions TypeScript partagées
│   ├── App.tsx       # Chef d'orchestre Frontend
│   └── index.css     # Styles globaux Tailwind et Redéfinitions lourdes des Thèmes
```

---

## 🚀 Installation & Démarrage

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Lancer le serveur Full-Stack (Dev) :**
   ```bash
   npm run dev
   ```
   *Lance le serveur Express sur le port 3000, qui sert également le front-end via Vite en mode middleware.*

3. **Générer le build de production (Front & Back) :**
   ```bash
   npm run build
   ```
   *Compile le front (dist/) et le serveur backend (dist/server.cjs) via esbuild.*

4. **Lancer en production :**
   ```bash
   npm run start
   ```

---
