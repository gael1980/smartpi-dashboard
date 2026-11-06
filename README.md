# SmartPI Dashboard

Panneau scientifique **en lecture seule** pour comprendre SmartPI dans Home Assistant.

## Principes
- Aucun changement de consigne, service, calibration ni écriture dans Home Assistant.
- Découverte automatique des capteurs SmartPI Diagnostics (schéma v2).
- Résumé simple puis explications détaillées dépliables.
- Les valeurs absentes ou non fiables ne sont jamais présentées comme certaines.
- Aucun jeton API, serveur Flask ou entité HA supplémentaire.

## État du développement

**Prototype 0.1.0** : intégration Home Assistant et adaptateur de diagnostics v2.
La consultation Recorder (24–48 h), les graphiques historiques et les comparaisons seront ajoutés après validation du socle sur HA.

## Installation pour un dépôt privé

HACS nécessite des dépôts publics ; tant que le dépôt est privé, compiler le frontend puis copier le composant manuellement :

1. Dans \`frontend\`, exécuter \`npm install && npm run build\`.
2. Copier \`custom_components/smartpi_dashboard/\` (incluant le bundle généré dans \`frontend/\`) vers le dossier \`config/custom_components/smartpi_dashboard/\` de Home Assistant.
3. Redémarrer Home Assistant, puis **Paramètres → Appareils et services → Ajouter une intégration → SmartPI Dashboard**.
4. Ouvrir **SmartPI Dashboard** dans la barre latérale (administrateurs seulement).

La compilation nécessite Node.js 22+. Rien à installer sur le serveur HA après compilation.
**Cette version n'a pas encore été testée sur ton Home Assistant en fonctionnement.**

## Développement

\`\`\`bash
cd frontend
npm install
npm run typecheck
npm test
npm run build
\`\`\`

Sources de référence :
- https://github.com/KipK/vtherm_smartpi/blob/master/documentation/en/diagnostics.md
- https://github.com/gael1980/smartpi-dash
- https://github.com/Liquidmasl/vtherm_dashboard
- https://developers.home-assistant.io/docs/frontend/custom-ui/
- https://hacs.dev/docs/publish/start/
