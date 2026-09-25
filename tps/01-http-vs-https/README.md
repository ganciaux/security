# TP 01 : HTTP contre HTTPS

## Objectif

Constater qu'un formulaire de connexion envoyé en HTTP circule en clair sur le réseau, puis que la même requête en HTTPS devient illisible.

## Lien avec la théorie

| Élément        | Dans ce TP                                                   |
|----------------|--------------------------------------------------------------|
| Propriété DICT | **Confidentialité**                                          |
| Menace         | Écoute passive du réseau (Wi-Fi public, équipement compromis)|
| Vulnérabilité  | Transport non chiffré (HTTP)                                 |
| Impact         | Vol d'identifiants, usurpation de compte                     |
| Mesure         | Chiffrement du transport avec TLS (HTTPS)                    |

## Architecture

- `app` : Express sert un formulaire de connexion sur `http://127.0.0.1:8080`.
- `sniffer` : `tcpdump` partage l'interface réseau de `app` et affiche le contenu des paquets.
  Il joue le rôle de l'attaquant qui écoute le réseau.

Compte fictif : `alice` / `Soleil-2026`.

## Étapes

1. **HTTP** : envoyer le formulaire et observer la capture. *(en cours)*
2. **HTTPS** : même formulaire servi en TLS, même capture. *(à venir)*
3. **Bilan** : comparer les deux captures.

## Commandes

```bash
docker compose up --build -d     # construit et démarre en arrière-plan
docker compose logs -f sniffer   # suit la capture en direct (Ctrl+C pour quitter)
docker compose down -v           # arrête et supprime tout
```
