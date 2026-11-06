# Visual diagnostics 0.2.0

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

Contrôle initial 48 h, du 4 novembre 16:30:24 UTC au 6 novembre 16:30:24 UTC,
avec état initial demandé pour inspection :

| Capteur (nom court) | États reçus | Publications numériques température | Autres séries numériques (chacune) |
| --- | ---: | ---: | ---: |
| Emilien | 940 | 927 | 933 |
| Cuisine | 1245 | 1228 | 1238 |
| Salle | 1480 | 1461 | 1473 |
| Salon | 1316 | 1303 | 1309 |

Les huit chemins sont effectivement présents. Des états sans attributs/schéma
existent et deviennent des trous. **Aucun `live` n'est enregistré** dans ces
réponses. L'absence de statistiques numériques du précédent audit n'était donc
pas une absence d'historique Recorder. Aucun export brut ni secret n'est publié.

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
un détail pédagogique. Le mode expert expose les chemins `attributes.live` et
les raisons disponibles. Sur mobile les mêmes blocs/détails deviennent des
boutons lisibles ; aucun flux animé permanent. La chaîne U affiche les données
publiées, avec conversion explicite ratio FF ×100, sans calculer de prétendues
pertes entre espaces non comparables. Les valeurs signées restent visibles.

**Cette correspondance est vérifiée pour ces sources, pas garantie pour toutes
les futures versions de SmartPI.** Toute évolution des branches ou du contrat
doit entraîner une nouvelle revue de cette matrice et des tests. Le numéro de
schéma seul ne prouve pas une identité algorithmique entre versions.

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

- TypeScript et build : réussis ; bundle autonome d'environ 128 Kio.
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
