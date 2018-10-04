require('dotenv').config();
const express = require('express');
const cors = require('cors')

const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database');
// const generate = require('../database').generateRandomData;

app.use((req, res, next) => {
  console.log(`${req.method} request recieved at ${req.url}.`);
  next();
});

app.use(cors( { origin: 'http://localhost:3000'} ));
app.use(express.static('./client/dist'));

app.get('/checkout/*', bodyParser.json(), (req, res) => {
  // * representing the product ID
  const productId = req.originalUrl.split('/')[2];
  console.log(productId);
  db.retrieveInformationById(productId, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data[0]);
    }
  });
});

app.post('/checkout', (req, res) => {
  console.log("POST");
  db.generateRandomData(1);
  res.send("POSTING A DOCUMENT");
});

app.put('/checkout/*', (req, res) => {
  const productId = req.originalUrl.split('/')[2];
  db.updateById(productId);
  res.send(`UPDATING: ${productId}`);
})

app.delete('/checkout/* s', (req, res) => {
  const productId = req.originalUrl.split('/')[2];
  db.deleteById(productId);
  res.send(`DELETING: ${productId}`);
})

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
