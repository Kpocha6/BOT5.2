const express = require('express');
const Twit = require('twit');

const app = express();
const port = process.env.PORT || 3000;

// Configurar las credenciales de Twitter
const twitterConfig = {
  consumer_key: 'NDAxMnlvc0VjYzFxOWhmb09zR0o6MTpjaQ',
  consumer_secret: 'MLhLQADS7ZARsnz5cuBLpLzg3cgEWzJ43uawaFo3g1m3RDnBgn',
  access_token: '1678888146069512193-q8QIJcQFdluk6tQRTTPp7hgGwWQEWC',
  access_token_secret: 'xytFxJQAKrFXbLkOOHO8M5I0F24GO5gkt39yFPAtVeceJ',
};

// Crear una instancia de Twit
const T = new Twit(twitterConfig);

// Configurar el middleware para analizar los datos del cuerpo de la solicitud
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// Ruta predeterminada para la página de inicio
app.get('/', (req, res) => {
  res.send(`
    <h1>¡Bienvenido a la página de confesiones!</h1>
    <form action="/confessions" method="POST">
      <textarea name="text" placeholder="Escribe tu confesión aquí"></textarea>
      <button type="submit">Enviar</button>
    </form>
  `);
});

app.listen(port, () => {
  console.log(`Servidor web iniciado en el puerto ${port}`);
});
