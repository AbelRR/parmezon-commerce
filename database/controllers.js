const client = require("./postgreSQL.js");
const helper = require('./helpers/dataGenerator.js');

module.exports = {
  // get
  getItem: (id, callback) => {
    client.query(`SELECT * FROM main INNER JOIN protectionplan ON main.protection_id = protectionplan.protection_id WHERE main.id = ${id}`, (err, data) => { //
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },
  // post
  createItem: (callback) => {
    let randData = helper.generateRandomData(); // main, protectionplan
    // callback(null, randData)
    client.query(`INSERT INTO main (name,image,link,shares,price,is_prime,in_stock,giftwrap_available,quantity_max,seller,protection_id) values (${randData});`, callback);
  },
  // update
  updateItem: (id) => {

  },
  // delete
  deleteItem: (id) => {

  },
};