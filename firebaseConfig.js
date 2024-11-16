const admin = require('firebase-admin');

// Configuración optimizada solo con las claves esenciales
const serviceAccount = {
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  project_id: process.env.FIREBASE_PROJECT_ID,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Solo si usas la base de datos de Firebase
});

const db = admin.firestore();

module.exports = db;
