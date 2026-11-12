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

## Vérification des données SmartPI

Les contrôles ont confirmé la découverte des capteurs par `schema_version` et
la présence des huit chemins de diagnostic attendus. Les prédictions Twin non
fiables restent des données brutes ; les états sans attributs restent des trous.
L'absence de statistiques numériques ne prouve pas l'absence d'historique
Recorder. Le consommateur historique lit `history`, sans reconstruire `live`.

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

## 11 novembre 2026 — trajet thermique 0.2.8, essai local sans publication

À la demande explicite de l’utilisateur, le panneau ajoute la sélection de
consigne et de preset. Les assertions historiques de lecture seule ci-dessus
décrivent les versions précédentes. Désormais, seuls deux services climate
sont permis dans `services/climate.ts`, après validation explicite du choix ;
les diagnostics et historiques restent en lecture seule.

- TypeScript : réussi ; 40 tests Node réussis.
- Python 3.14.10 / Home Assistant 2026.11.0, environnement isolé uv : 6 tests
  réussis, dont les 3 cycles de vie ; aucun skip.
- Build reproductible ; bundle local préparé et contrôlé par SHA-256.
- Suite Chrome intégrale sur fixtures synthétiques : navigation, historique,
  clavier, focus, refus, obsolescence, envois différés et absence d’ETA invalide.
- Rendu du trajet vérifié à 1440×1000, 390×844, 320×800, clair et sombre.
- Aucune commande de thermostat réel pendant les validations. Pas de push ni
  de CI distante pour cette version locale.
- Revue académique de portée et journal conservés dans le workspace privé,
  dossier `artifacts/thermal_journey_2026-11-11/` ; aucune certification physique
  ou d’accessibilité revendiquée.

Limites : ETA meilleur cas, sans validation prospective sur l’installation ;
les anciennes vues historiques supposent encore une installation en °C.

## 11 novembre 2026 — observatoire personnel 0.3.0, essai local

- Six usages : reçu de commande, priorités publiées, conseil avant validation,
  souvenirs personnels, essais descriptifs et carnet prospectif du Twin.
- Deux services climate explicites inchangés. L’API admin de métadonnées n’appelle
  aucun service, ne modifie aucune entité et ne crée pas de réglage SmartPI.
  La collecte des états publiés continue panneau fermé, avec Store HA natif borné.
- Typage réussi ; 49 tests Node et 36 tests Python réussis, aucun skip, avec les
  vraies API HA 2026.11.0 dans un environnement isolé Python 3.14.
  Couverture du Store, des droits admin, des suppressions de source, des changements
  de contexte, des interruptions et de la conservation des statistiques cumulées.
- Suite Chrome sur fixtures synthétiques réussie : quatre vues à 1440/390/320 px,
  clavier, aperçus, application explicite, reçus, souvenirs, essais/comparaison,
  prévisions/exclusions, refus de métadonnées et suppression avec confirmation.
  Les opérations de métadonnées n’ajoutent aucun appel climate.
- Bundle reproductible sur deux builds, 209 024 octets, SHA-256
  `88cb18e625e037a52535f4f53e6f35eed5230c1da85e236c7d5efbef022b443d`.
- Relecture ECC étendue aux observations prospectives. Sources, méthodes,
  couverture, exclusions et limites dans VISUAL_DIAGNOSTICS.md. Aucun score de
  prédiction ou d’économie, aucune causalité ni efficacité humaine démontrée.
  Les vues nouvelles emploient l’unité native ; les anciens graphiques °C ne
  constituent pas une compatibilité °F complète.
- Aucun commit/push ni CI distante. Preuves synthétiques et rapport de portée
  conservés hors dépôt dans le workspace privé ; installation documentée séparément.

### Installation locale demandée, après validation

Paquet local 0.3.0 installé sans publication, composant précédent sauvegardé,
empreintes vérifiées avant/après copie et `ha core check` réussi. Redémarrage
Core 2026.11.1 terminé ; entrée confirmée `loaded` via MCP officiel. Panneau et
bundle HTTP 200 ; bundle servi identique au SHA-256 ci-dessus ; Store natif créé.
Les interactions navigateur ont été vérifiées sur fixtures, pas sur les commandes
du thermostat réel. Les coordonnées, sauvegarde et preuves restent hors dépôt.

## 11 novembre 2026 — durcissement ECC 0.3.1

Revue ciblée avec `ecc:security-review` et `ecc:verification-loop` : frontières
HA/session, API admin, entrées, stockage local, concurrence, rendu de textes,
commandes explicites et dépendances verrouillées. Aucun service thermostat ajouté.

Défauts reproduits avant correction : une erreur disque pouvait être journalisée
par Store sans invalider la confirmation de sauvegarde ; fichier 0644 ; requête
sur observateur arrêté encore acceptée ; champs inattendus acceptés dans certaines
mutations. Les tests de refus échouaient avant correction, puis passent.

Corrections : fichier 0600, écritures atomiques, identifiant de sauvegarde vérifié
par relecture indépendante, validation des requêtes/carnets/réponses imbriquées,
verrou des requêtes et arrêt coordonné, débit API borné, choix climate copié et
revalidé, délai d’écriture explicitement incertain et reprise après reconnexion.
Les observations arrivant pendant une sauvegarde sont conservées en mémoire.

Validation locale : TypeScript et build réussis, 55 tests Node et 46 tests Python
réussis avec HA 2026.11.0, aucun skip. Suite Chrome sur données synthétiques réussie,
y compris texte HTML échappé, réponse mal formée et reconnexion pendant sauvegarde.
Ruff E9/F et diff --check réussis ; aucun secret ni HTML utilisateur interprété
trouvé dans les sources examinées. Audit npm : 0 vulnérabilité connue signalée
à la date du contrôle. Aucun correctif de dépendance automatique.

Bundle reproductible : 211 113 octets, SHA-256
`aabfd13a5011f3b16e65be786efb14f6e7f18d5c814fa73908b79d29b2f4c018`.
Les preuves restent dans le workspace privé. Ces contrôles ciblés ne constituent
pas un test d’intrusion exhaustif ni une garantie d’absence de vulnérabilité.
Aucun commit, push ou exécution CI distante.

Le contrôle sur cible a aussi révélé que le flux fréquent pouvait reporter sans
cesse l’écriture différée. Défaut reproduit puis corrigé : une seule sauvegarde
reste programmée jusqu’à consommation de l’instantané par HA. La suite complète
passe après cette correction, intégrée au paquet final 0.3.1.

Installation locale finale vérifiée : contrôle de configuration réussi,
redémarrage Core 2026.11.1 terminé, entrée `loaded` via MCP officiel, panneau et
bundle HTTP 200 avec empreinte identique. Fichier du carnet en 0600 constaté
sur cible, sans lecture de son contenu privé. Les sauvegardes de retour arrière
et les coordonnées de l’instance restent hors dépôt.

Une nouvelle écriture du carnet en arrière-plan a été observée sur cible par
son changement de date, toujours en 0600 et sans lecture des données.


## 12 novembre 2026 — nouvelles visualisations 0.3.2

Bande de commande proportionnelle au pourcentage appliqué au-dessus de la règle,
avec chevron de retour visé indépendant, zéro conservé et fraîcheur contrôlée.
Les aperçus ne changent pas la référence active ; l’ETA conserve ses gardes.
Trois graphes historiques : nuage écart filtré/commande en Supervision, demande
et sortie avec zone entre courbes dans Régulation, parcours A/B en Santé du modèle.
Sources séparées, couples de même publication, lacunes explicites et aucune
confiance actuelle appliquée au passé. Vues XY bornées à 600 points, réduction
annoncée, dates, sélection clavier et tables paginées. Le nuage ouvre l’inspection.

Relecture ciblée ECC scientifique, frontend, accessibilité et verification-loop.
La matrice de VISUAL_DIAGNOSTICS.md précise champs, référence SmartPI et limites.
Ces graphes ne mesurent ni énergie, causalité ni qualité du modèle. La convention
°C historique demeure ; la règle conserve son support des unités natives.

Validation locale : TypeScript, build, 66 tests Node et 46 tests Python avec
HA 2026.11.0, zéro échec/skip ; Ruff E9/F et diff --check réussis. Chrome isolé
sur fixtures : anciens scénarios conservés, proportions, dépassement/commande
positive ou nulle, mode cool, absences/péremption, séparation live/historique,
sélection clavier du nuage, lacunes A/B et demande/sortie, remplissage confirmé
dans les deux sens, libération des ResizeObserver/uPlot. Rendu revu en clair et
sombre à 1440, 390 et 320 px ; preuve structurée vérifiée. Audit ciblé, sans
certification WCAG ni essai lecteur d’écran exhaustif.

Bundle reproductible sur deux builds : 228 879 octets, SHA-256
`26ce8610d4ff4ecfc195b465eafa402b44f5e005f6e8373501f694796ed541b7`.
Aucun appel réseau ou service ajouté par ces vues. Aucun commit/push ni CI distante.
Le dossier `.codegraph/` est ignoré et reste hors index. Rapports et captures
synthétiques sont conservés dans le workspace privé.

Installation locale 0.3.2 autorisée et vérifiée : composant précédent sauvegardé,
15 fichiers du paquet contrôlés avant/après copie et après redémarrage. Contrôle
de configuration réussi ; Core 2026.11.1 redémarré, entrée `loaded` via MCP officiel.
Panneau et bundle HTTP 200, empreinte servie identique. Les commandes du thermostat
réel n’ont pas été exercées ; le carnet privé n’a pas été lu ou modifié par SSH.
Sauvegarde et preuves de restauration conservées dans le workspace privé.


## Publication des sources 0.3.2 — 12 novembre 2026

Sur demande explicite, les sources, le bundle testé, les tests, le changelog
reconstitué et la préparation Marketplace sont réunis pour publication sur main.
Les 66 tests Node, 46 tests Python, typage/build, navigateur sur fixtures et
installation locale ci-dessus portent sur le même bundle. Les modifications
suivantes sont documentaires. `.codegraph/`, notes de reprise et preuves privées
sont exclus du commit. Aucun tag ou release n’est créé. Les résultats de la CI
sur ce commit restent à vérifier après le push ; ils ne sont pas présumés réussis.
