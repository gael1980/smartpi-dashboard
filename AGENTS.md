# Règles SmartPI Dashboard
Projet de supervision **strictement en lecture seule**.
Ne jamais appeler `hass.callService`, modifier les entités, déclencher une calibration ou enregistrer des réglages.
SmartPI Diagnostics v2 est la source de vérité : `attributes.live` pour les valeurs actuelles, `attributes.history` pour les séries Recorder.
Ne pas confondre pourcentage de commande et puissance réellement mesurée.
Ne jamais interpréter `tau_min` quand `tau_reliable` est faux, ni une prédiction d'équilibre lorsque sa fiabilité est fausse.
Les valeurs absentes et nulles sont affichées comme indisponibles, le zéro restant valide.
Pas de liste codée en dur de thermostats.
Source du schéma : https://github.com/KipK/vtherm_smartpi/blob/master/custom_components/vtherm_smartpi/smartpi/diagnostics.py


## Historique et fidélité du schéma (0.2)

- Seule capacité réseau frontend : `services/history.ts`, commande officielle
  `history/history_during_period` via la session authentifiée `hass.callWS`.
  Aucun service, token externe, écriture ou abonnement supplémentaire.
- Toujours lire les sources SmartPI actuelles avant de modifier une relation du
  schéma ; mettre à jour la matrice de `VISUAL_DIAGNOSTICS.md` et les tests.
  Vérifier notamment erreur P filtrée / erreur I brute, FF runtime sans FF3 en
  bande morte, chemins directs hystérésis/calibration et espaces de vanne.
- Ne pas fusionner silencieusement Recorder et session, ne pas remplir les trous,
  ne pas appliquer la confiance actuelle rétroactivement, ne pas fabriquer un
  historique Twin ou des événements à partir du seul instantané.
- Conserver le nettoyage uPlot/ResizeObserver, le rejet des réponses obsolètes et
  la borne de mémoire de session. Exécuter les tests navigateur sur fixtures
  synthétiques uniquement ; jamais injecter le bundle dans le HA principal pour
  contourner l'absence d'autorisation de déploiement.


## Skills Codex utiles au projet

Ces skills sont déjà disponibles via l'environnement Codex / le plugin ECC ;
ne pas en installer des copies en double dans le dépôt.

- `ecc:frontend-design-direction` : hiérarchie de supervision et vérification des
  états visuels sur desktop/mobile, avec preuves de rendu.
- `ecc:accessibility` : contrôles sémantiques, clavier, focus, contraste, tables
  alternatives aux Canvas. Préférable ici à la skill React `frontend-a11y`.
- `ecc:e2e-testing` : scénarios stables, attente d'états explicites, fixtures et
  artefacts CI ; ses exemples Playwright sont des principes, pas une obligation
  de changer le runner du projet.
- `ecc:verification-loop` : typage, build, tests, sécurité et revue du diff ;
  distinguer validations locales, CI et acceptation sur une installation HA.
- `context7-mcp` : documentation actuelle HA, Lit et bibliothèque de graphiques.
- `ecc:skill-scout` : recherche de skills pertinentes avant ajout ; sources locales
  en premier, aucune installation externe automatique.
- `ecc:source-command-review-pr` : revue à plusieurs perspectives pour une PR
  substantielle ; consolider les constats et ne rapporter que les défauts étayés.

Choisir selon la tâche, lire les instructions avant application, conserver les
contraintes de lecture seule et ne pas prétendre à une certification scientifique
ou d'accessibilité à partir de la seule utilisation d'une skill.
