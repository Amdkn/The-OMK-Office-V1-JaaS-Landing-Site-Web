# PRD-033 — Security, Privacy & Authorization Hardening

## Mission
Durcir l’application contre accès non autorisé, injection, fuite de données et mauvaise gestion des secrets.

## Scope propriétaire
- authz serveur et vérification tenant/client
- validation Zod des entrées réseau
- CORS/CSP/security headers
- limites type/taille upload
- protections XSS/injection/path traversal
- secrets côté serveur uniquement
- politique logs sans données sensibles
- tests négatifs et abuse cases

## Gates obligatoires
1. aucune confiance dans le rôle fourni uniquement par le client
2. aucune lecture/écriture cross-client non autorisée
3. toutes les entrées API validées
4. erreurs serveur sans fuite de stack/secrets en production
5. aucun secret dans bundle client, logs ou repository
6. uploads rejetés hors politique
7. headers de sécurité définis et testés

## Données sensibles
Les parcours Legal/Finance doivent être traités comme potentiellement sensibles même avec fixtures synthétiques.

## Ne possède pas
- fournisseur d’identité spécifique sauf contrat existant
- règles métier ou réglementaires
- observabilité générale hors exigences de sécurité

## Gate
Security test suite PASS et aucun finding critique/élevé non accepté explicitement.