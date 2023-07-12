const express = require('express');
const path = require('path');
const Twit = require('twit');

const app = express();
const port = process.env.PORT || 3000;

// Configurar las nuevas credenciales de Twitter
const twitterConfig = {
  consumer_key: 'G1EPlxlSNcpquvAIPH9A8jxX0',
  consumer_secret: 'RRcPIE28z4wiX00SGVeVg02DEVvmC02STCF1lmvr7MDNFdV9FP',
  access_token: '1678888146069512193-86sGsp9ylbZewffV3XQEYuTJtSt9aW',
  access_token_secret: 'aDnY27fEsck8gcp5kavp8ixTtftOUsmAkX8wX6ar1Vcbj',
};

// Crear una instancia de Twit
const T = new Twit(twitterConfig);

// Ruta raíz para cargar el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para recibir confesiones
app.post('/confessions', (req, res) => {
  // Aquí puedes procesar la confesión recibida y publicarla en Twitter usando la instancia de Twit (T)
  // Puedes acceder a los datos de la confesión a través de req.body

  // Ejemplo: publicar la confesión en Twitter
  const confessionText = req.body.text;
  T.post('statuses/update', { status: confessionText }, (err, data, response) => {
    if (err) {
      console.error('Error al publicar la confesión en Twitter:', err);
      res.status(500).json({ error: 'Error al publicar la confesión en Twitter' });
    } else {
      console.log('Confesión publicada en Twitter:', data);
      res.status(200).json({ message: 'Confesión publicada en Twitter' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor web iniciado en el puerto ${port}`);
});
