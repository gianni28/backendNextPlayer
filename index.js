const express = require('express');
const cors = require('cors');
const db = require('./firebaseConfig'); // Conexión a Firebase

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para obtener datos de la colección "jugadores"
app.get('/api/data', async (req, res) => {
  try {
    const snapshot = await db.collection('jugadores').get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (error) {
    console.error('Error obteniendo jugadores:', error);
    res.status(500).json({ message: 'Error obteniendo datos', error });
  }
});

// Ruta para iniciar sesión verificando la colección "usuarios"
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const snapshot = await db.collection('usuarios').where('username', '==', username).get();

    if (snapshot.empty) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = snapshot.docs[0].data();

    if (user.password === password) {
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.error('Error al verificar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para registrar un nuevo usuario en la colección "usuarios"
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const snapshot = await db.collection('usuarios').where('username', '==', username).get();

    if (!snapshot.empty) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    await db.collection('usuarios').add({ username, password });
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 5000; // Usa el puerto de Render o 5000 como fallback
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
