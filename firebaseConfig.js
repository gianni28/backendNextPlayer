const admin = require('firebase-admin');
const serviceAccount = require('../scraper/credenciales.json'); // Credenciales descargadas desde Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nextplayer-c2ecf.firebaseio.com" // Aquí va tu databaseURL
});

const db = admin.firestore();

module.exports = db;
