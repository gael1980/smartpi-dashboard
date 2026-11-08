# Visual diagnostics 0.2

## Régulation en direct (0.2.4)

Le bandeau lit quatre valeurs dans la même publication `attributes.live`.
Le chemin PI relie la demande aux limites puis à la sortie. En hystérésis
ou en calibration, le chemin direct relie la décision à la sortie et la
demande PI est masquée. Si la voie est inconnue, les valeurs disponibles
restent visibles sans flèche de commande. Le schéma complet reste accessible.

| Élément | Champ et règle |
| --- | --- |
| Température et consigne | `temperature.indoor` et `setpoint.filtered_setpoint`, consigne de la voie P |
| Demande et sortie | `power.command_percent` et `power.applied_percent`, pourcentages de commande |
| Temporisation | `analysis.control.forced_by_timing`, booléen publié. Absent reste indisponible. |
| Saturation PI | `control.saturation_state`, libellé pour `SAT_HI` et `SAT_LO` |
| Cycle engagé et candidat | `power.current_cycle_percent` et `power.next_cycle_percent`, signaux distincts dans la fiche sortie |

Le motif utilise les champs publiés. La différence entre demande et sortie ne
sert pas à attribuer une cause. Le schéma ne relie pas la consigne filtrée à
la décision directe. La chaîne détaillée précise les espaces de commande
lorsqu’une courbe de vanne est active.

« Voir dans Supervision » utilise l’horodatage normalisé et recherche une
publication dans la source et la fenêtre actives. Une première observation de
session ne peut pas correspondre. Si le point manque, Supervision ouvre
l’instantané courant et affiche un message. La recherche ne lance aucune
lecture supplémentaire et ne sélectionne pas le point le plus proche.

## Supervision et inspection d’une publication

La vue d’accueil réunit un synoptique compact, trois tendances et un inspecteur.
Sur écran étroit, les tendances passent en premier. Un événement du journal,
un clic sur un graphe ou le bouton de date dans une table sélectionne un point
existant. Les trois graphes marquent la même date. Le curseur de survol reste
disponible pour parcourir les courbes sans déplacer la sélection.
Les boutons PI et Anticipation ouvrent leur détail et réaffichent leur
série de commande si elle était masquée. Modèle thermique ouvre les
estimations A/B et l’équilibre Twin sous ses conditions de fiabilité.

La sélection est liée au thermostat, à la source et à l’horodatage. L’inspecteur
affiche les valeurs de ce point et identifie Recorder ou Session. La première
observation de session est signalée comme telle. Une lacune explicite reste
inspectable sans inventer de valeur et le zéro reste visible. La mise en évidence
de la voie s’appuie sur les champs internes du point sélectionné. Avec le
Recorder standard, le synoptique reste neutre quand ces champs sont absents.
Revenir au direct retire le repère et affiche l’instantané courant.

Les métriques intégrées, les comparaisons de réglages et le banc de simulation
demandent leur propre contrat de données et leur validation expérimentale.

## Lecture des écarts (0.2.2)

La vue Évolution résume les publications de sa fenêtre et de sa source actives.
Un couple valide contient `history.temperature.indoor` et
`history.setpoint.filtered_setpoint`, numériques et finis dans la même
publication v2. L’écart signé vaut consigne filtrée moins température intérieure.
La médiane signée et la médiane absolue décrivent respectivement le centre et
la taille de l’écart parmi les observations. Pour un effectif pair, le calcul
prend le milieu des deux valeurs centrales. Deux couples sont requis pour le
résumé. Le compte total inclut les publications incomplètes. L’intervalle
maximal est mesuré entre deux couples valides consécutifs dans la fenêtre.

Le calcul attribue le même poids à chaque publication. Son objet est la
distribution empirique des points visibles, dont la densité peut varier
avec le signal. Cette distinction est motivée par le problème général
d’observation irrégulière décrit par [Lin, Scharfstein et Rosenheck (2004)](https://doi.org/10.1111/j.1467-9868.2004.b5543.x).
Une évaluation du confort, de l’énergie ou de la réponse à un changement
de consigne demande des données et un protocole adaptés. Le cadre
[BOPTEST de Blum et al. (2021)](https://bies.lbl.gov/publications/building-optimization-testing)
illustre ces exigences en simulation. La vue Régulation en direct présente
l’instantané indépendamment des contrôles temporels.

## Architecture et données

L'intégration Python conserve sa configuration unique et son panneau administrateur.
Le frontend utilise Lit/TypeScript avec cinq composants : `VisualDiagnostics`
(vues, fenêtre, état de chargement), `TimeChart` (uPlot), `ControlDiagram` (SVG et
alternative mobile), `CommandChain`, et le panneau principal qui conserve les
résumés et les diagnostics techniques 0.1.

- `services/history.ts` : seule capacité réseau, lecture officielle authentifiée
  `history/history_during_period` via la session `hass.callWS`. Aucun jeton,
  endpoint externe ou commande d'écriture. Fenêtre maximale de 48 h, quatre
  tranches séquentielles de 12 h, une seule entité sélectionnée.
- `utils/timeseries.ts` : validation du schéma, timestamps, trous, événements et
  classe `SessionHistory` bornée (48 h, 12 000 publications par capteur). Pas de
  stockage persistant, minuterie de collecte ou abonnement ajouté à HA.
- `utils/control.ts` : classe `ControlPresentation`, lecture des chemins publiés
  pour le schéma et les barres ; aucun contrôleur ni estimateur réimplémenté.
- Une génération de requête évite d'afficher la réponse d'un ancien thermostat.
  Un retrait annule les tranches suivantes et ignore la réponse en vol. La
  commande WS en cours n'est pas annulable ; ses résultats ne sont pas réinjectés.
- uPlot et ResizeObserver sont détruits au retrait et à la recréation du graphe.
  Les boucles de redimensionnement/zoom sont évitées par comparaison des bornes.

### Choix des graphiques

uPlot **1.6.32** (MIT) utilise Canvas, dispose de curseurs synchronisés, de zoom
horizontal et de légendes interactives. Il est adapté à des milliers de points
avec moins de dépendances et un bundle plus petit qu'ECharts ou Plotly ; Chart.js
est polyvalent mais nécessite plus de personnalisation/plugins pour les courbes
synchronisées. Le bundle reste autonome, y compris les styles uPlot dans le
Shadow DOM. Les notices MIT et BSD de Lit accompagnent le JavaScript.
L'ancien `smartpi-dash` est GPL-3.0 : seuls ses concepts ont été étudiés, aucun
code, transformation ou SVG n'est repris. Les fichiers historiques étudiés sont
`templates/dashboard.html`, les trois diagrammes statiques, `transforms.py` et
`REPORT_model_health_graphs.md` (référence `797d2b656031775e27031e29468a564c6a840e1e`).
Les seuils de détection et attributs hérités de cette application ne sont pas repris.

## Validation du Recorder réel

Le 6 novembre 2026, lecture via la session authentifiée du navigateur HA,
**sans installation du nouveau bundle**. API de HA Core 2026.11.0 : réponse
compressée `{entity_id: [{s, a, lu}]}`, `lu` en secondes Unix, attributs dans `a`.
La requête utilise attributs complets et changements non limités aux états
significatifs : `minimal_response=false`, `no_attributes=false`,
`significant_changes_only=false`. Le produit utilise
`include_start_time_state=false` pour éviter de créer des publications aux
frontières des tranches ; aucune interpolation de points n'est ajoutée.

La vérification sur 48 h a confirmé la présence des huit chemins. Des états
sans attributs ou sans schéma existent et deviennent des trous. Aucun `live`
n'était enregistré dans les réponses examinées. Ce contrôle de transport ne
valide pas les estimations du modèle.

## Contrat des courbes et interprétation

| Vue | Source exacte | Unité / règle |
| --- | --- | --- |
| Température | `history.temperature.indoor` | °C, mesure publiée |
| Consigne | `history.setpoint.filtered_setpoint` | °C, consigne de la voie P, pas nécessairement consigne brute utilisateur |
| Écart filtré | consigne filtrée − température, **dans le même état** | °C ; pas l'erreur signée brute de I et pas une bande de confort |
| Appliquée / demandée / PI / FF | `history.power.{applied,command,pi,ff}_percent` | %, jamais des watts ; échelle étendue si nécessaire, y compris valeurs négatives |
| Modèle A | `history.model.a` | °C/min/u, estimation apprise |
| Modèle B | `history.model.b` | min⁻¹, estimation apprise |

Fenêtres 1, 3, 6, 12, 24 et 48 h ; glisser pour zoomer, boutons tactiles/clavier
pour zoom et déplacement, retour à la fenêtre initiale, légende cliquable,
curseurs temporels synchronisés. Les tableaux accessibles exposent les 200
dernières publications, sans limiter les courbes. Dates en heure du navigateur
(les données utilisent des timestamps UTC ; passage heure d'été/hiver testé).

Les valeurs absentes, non finies ou issues d'un schéma autre que 2 sont nulles,
jamais zéro. `unknown`/`unavailable` interrompent les lignes. Les publications
sont irrégulières : une longue période sans nouvelle publication ne suffit pas
à établir une panne (SmartPI supprime les publications identiques). Les segments
entre points sont une représentation visuelle, pas des mesures supplémentaires.
Aucune zone de bande morte n'est tracée : ses limites exactes historiques ne
font pas partie du contrat stable. La confiance live n'est pas appliquée
rétroactivement aux courbes A/B.

## Schéma fidèle aux branches SmartPI

Sources vérifiées dans `KipK/vtherm_smartpi` au commit
[`7272c25766d848ab637977ed9f8ac6957c597686`](https://github.com/KipK/vtherm_smartpi/tree/7272c25766d848ab637977ed9f8ac6957c597686) :

- `algo.py`, `_manage_setpoint` : façonnage en Stable seulement ; P utilise la
  consigne filtrée ; I utilise la consigne brute. Les erreurs sont signées selon
  le mode HVAC. Le schéma regroupe P/I mais explicite ces deux voies dans le détail.
- `smartpi/feedforward.py`, `compute_ff` et `algo.py`, `_apply_gains_and_ff` :
  FF final = clamp(FF1 + FF2, 0, 1) ; candidat FF effectif = clamp(FF final + FF3,
  0, 1). **En bande morte, le FF runtime est FF final, sans FF3**. La valeur
  réellement retenue est publiée dans `power.ff_percent`.
- `smartpi/controller.py`, `compute_pwm` : commande = clamp(PI + FF runtime, 0, 1).
  Hold est un état de maintien, pas une contribution supplémentaire à additionner.
  Les protections de l'intégrale et le gel sont décrits par leurs motifs publiés.
- `algo.py`, `calculate` : gouvernance/gains/FF et PI précèdent les limitations
  douces (pente/maximum), puis les contraintes de timing. La courbe de vanne peut
  changer l'espace de commande. Le contrôle présente des candidats et des cycles
  engagés : les barres ne sont pas un bilan additif ou énergétique.
- La calibration et l'hystérésis retournent **avant** la voie PI/FF et les
  limitations de cette voie. Le schéma dessine leur chemin direct vers la sortie
  et atténue les blocs contournés. Il ne relie pas PI + FF à une sortie bang-bang.
- En l'absence de régime vérifiable, l'interface dit « Chemin non vérifié ».
  Le schéma est logique : il ne prétend pas reconstruire toutes les priorités
  externes VTherm/HA ni observer directement le système physique.

Chaque bloc affiche son statut et ses valeurs, reçoit le focus clavier et ouvre
une fiche qui relie le principe de régulation, les signaux publiés et leur
motif. L’heure affichée est celle de la mise à jour du capteur, pas une
mesure du moment où l’algorithme a pris une décision. Le mode expert expose
les chemins `attributes.live` et les conditions de fiabilité. Sur mobile les mêmes blocs/détails deviennent des
boutons lisibles ; aucun flux animé permanent. La chaîne U affiche les données
publiées, avec conversion explicite ratio FF ×100, sans calculer de prétendues
pertes entre espaces non comparables. Les valeurs signées restent visibles.

**Cette correspondance est vérifiée pour ces sources, pas garantie pour toutes
les futures versions de SmartPI.** Toute évolution des branches ou du contrat
doit entraîner une nouvelle revue de cette matrice et des tests. Le numéro de
schéma seul ne prouve pas une identité algorithmique entre versions.

### Fiches de boucle (0.2.1)

| Fonction | Signaux supplémentaires | Lecture correcte |
| --- | --- | --- |
| Suivi et PI | `analysis.control.error_p`, `temperature.error`, `temperature.integral_error`, `control.{kp,ki,ti_min}`, `analysis.governance.kp_source` | Erreur P et erreur brute I distinctes ; l’état de l’intégrale n’est pas sa contribution isolée à la commande. |
| Anticipation | `analysis.feedforward.u_ff_effective`, `control.in_deadband`, `feedforward.fftrim` | Le candidat avec FF3 et la sortie FF retenue restent séparés. Les corrections internes sont des ratios ; l’anticipation retenue est publiée en %. |
| Contraintes | `analysis.control.{forced_by_timing,aw_du}`, `temperature.integral_guard_source`, `power.{current_cycle_percent,next_cycle_percent,linear_current_cycle_percent,linear_next_cycle_percent}` | Contraintes déclarées, pas de causalité déduite d’une différence. Commande, cycle engagé et espace linéaire identifiés séparément. |
| Modèle | `model.{b,tau_min,deadtime_heat_s,deadtime_cool_s}`, `learning`, `governance`, `analysis.twin` | Masquage de τ et des temps morts selon leurs drapeaux ; Twin après warm-up et avec fiabilité affirmée, équilibre derrière son propre drapeau. |

Le chemin actif et les contraintes sont mis au premier plan, avec des détails
à la demande, d’après les principes de conception de [Vicente et Rasmussen
(1992)](https://backend.orbit.dtu.dk/ws/files/158017888/SMC.PDF).
La séparation de la demande, de la commande et de l’état de l’intégrale suit
la distinction étudiée par [Åström et Rundqwist (1989)](https://cse.lab.imtlucca.it/~bemporad/teaching/controllodigitale/pdf/Astrom-ACC89.pdf).
La littérature motive la représentation ; les champs viennent du
[schéma de diagnostics SmartPI](https://github.com/KipK/vtherm_smartpi/blob/master/custom_components/vtherm_smartpi/smartpi/diagnostics.py).
Aucun gain, terme PI ou signal historique n’est reconstruit par les fiches.

## Santé du modèle et Twin

A/B : courbes séparées, aucune réidentification, lissage ou référence inventée.
Temps morts et τ : instantanés avec indicateurs affirmatifs de fiabilité. Twin :
températures estimée/prédite, innovation, RMSE et perturbation affichées seulement
avec modèle fiable et warmup explicitement terminé. Équilibre et atteignabilité
exigent en plus `twin_T_steady_reliable=true`. Une fiabilité déclarée n'est pas une
validation physique indépendante. Aucun graphique Twin n'est produit : les huit
séries standard ne le contiennent pas, et la session n'est pas fusionnée à Recorder.

## Événements et repli

Le journal compare les publications : consigne **filtrée**, phase/état du capteur,
et seulement si live est disponible, saturation, FF3, temps mort, apprentissage,
gouvernance et autocalibration. Il indique une transition observée, sans prétendre
connaître l'instant interne exact ou la cause d'une variation de consigne.
Aucun seuil arbitraire de changement de consigne, pas de comparaison à travers
une valeur manquante. Les 60 dernières variations de la fenêtre sont affichées.

En cas de refus, réponse vide ou absence d'API, le repli porte explicitement
« Historique de session ». Le premier point est horodaté à l'observation dans la
session, pas au démarrage supposé du capteur. Les points suivants proviennent des
changements de `last_updated`, sans cadence promise, polling, debug ou écriture.
La case « Session uniquement » permet de choisir cette source ; elle n'est jamais
fusionnée silencieusement avec les données Recorder. Une nouvelle période ne
fabrique pas le passé. Au retrait du panneau la mémoire de session est libérée.

## Tests reproductibles et limites

```sh
cd frontend
npm ci
npm run typecheck
npm test
npm run build
cd ..
python3 -m unittest discover -s tests -v
```

Les trois tests HA nécessitent Python 3.14 et `homeassistant==2026.11.0` dans un
environnement isolé. Sans HA, ils sont explicitement ignorés. Les tests navigateur
utilisent exclusivement `frontend/tests/visual-browser.html`, des séries
synthétiques, et Chrome isolé démarré avec un port de débogage local 9224 ; servir
la racine du dépôt sur 127.0.0.1:8765 puis lancer
`node frontend/tests/browser-runner.mjs`. Voir le workflow pour les commandes.
Le runner vérifie les trois vues mobile, zoom, légende, synchronisation, échelle
signée, gaps, modèle, schéma, clavier, navigation, permissions, repli et nettoyage.
Ses captures restent des données synthétiques.

L'environnement local a validé le transport Recorder réel et les composants sur
fixtures. **Le nouveau panneau n'a pas été installé ni injecté dans le HA principal.**
Un test d'installation complet, l'exhaustivité de l'accessibilité avec lecteur
d'écran et la compatibilité avec d'autres versions de SmartPI/HA restent à faire.
Aucun thermostat, consigne, coefficient, calibration, Recorder ou configuration HA
n'est modifié. Aucun déploiement ni redémarrage autorisé par cette livraison.

### Résultats locaux avant publication

- TypeScript et build : réussis ; bundle autonome d'environ 131 Kio.
- Tests Node : **20 réussites, zéro échec/skip**.
- Tests unittest avec HA 2026.11.0/Python 3.14.10 : **6 réussites, zéro échec/skip**.
- Runner Chrome isolé : 5 760 publications synthétiques, 3 courbes initiales,
  zoom/déplacement, légende, curseurs synchronisés, amplitudes hors 0–100 %, trous,
  événements, 8 blocs SVG, activation clavier et provenance, changement de régime,
  navigation, 2 courbes modèle, masquage Twin, trois vues mobile à 390 px,
  refus/absence Recorder, réactivité et nettoyage : tous vérifiés, **zéro écriture**.
- Thèmes : rendu clair 1440×1000 et sombre 390×844 revus ; axes repeints lors
  du changement de thème et dates espacées pour rester lisibles.
- `npm audit` : zéro vulnérabilité connue à la vérification.
- Validation des preuves de rendu par la skill frontend-design-direction et
  `git diff --check` réussis. Captures synthétiques conservées hors dépôt.

Les résultats des GitHub Actions après publication seront reportés dans la PR ;
ces résultats locaux ne sont pas présentés comme une CI déjà exécutée.

### Revue ECC complémentaire

Les perspectives code/erreurs, tests/simplification et contrats/types/accessibilité
ont été relues avec les skills ECC disponibles. Trois constats confirmés ont été
corrigés :

1. La session suit maintenant les nouvelles publications dans la fenêtre visible.
   Un zoom/déplacement suspend ce suivi ; la réinitialisation ou la case de suivi
   permet de revenir au présent. Le test vérifie les points réellement affichés.
2. Le filtrage est mémorisé et uPlot n'est plus recréé sur une mise à jour HA sans
   impact sur les séries. Le test vérifie l'identité des instances après la
   modification d'une entité étrangère.
3. Des boutons natifs exposent les séries avec `aria-pressed`, en complément de la
   légende uPlot. Activation par Entrée et persistance sont testées dans Chrome.

Les callbacks de zoom ne publient pas de changement de fenêtre pendant
l'initialisation ni depuis une instance obsolète. Le premier run Linux de la PR
avait bloqué lors de l'initialisation navigateur ; la correction garde le test
actif. Les tests déterministes utilisent UTC/en-US dans leur navigateur isolé.
Les résultats de la nouvelle CI sont suivis dans la PR, sans effacer ce premier échec.
Les skills utiles sont déjà installées dans l'environnement Codex/ECC et sont
référencées dans AGENTS.md ; aucune copie externe supplémentaire n'est ajoutée.
