# Règles SmartPI Dashboard
Projet de supervision **strictement en lecture seule**.
Ne jamais appeler \`hass.callService\`, modifier les entités, déclencher une calibration ou enregistrer des réglages.
SmartPI Diagnostics v2 est la source de vérité : \`attributes.live\` pour les valeurs actuelles, \`attributes.history\` pour les séries Recorder.
Ne pas confondre pourcentage de commande et puissance réellement mesurée.
Ne jamais interpréter \`tau_min\` quand \`tau_reliable\` est faux, ni une prédiction d'équilibre lorsque sa fiabilité est fausse.
Les valeurs absentes et nulles sont affichées comme indisponibles, le zéro restant valide.
Pas de liste codée en dur de thermostats.
Source du schéma : https://github.com/KipK/vtherm_smartpi/blob/master/custom_components/vtherm_smartpi/smartpi/diagnostics.py
