# Progression du labo

## Où on en est

**TP 01 : HTTP contre HTTPS**, en cours (étape 2.4).

- ✅ Étape 1 : formulaire en HTTP, capture avec tcpdump. Mot de passe vu en clair.
- 🔄 Étape 2 : passage en HTTPS derrière Nginx
  - ✅ 2.1 mkcert installé, CA locale créée
  - ✅ 2.2 `tp01.test` déclaré dans le fichier `hosts`
  - ✅ 2.3 certificat généré dans `corrige/certs/` (non versionné)
  - 🔄 2.4 config `corrige/nginx/default.conf` à finir :
    - ✅ `listen 443 ssl;` et `server_name tp01.test;`
    - ❌ chemins des certificats : utiliser le chemin **vu depuis le conteneur**
    - ❌ `proxy_pass` : doit viser le service Express sur le réseau Docker
  - ⏳ 2.5 capturer le trafic HTTPS et comparer
- ⏳ Étape 3 : bilan et fiche

**Point de reprise** : l'apprenant était perdu sur le réseau Docker (pourquoi `app` et pas
`localhost` ou `tp01.test`). Deux options proposées, pas encore tranchées :
1. mettre le réseau Docker de côté et finir la config pour se concentrer sur TLS ;
2. le constater en pratique (IP des conteneurs, résolution du nom `app`).
Reprendre **lentement**, une notion à la fois.

## Remettre le labo en place sur un nouveau poste

Ces éléments ne sont pas dans le dépôt, il faut les refaire sur chaque machine :

1. `winget install FiloSottile.mkcert`, puis dans un nouveau terminal `mkcert -install`.
   Sous VS Code, il faut redémarrer l'éditeur pour qu'il recharge le PATH.
2. Ajouter `127.0.0.1   tp01.test` au fichier `hosts`
   (`C:\Windows\System32\drivers\etc\hosts` sous Windows, `/etc/hosts` sous Linux).
3. Depuis `tps/01-http-vs-https` :
   `mkcert -cert-file corrige/certs/tp01.test.pem -key-file corrige/certs/tp01.test-key.pem tp01.test`
   (créer le dossier `corrige/certs` d'abord).

## Notions

### Acquises
- POST ne chiffre rien : en HTTP, le corps du formulaire circule en clair. POST évite
  seulement que les données apparaissent dans l'URL (historique, logs, Referer).
- Un champ `hidden` est masqué à l'affichage, il n'est pas secret.
- Ce que TLS cache (contenu : URL, en-têtes, corps) et ce qu'il ne cache pas
  (IP, ports, volume, horaires).
- Le port ne fait pas la sécurité : 443 est une convention, c'est TLS qui compte.
- Certificat = clé publique + identité (nom) + validité + signature de la CA.
  Le serveur envoie le certificat ; la clé privée ne quitte jamais le serveur.
- Rôle d'une CA et d'une CA locale (mkcert). La clé `rootCA-key.pem` ne doit jamais circuler.
- Terminaison TLS : Nginx déchiffre puis transmet en HTTP à l'app sur le réseau interne.

### À revoir
- **Réseau Docker** : chaque conteneur a sa propre IP ; `localhost` désigne le conteneur
  lui-même ; les noms de services sont résolus par le DNS interne de Docker.
  Notion non comprise, à reprendre par la pratique.
- **Volumes Docker** : chemin côté hôte et chemin côté conteneur.
- **Config Nginx** : jamais écrite avant ce TP (syntaxe `directive valeur;`, blocs).

### Idées fausses corrigées
- « POST protège le mot de passe car il n'est pas dans l'URL » : faux sur le réseau.

### En suspens
- Une exception à « TLS cache le nom du site » est à repérer dans la capture HTTPS
  (indice : le début de la poignée de main). Ne pas donner la réponse.
- Logger `req.body` écrit les mots de passe dans les logs : à aborder au bilan.
- Hors sujet, vu en passant : `[Object: null prototype]` avec `express.urlencoded({ extended: false })`
  (objet sans prototype, protège de la prototype pollution).

## Questions de révision

1. Un formulaire POST en HTTP : que voit un attaquant qui écoute le réseau ?
2. Avec HTTPS, que peut encore voir un attaquant sur le réseau ?
3. Que contient un certificat ? Lequel des deux fichiers le serveur envoie-t-il ?
4. Pourquoi la clé privée de la CA mkcert ne doit-elle jamais quitter le poste ?
5. Qu'est-ce que la terminaison TLS ?
