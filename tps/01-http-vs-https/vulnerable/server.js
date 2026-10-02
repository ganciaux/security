// TP 01 : formulaire de connexion servi en HTTP
// VULNÉRABLE : aucun chiffrement du transport, tout circule en clair sur le réseau.
// Ce code est volontairement vulnérable, ne jamais le réutiliser ailleurs.

const express = require('express');

const app = express();
const PORT = 3000;

// Utilisateur fictif (jeu de données de labo, aucun vrai secret)
const UTILISATEUR = { login: 'alice', motDePasse: 'Soleil-2026' };

// Lit le corps des formulaires HTML (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }));

// Sert la page du formulaire (public/index.html)
app.use(express.static('public'));

// Traitement de la connexion
app.post('/login', (req, res) => {
  console.log("/login route: start")
  const { login, motDePasse } = req.body;
  console.log(req.body)
  console.log("/login route: after body")
  if (login === UTILISATEUR.login && motDePasse === UTILISATEUR.motDePasse) {
    res.send(`<p>Bienvenue ${UTILISATEUR.login} !</p><a href="/">Retour</a>`);
  } else {
    res.status(401).send('<p>Identifiants incorrects.</p><a href="/">Retour</a>');
  }
});

app.listen(PORT, () => {
  console.log(`Application en écoute sur le port ${PORT} (HTTP, en clair)`);
});
