# PRD-900 : Parallel Development & Integration Contract

## 1. Mission
Ce PRD est le contrat supérieur de développement parallèle des Catégories 0, 1 et 2. Il ne définit aucune feature utilisateur : il définit les frontières qui permettent à plusieurs sessions Jules de développer simultanément sans modifier le territoire d'un autre PRD.

## 2. Principes obligatoires
- Un PRD possède explicitement ses fichiers et ses contrats publics.
- Un consommateur dépend d'une interface publique, jamais d'un détail d'implémentation.
- Aucun agent ne modifie un fichier possédé par un autre PRD sans amendement explicite du contrat.
- Les mocks et fixtures contractuels permettent de travailler avant la disponibilité d'une dépendance.
- Les changements de schéma passent par versionnement/migration, jamais par mutation silencieuse.
- Les tests de contrat sont des gates de merge, au même titre que les tests unitaires.

## 3. Ordre logique des contrats
`000 -> 006/007 -> 001/002/003/005 -> 010/011 -> 016 -> 012/013/014 -> 015/017 -> 020/026 -> 021/022/023 -> 025`.

PRD-024 est une capability commerciale transverse : il consomme le registre mais ne possède ni PRD-023 ni le compilateur 025.

## 4. Règle de propriété
Chaque PRD doit publier quatre sections : `Ownership Boundary`, `Consumed Contracts`, `Published Contracts`, `Parallel Development Gate`.

Une session Jules peut créer des fichiers nouveaux dans son territoire. Elle ne peut pas renommer, déplacer ou réécrire un contrat public d'un autre PRD.

## 5. Merge Contract
Avant merge, chaque PRD doit démontrer :
1. compilation TypeScript sans erreur ;
2. tests unitaires de son territoire ;
3. tests des contrats publics consommés/publiés ;
4. absence de modification hors ownership ;
5. aucune dépendance/import fantôme ;
6. aucune donnée métier inventée pour satisfaire un test.

Les exigences de performance utilisent des budgets mesurables. `0 ms` signifie local-first/perception instantanée, pas une durée physique littérale. Une interaction UI locale vise un budget d'un frame (~16 ms) lorsque mesurable.

## 6. Règle métier et réglementaire
Les PRD Légal/USCIS, Finance/Tax/Loans et autres domaines réglementés doivent séparer :
- règle déterministe fournie par une source canonique ;
- configuration métier OMK ;
- placeholder explicitement marqué lorsque la règle canonique n'est pas fournie.

Jules ne doit jamais inventer une règle légale, fiscale, bancaire ou réglementaire pour compléter un PRD.

## 7. Definition of Ready pour développement parallèle
Un PRD est `PARALLEL-READY` uniquement lorsque ses contrats consommés sont disponibles soit comme implémentation, soit comme fixture/mock canonique et que ses fichiers possédés sont explicitement identifiés.

## 8. Definition of Done
`DONE` signifie : implementation + tests + contrat public respecté + aucune régression contractuelle + handoff documenté. Une UI visuellement fonctionnelle seule n'est pas `DONE`.