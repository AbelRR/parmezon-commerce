const { Client } = require('pg');
const client = new Client({
  user: "postgres",
  database: "mydata",
  port: 5432
});

module.exports = client;