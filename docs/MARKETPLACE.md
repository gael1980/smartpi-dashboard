Version courante préparée : **0.5.0**. [Notes de version](releases/0.5.0.md).
Le protocole de distribution de la première release ci-dessous reste applicable.

# Diffusion Marketplace

Préparation de la première release versionnée **0.3.4**, revue le 14 novembre 2026.
Le statut et le commit de publication sont visibles dans les [releases GitHub](https://github.com/gael1980/smartpi-dashboard/releases).

## Distribution

Le dépôt public peut être ajouté comme dépôt personnalisé de type **Intégration**.
La release utilise le tag `0.3.4`, aligné sur `manifest.json`. Le composant complet
et son bundle compilé sont inclus dans `custom_components/smartpi_dashboard/`.
Marketplace installe directement ces fichiers ; aucun ZIP personnalisé ni build
sur Home Assistant n’est nécessaire.

Le dépôt n’est pas inclus dans le catalogue par défaut. Une demande dans
`hacs/default` et une revue restent nécessaires pour cette visibilité ; aucune
PR de catalogue n’est créée par cette publication.

## Prérequis vérifiés

- Une seule intégration, manifeste complet, catégorie thermostat/chauffage.
- Version minimale Home Assistant **2026.11.0** dans `hacs.json`.
- README, licence MIT, notices frontend et icônes locales inclus.
- Traductions d’installation françaises et anglaises ; panneau en français et en anglais selon la langue de l’utilisateur Home Assistant.
- Store natif de l’observatoire hors du composant, préservé à la mise à jour.
- Workflow de validation du dépôt pour la catégorie integration et hassfest,
  sans contrôle ignoré. Les résultats exacts se consultent sur le commit publié.
- Typage/build reproductible, 73 tests Node, 46 Python avec HA2026.11.0 sans skip,
  tests navigateur synthétiques à 1440/390/320 px.

## Publication et mises à jour

Les [notes de version 0.3.4](releases/0.3.4.md) décrivent installation, redémarrage,
limites et nouveautés. Une release publiée est requise pour une version nommée :
un tag seul ne suffit pas. La détection par Marketplace est périodique et dépend
de la connexion GitHub pour un dépôt personnalisé ; elle n’est pas immédiate.

Références officielles : [versions et mises à jour](https://contributors.home-assistant.io/marketplace/guides/releases/),
[structure](https://contributors.home-assistant.io/marketplace/reference/repository-structure/),
[validation](https://contributors.home-assistant.io/marketplace/reference/validation/),
[configuration](https://contributors.home-assistant.io/marketplace/reference/hacs-json/),
[catalogue](https://contributors.home-assistant.io/marketplace/guides/catalog/).

La réussite des validateurs ne vaut pas acceptation au catalogue. Les essais
sur fixtures ne certifient ni la précision physique du Twin ni l’accessibilité.
