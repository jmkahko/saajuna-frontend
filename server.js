// Asennetaan express serveri
const express = require('express');
const path = require('path');

const app = express();

// Serveri näyttää ainoastaan static sivuja dist kansiosta
app.use(express.static('./dist/saajuna-frontend/'));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: 'dist/saajuna-frontend/'})
})

// Käynnistetään Heroku kuuntelemaan
app.listen(process.env.PORT || 8080)