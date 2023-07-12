const express = require('express');
const Twit = require('twit');

const app = express();
const port = process.env.PORT || 3000;

// Configurar las credenciales de Twitter
const twitterConfig = {
  consumer_key: 'G1EPlxlSNcpquvAIPH9A8jxX0',
  consumer_secret: 'RRcPIE28z4wiX00SGVeVg02DEVvmC02STCF1lmvr7MDNFdV9FP',
  access_token: '1678888146069512193-86sGsp9ylbZewffV3XQEYuTJtSt9aW',
  access_token_secret: 'aDnY27fEsck8gcp5kavp8ixTtftOUsmAkX8wX6ar1Vcbj',
};

// Crear una instancia de Twit
const T = new Twit(twitterConfig);

// Configurar el middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Ruta para recibir confesiones
app.post('/confessions', (req, res) => {
  // Verificar si existe el campo "text" en el cuerpo de la solicitud
  if (req.body && req.body.text) {
    // Obtener el texto de la confesión
    const confessionText = req.body.text;

    // Publicar la confesión en Twitter
    T.post('statuses/update', { status: confessionText }, (err, data, response) => {
      if (err) {
        console.error('Error al publicar la confesión en Twitter:', err);
        res.status(500).json({ error: 'Error al publicar la confesión en Twitter' });
      } else {
        console.log('Confesión publicada en Twitter:', data);
        res.status(200).json({ message: 'Confesión publicada en Twitter' });
      }
    });
  } else {
    // Si el campo "text" no está presente en el cuerpo de la solicitud
    res.status(400).json({ error: 'Falta el campo "text" en la confesión' });
  }
});

app.listen(port, () => {
  console.log(`Servidor web iniciado en el puerto ${port}`);
});
