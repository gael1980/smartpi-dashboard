# Changelog

## Non publié

- Panneau traduit en anglais : la langue suit celle de l’utilisateur Home
  Assistant (français pour le français, anglais pour les autres langues). Le
  français reste la langue source dans le code (`tr("…")`) ; le catalogue
  `frontend/src/locales/en.ts` associe chaque texte français à sa traduction.
- Dates et nombres formatés selon la langue Home Assistant au lieu de `fr-FR`
  fixe. Les messages et motifs du composant restent stockés en français et sont
  traduits à l’affichage.
- Test de complétude : chaque texte traduisible doit exister dans le catalogue
  anglais avec les mêmes paramètres.

## 0.5.0 — 2026-11-15 — Fiabilité et explications SmartPI

- Durcissement reproductible de la fusion d’options uPlot pour empêcher les
  traversées de prototypes et traiter l’alerte CodeQL nº5.
- Suspensions décodées depuis les états VTherm publiés : sécurité, délestage,
  fenêtre manuelle/automatique et bypass ; anciennes données inconnues conservées.
- Trois barres temporelles sous les températures : fenêtre, sécurité, délestage,
  avec périodes inconnues hachurées, provenance carnet local et table accessible.
- Navigation entre pièces sans fausse attente du Twin ; coupures des courbes et
  phases thermiques sur lacunes longues, changement d’unité ou de contexte.
- Unités archivées respectées dans journaux, projections, médianes et détails ;
  agrégats incompatibles refusés. Kp, Ki et intégrale archivés restitués en relecture.
- Inventaire administrateur des carnets sans diagnostic, consultation et
  suppression explicite pour libérer le quota, y compris sans capteur actif.
- Documentation française d’installation alignée sur la distribution par release.
- Explications du maintien et du dernier transfert FF/intégrale sur motifs publiés,
  gains et mémoire PI sur trois courbes facultatives, attentes d’apprentissage
  rapprochées de leurs motifs. [Détail](docs/SMARTPI_EXPLANATIONS_PROPOSAL.md).
- Reconnexion pendant un envoi : aperçu invalidé, résultat incertain explicite,
  aucun renvoi implicite de commande.

Historique de développement de SmartPI Dashboard depuis le 6 novembre 2026.
Les dates correspondent au développement, pas à des dates de releases GitHub.
Les étapes 0.1.0 à 0.2.7 étaient déjà présentes dans l’historique publié.
La publication des sources 0.3.2 regroupe aussi les étapes de développement
0.2.8, 0.3.0 et 0.3.1, testées et installées localement avant leur push.
L’étape 0.2.6 est attestée par les notes locales, mais n’a pas de commit ou tag
propre dans ce dépôt. Les pushes initiaux ne créaient pas de release GitHub.
Seules les étapes dont une trace est conservée sont décrites.

## 0.4.0 — 2026-11-15 — Lecture des données et observations descriptives

- Cartes des thermostats : mode nommé et contour coloré, consigne normale et
  filtrée, commande appliquée avec remplissage proportionnel depuis le bas.
  Sélection indépendante ; commande zéro distincte d’une valeur absente/ancienne.
- Légende datée : dernière publication de la fenêtre par défaut, point consulté
  conservé au toucher et à la sortie du curseur. Champs manquants indiqués à
  cet instant, sans remplissage des trous ni mélange Recorder/session.
- Phase publiée de surveillance : résumé compact et détails dépliables, sans
  les deux barres de collecte. Collecte, bootstrap et modèle à consolider restent
  développés, même lorsque les compteurs atteignent 100 %.
- Fraîcheur et provenance proches des valeurs, qualité de la fenêtre explicite,
  relecture du schéma sur publication archivée avec navigation clavier.
- Comparaison des pièces sur axes communs, séparée par unité enregistrée,
  dernière heure de session uniquement ; aucun classement de performance.
- Bilans prospectifs par consigne normale : plage mesurée, première présence
  dans une tolérance de lecture, dépassement orienté et exclusions explicites.
- Carnet Twin avec repères annoncé/observé ; aucun score entre scénarios
  différents ni prévision à horizon fixe inventée.
- Export admin borné des points déjà observés, contexte enregistré et séparateurs
  sans mesure lors des interruptions. Anciens carnets préservés.
- Unité absente des archives nommée « unité source », sans héritage de l’unité actuelle.
- [Méthodes, limites et références](docs/MEASUREMENT_METHODS.md).
- Vérifications navigateur synthétiques : clair/sombre, desktop/mobile, clavier,
  toucher, données partielles, zéro et péremption. Publication et installation distinctes des tests synthétiques.

## 0.3.4 — 2026-11-14 — Maintien de consigne et projection Twin

Première version préparée pour une release GitHub versionnée, installable via Marketplace en dépôt personnalisé.

- Explication de la chauffe de maintien lorsque les signaux publiés montrent un FF
  positif, réduit par le PI, sans trajectoire ni boost actif.
- Commande et sorties du Twin côte à côte sur desktop, empilées sur mobile.
- Repère Twin pointillé uniquement sur données récentes et modèle déclaré fiable ;
  estimation et prédiction du même pas, sans horizon temporel inventé.
- ETA numérique uniquement lorsque ses gardes sont satisfaites ; motif bref sinon.
  Le scénario de chauffe maximale est explicité au-dessus de la consigne.
- Tests unitaires et navigateur sur fixtures synthétiques, thèmes clair/sombre.

## 0.3.3 — 2026-11-13 — Fiabilité de la flèche de commande

- Une mise à jour des attributs du thermostat ne masque plus à tort une commande
  récente : la cohérence du mode utilise `last_changed`, avec repli prudent.
- L’écart reste descriptif entre la mesure récente et la consigne active.
- Péremption, valeurs invalides et changements de mode restent protégés ; gardes ETA inchangées.
- Tests de non-régression unitaires et navigateur sur données synthétiques.

## 0.3.2 — 2026-11-12 — Nouvelles lectures visuelles

- Flèche au-dessus de la règle, de longueur proportionnelle au pourcentage appliqué.
- Chevron de retour distinct en cas de dépassement ; la commande de chauffe peut
  rester positive et visible sans suggérer un refroidissement actif.
- Repère à la consigne affichée, zéro préservé, mode cool et données absentes/périmées gérés.
- Pourcentage textuel, indication accessible et rendu responsive sans animation.
- Nuage écart filtré / commande en Supervision, avec sélection de publication.
- Zone entre demande et sortie appliquée dans Régulation, avec période/source explicites.
- Parcours chronologique A/B dans Santé du modèle, table et sélection clavier.
- Graphes bornés, lacunes conservées, couverture et réduction du dessin explicites.
- Aucun score de qualité, calcul d’énergie ou changement du régulateur.
- Corrections de rendu : axes A/B adaptés aux petites variations, lacunes du
  graphe demande/sortie et nettoyage des observateurs conservés.
- Validation : typage/build, 66 tests frontend et 46 tests Python avec HA 2026.11.0,
  sans échec ni test ignoré ; scénarios navigateur synthétiques à 1440, 390 et 320 px.
- Bundle reproductible ; installation locale vérifiée sur HA 2026.11.1 après
  sauvegarde, contrôle de configuration et redémarrage.
- `.codegraph/` ignoré ; les preuves privées et notes de reprise restent hors commit.
- Sources publiées sur `main` avec les étapes ci-dessous ; première release
  Marketplace encore à préparer après validation de la CI HACS/hassfest.

## En préparation — diffusion Marketplace

- Version minimale Home Assistant alignée sur 2026.11.0 dans `hacs.json`.
- Traduction anglaise complète du flux d’installation, en complément du français.
- Catégorie thermostat/chauffage et licence incluse dans le composant distribué.
- Validations HACS et hassfest préparées pour les prochains push et pull requests.
- Guide anglais d’installation, liens directs Marketplace et configuration.
- Préparation de la première release versionnée et bilan des prérequis de diffusion.
- Fichiers de préparation inclus dans les sources 0.3.2 ; aucun tag, release ou
  référencement au catalogue créé par cette publication.

## 0.3.1 — 2026-11-11 — Sécurité et fiabilité (étape intégrée à 0.3.2)

- Validation stricte des requêtes, du carnet restauré et des réponses avant affichage.
- Stockage privé, écritures atomiques et confirmation des sauvegardes de métadonnées par relecture indépendante.
- Requêtes sérialisées, déchargement protégé, débit API borné et sauvegarde différée non repoussée par un flux continu.
- Reconnexion pendant une sauvegarde récupérable, erreurs et délais d’attente explicitement incertains.
- Choix de température isolé des mutations pendant l’attente et revalidé avant envoi.
- Tests de panne disque, concurrence, données mal formées et échappement des textes.

## 0.3.0 — 2026-11-11 — Observatoire personnel (étape intégrée à 0.3.2)

- Reçu de commande : retour du service, consigne HA, commande publiée et évolution mesurée distincts.
- Priorités publiées dans « Qui a la main ? » et conseils contextuels avant Appliquer.
- Souvenirs de confort avec contexte et restauration en aperçu uniquement.
- Essais sur le réglage actif, bilan descriptif, ressenti et comparaison de deux observations.
- Carnet prospectif du Twin : prévision figée, première atteinte publiée et interruptions explicites.
- Collecte locale bornée même panneau fermé, stockage HA natif et API administrateur de métadonnées.
- Aucun planning, réglage automatique, calcul d’économies ni historique Twin reconstruit.

## 0.2.8 — 2026-11-11 — Trajet thermique (étape intégrée à 0.3.2)

- Mesure, consigne utilisateur et presets sur une même échelle ; consigne filtrée distincte.
- Aperçu puis application explicite de température ou de preset sur le seul thermostat lié.
- ETA publié du Twin, meilleur cas affiché uniquement si disponible, fiable et récent ; masqué en aperçu.
- Aucun planning ni réglage automatique du régulateur.

## 0.2.7 — 2026-11-11 — Suivi de l’apprentissage

- Onglet Apprentissage avec température, consigne filtrée, commande appliquée,
  variations thermiques colorées et repères A/B et temps morts selon la couverture.
- Progression A/B persistante jusqu’à l’objectif publié de mesures conservées,
  avec palier initial, état des temps morts et motifs d’attente.
- Graphe de collecte et observation de session pour les compteurs disponibles.
- Distinction des mesures collectées, mises à jour acceptées et dates de publication.

## 0.2.6 — Étape locale avant 0.2.7

Date exacte non conservée ; étape décrite dans les notes de développement,
intégrée ensuite à la 0.2.7 publiée dans le dépôt.

- Première vue Apprentissage, avec température, consigne filtrée et repères A/B.
- Correction après essai : A/B réservés aux hausses des compteurs d’apprentissages
  acceptés ; les seules variations de coefficients ne suffisent plus.
- Fond orange/bleu pour les hausses/baisses mesurées et courbe de commande appliquée.
- Détail de l’intervalle entre publications, sources Recorder/session séparées et
  limites des données de temps mort explicites.
- Rendu mobile et bureau, filtre des repères et validation sur données synthétiques.

## 0.2.4 — 2026-11-08 à 2026-11-09 — Diagnostics et préparation publique

- Vue en direct avec mesure, consigne filtrée, demande et sortie appliquée.
- Chemin PI ou direct, motif publié et inspection des signaux et des cycles.
- Schéma complet et chaîne de commande à la demande.
- Raccourci de Supervision avec sélection uniquement si la publication existe
  à l’horodatage attendu dans la source et la fenêtre affichées.
- Ajout de la licence MIT, des notices de bibliothèques et de la documentation
  publique des contrats visuels, sources et limites scientifiques.
- Icônes locales 256/512 px et captures synthétiques du schéma, du régulateur PI
  et de la supervision pour présenter le projet.
- Nettoyage des références inutilisées dans le README.

## 0.2.3 — 2026-11-07 — Supervision synchronisée

- Vue Supervision avec synoptique, tendances et inspection synchronisée.
- Accès aux détails PI, anticipation et modèle depuis le synoptique.

## 0.2.2 — 2026-11-07 — Séparation du direct et de l’historique

- Sélection de thermostat plus compacte et horodatage local de la publication.
- La vue Régulation en direct donne la priorité au schéma et à la chaîne de commande.
- La vue Évolution ajoute le nombre de couples valides, les médianes signée et
  absolue de l’écart observé, et l’intervalle maximal entre couples.

## 0.2.1 — 2026-11-07 — Compréhension du régulateur

- Fiches dans « Le régulateur, en direct » : erreurs P/I, état intégral, gains,
  anticipation, contraintes, cycles et modèle avec leur provenance publiée.
- Le schéma distingue le chemin actif, les blocs contournés et le retour de
  mesure ; les valeurs absentes et estimations non fiables restent indisponibles.

## 0.2.0 — 2026-11-06 — Diagnostics visuels et Recorder

- Courbes Recorder natives sur 1, 3, 6, 12, 24 et 48 h : température, consigne
  filtrée, quatre commandes, écart filtré et modèles A/B distincts.
- Zoom et navigation, curseurs synchronisés, légendes interactives et tables.
- Schéma SmartPI cliquable, mode expert et chaîne U sans fausse additivité.
  Chemins directs hystérésis/calibration ; FF runtime sans FF3 en bande morte.
- Santé du modèle/Twin avec fiabilité explicite ; aucun historique Twin inventé.
- Journal des variations observables, source Recorder/session distincte,
  conservation des trous et mémoire temporaire bornée.
- Transport historique réel vérifié sur HA 2026.11.0 sans déploiement.
- Tests unitaires et navigateur/CI, documentation des sources et limites.

## 0.1.0 — 2026-11-06 — Premier panneau natif

- Intégration Home Assistant avec flux de configuration et panneau de barre latérale
  réservé aux administrateurs.
- Découverte automatique des diagnostics SmartPI v2, association explicite au climate,
  adaptateur de données et fiches techniques sur les publications courantes.
- Présentation des valeurs disponibles et contrôles affirmatifs de fiabilité ;
  données absentes distinguées de zéro.
- Prototype strictement en lecture seule, sans service thermostat ni serveur externe.
- Compilation et inclusion du frontend pour installation manuelle du composant.
- Audit préalable à l’installation : refus des données indisponibles, cycle de vie,
  nettoyage des ressources, tests unitaires et navigateur sur fixtures synthétiques.

## Origine du projet — 2026-11-06

- Création du dépôt, puis mise en place du premier panneau de diagnostic natif.
- Séparation de la présentation SmartPI et du code du régulateur : le panneau
  explique les publications sans recalculer ni régler le PI.

## Traçabilité de cet historique

Reconstitution à partir des manifests et changements de l’historique Git, du
changelog existant et des notes locales pour l’étape 0.2.6 et les évolutions
postérieures à 0.2.7. Aucun numéro intermédiaire ni date de release n’est inventé.
Les tests et installations de développement ne valent pas publication Marketplace.
Pour la première release, voir [la préparation de diffusion](docs/MARKETPLACE.md).
