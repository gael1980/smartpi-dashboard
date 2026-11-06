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
