# Image minimale avec tcpdump, l'outil de capture réseau en ligne de commande
FROM alpine:3.20
RUN apk add --no-cache tcpdump

# -i any : écoute toutes les interfaces
# -A     : affiche le contenu des paquets en texte (ASCII)
# -l     : affichage immédiat, ligne par ligne
# -nn    : pas de résolution de noms (plus lisible)
# filtre : uniquement le trafic TCP qui contient des données, vers ou depuis le port 3000
CMD ["tcpdump", "-i", "any", "-A", "-l", "-nn", "tcp port 3000 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)"]
