# Préparation de diffusion Marketplace

État du catalogue contrôlé le **11 novembre 2026**. Sources et préparation
0.3.2 publiées sur `main` le **12 novembre 2026** ; aucun tag, release ou demande
au catalogue créé par ce push. Les résultats CI se consultent dans GitHub Actions.

## Deux modes de diffusion

Un dépôt public peut être ajouté manuellement comme dépôt personnalisé de type
**Intégration**. Être téléchargeable par ce lien ne signifie pas être référencé
pour tous les utilisateurs. Le catalogue par défaut est géré dans `hacs/default` ;
l’ajout demande une PR distincte et une revue, après validations et release.
Voir le [guide du catalogue](https://contributors.home-assistant.io/marketplace/guides/catalog/).

Au contrôle, `gael1980/smartpi-dashboard` est public, non archivé, dispose de
sujets GitHub et des issues activées ; sa branche par défaut est `main`.
Il n’est pas dans la liste `integration` du catalogue et n’a aucune release GitHub.
La publication des sources 0.3.2 succède à `4ae772c` (version 0.2.7) et inclut
les étapes de développement intermédiaires 0.2.8, 0.3.0 et 0.3.1.

## Bilan des fichiers et prérequis

| Élément | État de la préparation |
| --- | --- |
| Dépôt dédié à une seule intégration | Conforme : `custom_components/smartpi_dashboard/`. |
| Bundle et ressources d’exécution | Inclus dans le composant ; aucune compilation demandée au serveur HA. |
| Manifest | Domaine, version 0.3.2, propriétaire, documentation, issues et dépendances présents ; ordre des clés normalisé. |
| Catégorie | `climate.thermostats_heating` ajoutée pour la recherche dans le catalogue. |
| Minimum HA | `hacs.json` corrigé de 2026.3.0 à **2026.11.0**, conforme au code et aux tests. Ancienne option non documentée `render_readme` retirée. |
| Traductions d’installation | `translations/en.json` ajouté ; mêmes clés que le français. Le panneau lui-même reste en français. |
| Icônes locales | `brand/icon.png` 256×256 et `icon@2x.png` 512×512 présents. Logo supplémentaire facultatif. |
| Documentation | README français, guide anglais, prérequis, installation/mise à jour et données locales décrits. |
| Historique et release notes | Changelog reconstitué depuis le début ; brouillon de première release dans `docs/releases/0.3.2.md`. |
| Licence et notices | MIT à la racine et dans le composant distribué ; notices des bibliothèques incluses dans son dossier frontend. |
| Carnet utilisateur | Store natif dans `.storage`, hors du dossier du composant remplacé à la mise à jour. Aucun `persistent_directory` nécessaire. |
| HACS et hassfest | Workflow `.github/workflows/marketplace.yml` préparé, sans exclusion de contrôle ni commentaire automatique de PR. Résultats du push à consulter dans GitHub Actions. |
| CI du produit | Workflow existant conservé ; résultats de la publication 0.3.2 à vérifier dans GitHub Actions. |

Les guides officiels détaillent la
[structure des intégrations](https://contributors.home-assistant.io/marketplace/guides/integrations/),
[les clés de hacs.json](https://contributors.home-assistant.io/marketplace/reference/hacs-json/),
[les traductions personnalisées](https://developers.home-assistant.io/docs/internationalization/custom_integration/)
et [les catégories](https://contributors.home-assistant.io/core/integrations/categories/).
Les fichiers de traduction complets sous `translations/` sont les fichiers utilisés
par un composant personnalisé ; `strings.json` ne remplace pas `translations/en.json`.

## Étapes restantes, après autorisation de publication

1. Sources 0.3.2 publiées après revue du diff. Notes de reprise, `.codegraph/`
   et preuves privées exclus du commit. Relire le changelog avant une release.
2. Attendre la CI du commit : typage, tests, bundle reproductible, navigateur,
   cycle de vie HA, puis HACS et hassfest sans `ignore`. Leurs résultats ne sont
   pas déduits des tests locaux. Les validateurs Docker n’ont pas été exécutés
   ici : Docker n’est pas disponible dans l’environnement de préparation.
3. Mettre à jour la description GitHub, qui annonce encore un panneau uniquement
   en lecture seule. Proposition prête :
   **Home Assistant dashboard for SmartPI diagnostics, learning and explicit temperature/preset control.**
4. Publier la première release GitHub **0.3.2**, avec tag **0.3.2** et manifest
   identique. Relire le brouillon, retirer ses mentions de préparation et indiquer
   les validations réellement réussies. Actualiser aussi les statuts dans les README,
   le changelog et ce bilan. Un tag seul n’est pas une release.
5. Pour la visibilité par défaut, ouvrir ensuite la demande dans `hacs/default`,
   avec le lien de release et les deux validations réussies. Aucune demande n’est
   ouverte par cette préparation ; l’acceptation relève des mainteneurs HACS.

La [documentation des versions](https://contributors.home-assistant.io/marketplace/guides/releases/)
précise que la protection par version minimale HA s’applique aux dépôts disposant
de releases. Une release est donc utile aussi pour éviter une installation de
cette version sur un HA trop ancien. La structure actuelle permet une release
à partir des fichiers du dépôt : aucun ZIP personnalisé n’est requis.

## Vérifications et limites

La version locale 0.3.2 passe le typage, le build, 66 tests Node et 46 tests
Python avec HA 2026.11.0 isolé, sans skip. Les scénarios navigateur sur fixtures
synthétiques passent, dont les trois nouveaux graphes et la bande de commande
aux largeurs 1440, 390 et 320 px ; bundle reproductible sur deux builds.
JSON, versions, traductions, liens locaux, icônes et licence ont été vérifiés
pendant la préparation Marketplace. Ces contrôles locaux ne valent pas
exécution de HACS/hassfest ; installation d’essai documentée dans AUDIT.md.

À améliorer sans bloquer un dépôt personnalisé : captures des nouvelles vues,
traduction de l’ensemble du panneau et gestion des mises à jour des actions CI.
Les références de validation ajoutées sont fixées aux commits vérifiés ; leurs
images de conteneur sont celles définies par les actions amont.
