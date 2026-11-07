# Changelog

## 0.2.3 — 2026-11-07

- Vue Supervision avec synoptique, tendances et inspection synchronisée.
- Accès aux détails PI, anticipation et modèle depuis le synoptique.

## 0.2.2 — 2026-11-07

- Sélection de thermostat plus compacte et horodatage local de la publication.
- La vue Régulation en direct donne la priorité au schéma et à la chaîne de commande.
- La vue Évolution ajoute le nombre de couples valides, les médianes signée et
  absolue de l’écart observé, et l’intervalle maximal entre couples.

## 0.2.1 — 2026-11-07

- Fiches dans « Le régulateur, en direct » : erreurs P/I, état intégral, gains,
  anticipation, contraintes, cycles et modèle avec leur provenance publiée.
- Le schéma distingue le chemin actif, les blocs contournés et le retour de
  mesure ; les valeurs absentes et estimations non fiables restent indisponibles.

## 0.2.0 — 2026-11-06

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

## 0.1.0

- Intégration HA et panneau administrateur, diagnostics v2, découverte automatique.
- Audit préalable, contrôles de fiabilité et de lecture seule, tests HA locaux.
