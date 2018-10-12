require('dotenv').config();
require('newrelic');
const express = require('express');
const cors = require('cors')

const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const pg = require('../database/postgreSQL.js');
const controllers = require('../database/controllers.js')

// const redis = require('redis');
// const client = redis.createClient();

// client.on('ready',function() {
//   console.log("Redis is ready");
// });

// client.on('error', function (err) {
//   console.log('Redis Error:', err); // errors here
// });

pg.connect((err) => {
  if(err) throw err;
  console.log('Postgres connected!');
})

app.use((req, res, next) => {
  console.log(`${req.method} request recieved at ${req.url}.`);
  next();
});

app.use(cors( { origin: 'http://localhost:3000'} ));
app.use(express.static('./client/dist'));

// function cache(req, res, next) {

//   client.get(req.originalUrl.split('/')[2], function (err, data) {
//       if (err) throw err;

//       if (data != null) {
//           res.send(JSON.parse(data));
//       } else {
//           next();
//       }
//   });
// }

app.get('/checkout/*', (req, res) => { //app.get('/checkout/*', cache, (req, res) => {
  const productId = req.originalUrl.split('/')[2];
  controllers.getItem(productId, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        let result = data.rows[0];
        const dataObject = {
          protection_plan: {
            exists: result.protection_plan_exists,
            name: result.protection_plan_name,
            price: result.protection_plan_price,
            years: result.protection_plan_years,
            provider: result.protection_plan_provider,
            rating: result.protection_plan_rating,
            description: result.protection_plan_description,
          },
          product_id: result.id,
          name: result.name,
          image: result.image,
          link: result.link,
          shares: result.shares,
          price: result.price,
          is_prime: result.is_prime,
          in_stock: result.in_stock,
          giftwrap_available: result.giftwrap_available,
          quantity_max: result.quantity_max,
          seller: result.seller,
          protection_id: 100000,
        };

        // client.set(productId, JSON.stringify(dataObject))
        res.send(dataObject);
      }
    });

  }

);

app.post('/checkout', (req, res) => {
  // const productId = req.originalUrl.split('/')[2];
  controllers.createItem( (err, data) => {
    if (err) {
      res.send(` Error ${err}`);
    } else {
      res.send(`${data.command} SUCCESS!!!`);
    }
  })
  // db.generateRandomData(1);
  // res.send("POSTING A DOCUMENT");
});

// app.put('/checkout/*', (req, res) => {
//   const productId = req.originalUrl.split('/')[2];
//   db.updateById(productId);
//   res.send(`UPDATING: ${productId}`);
// })

// app.delete('/checkout/* s', (req, res) => {
//   const productId = req.originalUrl.split('/')[2];
//   db.deleteById(productId);
//   res.send(`DELETING: ${productId}`);
// })

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
