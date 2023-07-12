const express = require('express');
const Twit = require('twit');

const app = express();
const port = process.env.PORT || 3000;

// Configurar las credenciales de Twitter
const twitterConfig = {
  consumer_key: '0ulEcdkRJa9JyP1wUXdLg0G92',
  consumer_secret: 'h5hLQuc4HMEP6EW1rusGCnf8pgrcrpibrbExjeMLS6npWeji0y',
  access_token: '1678888146069512193-bDA0Puqxc2wuxIMHDDrzxrHEfZG6X7',
  access_token_secret: 'zWJ1rezfKtUFPJdDarqCpnUFuxbJeUyTStliAnl3VcPTY',
};

// Crear una instancia de Twit
const T = new Twit(twitterConfig);

app.use(express.urlencoded({ extended: true }));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Página de Confesiones</title>
      </head>
      <body>
        <h1>¡Bienvenido a la página de confesiones!</h1>
        <form action="/confessions" method="POST">
          <textarea name="text" placeholder="Escribe tu confesión aquí"></textarea>
          <br />
          <button type="submit">Enviar</button>
        </form>
      </body>
    </html>
  `);
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
