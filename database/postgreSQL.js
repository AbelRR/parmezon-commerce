const { Client } = require('pg');
const client = new Client({
  user: "power_user",
  host: "54.204.160.81", //"ec2-54-204-160-81.compute-1.amazonaws.com",
  password: "password",
  database: "mydata",
  port: 5432
});

module.exports = client;

