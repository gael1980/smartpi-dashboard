# Audit SmartPI Dashboard 0.1.0 — 6 novembre 2026

> Rapport historique de la version 0.1. Pour la version 0.2, voir
> [VISUAL_DIAGNOSTICS.md](VISUAL_DIAGNOSTICS.md). La récupération Recorder
> a depuis été validée avec la session authentifiée du navigateur.

Audit v1, base `1a3ef7dbc9126bf1de0feaba8daefdcd00c471c7`, branche
`audit/pre-installation`. Dépôt privé, installation manuelle uniquement.

## Périmètre et méthode

Lecture des instructions, du README, de tous les modules Python, manifest,
traductions, sources TypeScript, tests, configuration npm/TypeScript/HACS et workflow.
Contrat SmartPI v2 vérifié dans les sources officielles actuelles :

- [Diagnostics et Recorder](https://github.com/KipK/vtherm_smartpi/blob/master/documentation/en/diagnostics.md).
- [Construction des diagnostics](https://github.com/KipK/vtherm_smartpi/blob/master/custom_components/vtherm_smartpi/smartpi/diagnostics.py).
- [Modèle A/B et dérivée en °C/min](https://github.com/KipK/vtherm_smartpi/blob/master/custom_components/vtherm_smartpi/smartpi/ab_estimator.py).
- [Panneaux HA](https://developers.home-assistant.io/docs/frontend/custom-ui/creating-custom-panels/),
  [fichiers statiques](https://developers.home-assistant.io/blog/2024/06/18/async_register_static_paths/),
  [manifest](https://developers.home-assistant.io/docs/creating_integration_manifest/).
- [API panel_custom HA 2026.11.0](https://github.com/home-assistant/core/blob/2026.11.0/homeassistant/components/panel_custom/__init__.py).
- [Référence VTherm Dashboard](https://github.com/Liquidmasl/vtherm_dashboard/blob/main/custom_components/vtherm_dashboard/__init__.py)
  consultée pour le cycle de vie seulement ; ses outils d'écriture ne sont pas repris.
- [Structure HACS](https://hacs.xyz/docs/publish/integration/).

Context7 consulté pour les API HA, puis comparaison à la source de la version
installée. Pas de changement d'algorithme, d'estimateur ou de SmartPI.

## Problèmes et corrections

| Criticité | Constat initial | Correction |
| --- | --- | --- |
| Haute, interprétation | Des prédictions Twin et l'atteignabilité apparaissaient sans filtrage suffisant ; un indicateur absent autorisait τ. | Les valeurs soumises à fiabilité exigent `true` ; Twin exige modèle fiable et fin de warmup explicites. Atteignabilité exige aussi fiabilité de l'équilibre. Valeurs brutes réservées au JSON technique. |
| Haute, données | Un capteur `unavailable` pouvait présenter ses anciens attributs comme actuels. | Conservation dans la découverte, masquage des valeurs live et explication de l'indisponibilité. |
| Moyenne | Diagnostics v2 partiels exclus silencieusement. | Conservation si enveloppe live/history valide ; champs absents affichés indisponibles. |
| Moyenne | Association climate déduite du nom en l'absence de référence explicite. | Association uniquement par `specific_states.regulation_diagnostics`. Le capteur reste consultable sans climate. |
| Moyenne, CI | Workflow avec `contents: write`, commit/push automatique sur main, sans validation PR. | `contents: read`, validation PR, `npm ci`, contrôle du bundle suivi, artefact sans publication automatique et job HA dédié. |
| Faible | Temps morts sans contrôle de fiabilité, ratios FF et unités A/B peu explicites, date de publication cachée. | Indicateurs affirmatifs pour les temps morts ; unités documentées ; état/date visibles sans seuil arbitraire de péremption. |
| Faible | Focus clavier peu visible, risque de débordement des noms longs, README avec backticks échappés. | Focus explicite, retour à la ligne, Markdown corrigé. |

Le manifeste et les signatures utilisées sont compatibles avec HA 2026.11.0.
Aucune dépendance Python spécifique n'est nécessaire. Le panneau reste administrateur
uniquement ; ajout de `config_panel_domain` pour son rattachement à l'intégration.
La route statique est enregistrée une fois par processus et reste disponible après
suppression de l'entrée (fichier JavaScript sans données ni identifiants). Le panneau
est retiré au déchargement ; les fichiers copiés manuellement restent à supprimer
manuellement après désinstallation si souhaité.

## Contrat scientifique

`schema_version === 2`, `attributes.live` pour le présent et `attributes.history`
pour Recorder. Zéro reste numérique, null/undefined/NaN ne deviennent pas zéro.
Pas de conversion silencieuse de chaîne en nombre. A est en °C/min à commande
unitaire, B en min⁻¹ ; les contributions `u_ff*` sont des ratios, les champs
`power.*_percent` déjà des pourcentages. Les commandes ne sont jamais des watts
mesurés. PI/FF ne constituent pas une preuve d'anomalie en hystérésis/bootstrap.
A/B sont des estimations accompagnées de leur confiance ; respecter un drapeau
publié ne prouve pas indépendamment la validité physique du modèle.

## Lectures sur le Home Assistant principal

MCP officiel : HA OS, Core **2026.11.0**, frontend **20261028.4**, Python
**3.14.10**. Découverte par attribut schema_version, sans liste fixe dans le
produit : quatre capteurs au moment du contrôle, associés explicitement à
`climate.thermostat_emilien`, `climate.thermostat_cuisine`,
`climate.thermostat_salle`, `climate.thermostat_salon`.

Emilien et salon en bootstrap/hystérésis ; cuisine et salle en SmartPI stable.
Cas observé au salon : appliqué 100 %, commande/PI/FF 0 %. Comportement compatible
avec le bootstrap, non signalé comme anomalie. Des prédictions Twin non fiables
sont présentes dans les instantanés : elles doivent rester des données brutes.
Les huit chemins officiels sont présents et numériques dans les quatre blocs
history actuels :

- `temperature.indoor`, `setpoint.filtered_setpoint`
- `power.applied_percent`, `power.command_percent`, `power.pi_percent`, `power.ff_percent`
- `model.a`, `model.b`

**Recorder non validé** : l'outil MCP history disponible fournit uniquement des
statistiques numériques ; les quatre réponses indiquent « No statistics are
recorded for this entity ». Cela ne signifie pas que Recorder n'enregistre pas
les attributs. SSH autorisé fonctionne ; le proxy Supervisor vers l'API Core
retourne HTTP 401. Aucun secret créé ou exposé, aucune lecture SQL, aucune
modification Recorder ni contournement des droits. Il faudra un accès autorisé à
l'historique brut pour vérifier ces huit séries sur 24–48 h. En mode normal,
SmartPI exclut live de Recorder : le consommateur historique doit lire history.
Les graphiques ne sont pas implémentés dans ce prototype et aucun n'a été ajouté.

## Tests et résultats

Avant corrections : typecheck/build réussis, 5 tests JS et 3 tests Python
structurels réussis ; bundle initial conforme à la compilation.

Après corrections :

- `npm install` : réussi ; versions du lockfile conservées.
- `npm run typecheck` : réussi.
- `npm test` : **9 réussites, 0 échec, 0 skip**.
- `npm run build` : réussi, deux compilations identiques.
- SHA-256 bundle : `143411340f3f87b4e83c70e88a620e9197e6c5597d56ffa13224b471ff3573f0`.
- `npm audit --json` : **0 vulnérabilité connue** ; aucune garantie exhaustive.
- `/private/tmp/smartpi-audit-ha/bin/python -m unittest discover -s tests -v` :
  **6 réussites, 0 échec, 0 skip**, Python 3.14.10 / HA 2026.11.0.
- Tests HA : vraies classes HomeAssistant/ConfigFlow et vraies API de panneaux ;
  enregistrement HTTP des fichiers et recherche de version mockés. Configuration
  unique, setup/unload/reload, suppression du panneau et reprise après erreur IO.
  Ce n'est pas un démarrage complet de HA ni un test HTTP d'installation.
- Scénario navigateur reproductible `frontend/tests/browser.html`, bundle compilé,
  données synthétiques uniquement : bootstrap, sélection, changement hass vers
  indisponible, prédiction masquée, retrait/réinsertion ; tous vrais, zéro appel
  aux méthodes HA piégées. Bureau clair 1440 px et mobile sombre 390 px : largeur
  du document égale au viewport, couleurs du thème appliquées. Pas d'audit complet
  avec lecteur d'écran ni de profilage mémoire prolongé. Aucun timer, abonnement
  réseau ou listener global ajouté par le composant.
- `git diff --check` : utiliser l'attribut du bundle généré, dont Lit conserve des
  espaces significatifs dans les littéraux ; aucune suppression manuelle du bundle.

L'environnement HA de test est isolé sous /private/tmp ; seul le runtime HA est
utilisé via unittest (pas les anciens plugins pytest résolus par l'environnement).
Sans HA installé, les trois tests de cycle de vie sont explicitement ignorés.
Le job CI dédié installe HA 2026.11.0 ; **aucune CI distante exécutée** ici.

## Lecture seule, risques et suite

Le frontend ne dispose que de hass.states dans son type ; aucun appel service,
callApi, callWS, fetch, socket ou écriture d'état. Le backend ne crée ni entité,
ni service, ni commande de chauffage : il enregistre uniquement les ressources UI.
Les attributs sont interpolés par Lit, sans unsafeHTML. Pas de jeton stocké dans
le dépôt ou le bundle. Les dépendances npm directes sont épinglées et le lockfile
est conservé ; les actions GitHub restent référencées par tags majeurs (un
épinglage aux SHA serait un durcissement complémentaire).

Le seuil HACS 2026.3.0 n'a pas fait l'objet d'un test multi-version ; la version
validée est 2026.11.0. HACS n'est pas validé par son action officielle dans cet
audit et le dépôt privé n'est pas distribuable depuis le catalogue public.
Pas d'installation, redémarrage, déploiement ou écriture sur le HA principal.
Aucune modification d'un autre dépôt VTH.

**Conclusion : prêt pour un premier test manuel du panneau instantané**, après
accord d'installation, avec réserve explicite sur Recorder et les fonctionnalités
historiques encore absentes. Il ne s'agit pas d'une V2 historique complète.
Tester copie, démarrage, ajout, navigation, rechargement et suppression dans une
instance de développement ; vérifier ensuite les huit séries via une API
historique autorisée avant toute évolution graphique. Ne pas modifier SmartPI
pour rendre ses diagnostics artificiellement plausibles.
