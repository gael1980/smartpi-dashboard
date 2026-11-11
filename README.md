# SmartPI Dashboard

Panneau scientifique **en lecture seule** pour comprendre SmartPI dans Home Assistant.

## Aperçu

Ces captures utilisent uniquement des données de démonstration synthétiques.

**Schéma complet de la boucle** : visualisez le chemin de commande et le retour de mesure.

![Schéma complet de la boucle de régulation](docs/images/regulation-boucle.png)

**Inspection d’un bloc** : sélectionnez le régulateur PI pour examiner les signaux publiés.

![Inspection du régulateur PI dans le schéma](docs/images/regulateur-pi.png)

**Supervision** : consultez le synoptique et les tendances historiques.

![Vue de supervision et graphique de température](docs/images/supervision.png)

## Principes
- Aucun changement de consigne, service, calibration ni écriture dans Home Assistant.
- Découverte automatique des capteurs SmartPI Diagnostics (schéma v2).
- Résumé simple puis explications détaillées dépliables.
- Les valeurs absentes ou non fiables ne sont jamais présentées comme certaines.
- Aucun jeton API, serveur Flask ou entité HA supplémentaire.

## État du développement

**Version 0.2.7** — panneau natif avec graphiques température/consigne, commandes,
écart filtré et modèle A/B sur 1–48 h. Zoom, déplacement, curseurs synchronisés,
légende interactive, tables accessibles, schéma logique cliquable et chaîne U.
Les vues Supervision, Régulation en direct, Santé du modèle et Apprentissage
proposent un mode expert.
La vue Supervision relie le synoptique, le journal et les tendances à un
inspecteur de publications. Elle indique le nombre de couples valides et décrit l’écart à la
consigne filtrée sur les publications de la fenêtre sélectionnée.
En direct, un bandeau réunit la mesure, la consigne filtrée et les deux
commandes. Le chemin actif, le motif publié et les cycles se lisent dans
l’inspecteur. « Voir dans Supervision » recherche la même publication dans la
source et la fenêtre affichées.
Le schéma relie chaque bloc aux signaux et motifs publiés, dont les erreurs P et I,
les gains, l’anti-windup et les contraintes de cycle.

### Suivre l’apprentissage

En haut de la pièce sélectionnée, deux barres suivent les mesures A et B
conservées par SmartPI jusqu’à l’objectif publié, actuellement 31 par coefficient.
Le premier palier de 5 mesures reste indiqué après le bootstrap. Le panneau
affiche aussi l’étape, la confiance publiée du modèle, les temps morts fiables
ou attendus, le délai de réponse et les derniers motifs d’apprentissage.

Dans l’onglet **Apprentissage**, la température et la consigne filtrée partagent
la plage temporelle avec la commande appliquée. Le fond orange indique une
hausse de température entre deux mesures, le bleu une baisse. Les compteurs
historiques disponibles alimentent également un graphe de collecte A/B.

Les repères A/B distinguent les mesures collectées des mises à jour acceptées.
Leur date correspond à la publication ou à l’observation, et leur détail précise
l’intervalle entre publications. Deux repères à la même date peuvent couvrir
des apprentissages survenus à des instants différents. Les repères chauffe et
refroidissement montrent les détections observées ou les changements de médiane
fiable publiés par SmartPI.

Le Recorder standard conserve les courbes sans les compteurs ni les temps morts.
Lorsque ces champs historiques manquent, le panneau l’indique et propose
**Observer les prochains apprentissages en session**. Cette observation commence
avec les diagnostics reçus pendant l’ouverture du panneau. Les bornes physiques
des épisodes de temps mort restent indisponibles dans le schéma public.

Les pourcentages décrivent le remplissage de l’historique. La confiance du modèle
et les drapeaux de fiabilité sont affichés séparément.

Lecture Recorder via la session authentifiée de Home Assistant ; repli explicite
sur un historique de session en mémoire si les données sont absentes ou refusées.
Les diagnostics techniques de la version 0.1 restent accessibles.
Voir [VISUAL_DIAGNOSTICS.md](VISUAL_DIAGNOSTICS.md) pour les sources, la fidélité
au code SmartPI, l'architecture et les limites scientifiques.

## Installation

Avec Home Assistant 2026.11 ou une version ultérieure, ajouter ce dépôt comme
dépôt personnalisé de type **Intégration** dans **Paramètres → Marketplace**,
puis le télécharger. Cette méthode nécessite que le dépôt soit public et ne
signifie pas qu'il est référencé dans le catalogue par défaut.

Après le téléchargement, ajouter **SmartPI Dashboard** dans **Paramètres →
Appareils et services → Ajouter une intégration**, puis ouvrir le panneau dans
la barre latérale (administrateurs seulement). Un redémarrage est nécessaire
après une mise à jour d'une intégration déjà chargée.

Installation manuelle :

1. Dans `frontend`, exécuter `npm install && npm run build`.
2. Copier `custom_components/smartpi_dashboard/` (incluant le bundle généré dans `frontend/`) vers le dossier `config/custom_components/smartpi_dashboard/` de Home Assistant.
3. Redémarrer Home Assistant, puis **Paramètres → Appareils et services → Ajouter une intégration → SmartPI Dashboard**.
4. Ouvrir **SmartPI Dashboard** dans la barre latérale (administrateurs seulement).

La compilation nécessite Node.js 22+. Rien à installer sur le serveur HA après compilation.
Le transport Recorder a été vérifié en lecture seule sur HA 2026.11.0.

## Développement

```bash
cd frontend
npm install
npm run typecheck
npm test
npm run build
```

Sources de référence :
- https://github.com/KipK/vtherm_smartpi/blob/master/documentation/en/diagnostics.md
- https://github.com/gael1980/smartpi-dash
- https://developers.home-assistant.io/docs/frontend/custom-ui/
- https://contributors.home-assistant.io/marketplace/guides/integrations/

## Validation avant installation

Consulter [AUDIT.md](AUDIT.md) pour les résultats, les limites et le protocole de test.
Les tests structurels se lancent avec `python3 -m unittest discover -s tests -v`.
Pour inclure les tests de cycle de vie, utiliser un environnement Python 3.14
isolé avec `homeassistant==2026.11.0` installé (sinon ces trois tests sont ignorés).
La CI exécute également ce groupe dans un job dédié.

Pour vérifier le rendu sans HA, servir la racine du dépôt avec un serveur HTTP
local et ouvrir `frontend/tests/browser.html` : uniquement des données synthétiques,
aucune connexion à Home Assistant. `window.auditResult` donne les contrôles du scénario.
Le frontend utilise `hass.states` et une seule commande de lecture historique
`history/history_during_period` via la connexion HA authentifiée ; aucun appel de service. La liaison climate exige la référence explicite
`specific_states.regulation_diagnostics` ; les noms d'entités ne constituent pas une preuve.
Les valeurs non fiables sont masquées dans les champs interprétés ; le JSON brut
reste destiné à l'inspection technique et ne valide aucune estimation.

Le test navigateur V0.2 est `frontend/tests/visual-browser.html` ; il simule Recorder,
les états indisponibles et les erreurs d'autorisation. Le runner et la CI vérifient
les interactions avec Chrome isolé, sans connexion au HA principal.

Les notices des bibliothèques embarquées sont livrées dans
`custom_components/smartpi_dashboard/frontend/THIRD_PARTY_NOTICES.md`.
Le code du projet est distribué sous [licence MIT](LICENSE) ; les licences des
bibliothèques embarquées restent applicables.
