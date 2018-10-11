const faker = require('faker');
const cats = require('./cats.js');

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive 
};

module.exports.generateRandomData = () => {
  let mainData = "";
  // let protectionData = "";

  let name = `Egg POST`;

  let image = cats.data[getRandomIntInclusive(0, 32)];

  let link = cats.data[getRandomIntInclusive(0, 32)];
  let shares = Math.floor(Math.random() * 100) + 1;
  let price = faker.commerce.price();
  let is_prime = faker.random.boolean();
  let in_stock = faker.random.boolean();
  let giftwrap_available = faker.random.boolean();
  let quantity_max = Math.floor(Math.random() * 10) + 1;
  let seller = faker.company.companyName();

  let protection_plan_exists = faker.random.boolean();
  let protection_plan_name = faker.lorem.word();
  let protection_plan_price = (Math.random() * (1000) / 100).toFixed(2);
  let protection_plan_years = Math.floor(Math.random()*5) +1;
  let protection_plan_provider = faker.company.companyName();
  let protection_plan_rating = Math.floor(Math.random()*5);
  let protection_plan_description = faker.lorem.word();

  mainData += `'${name}','${image}','${link}',${shares},${price},${is_prime},${in_stock},${giftwrap_available},${quantity_max},'${seller}', 3567923`;
  // protectionData += `${protection_plan_exists},${protection_plan_name},${protection_plan_price},${protection_plan_years},${protection_plan_provider},${protection_plan_rating},${protection_plan_description}`;

  return mainData;
};

// TEST

  // const obj = {
  //   protection_plan: {},
  //   used_option: {},
  // };
  // obj.product_id = id;
  // obj.name = faker.commerce.productName();

  // if (cats.data[id]) {
  //   obj.image = cats.data[id];
  // } else {
  //   obj.image = Math.floor(cats.data[id / 3]);
  // }

  // obj.link = faker.lorem.sentence();
  // obj.shares = Math.floor(Math.random() * 100) + 1;
  // obj.price = faker.commerce.price();
  // obj.is_prime = faker.random.boolean();
  // obj.in_stock = faker.random.boolean();
  // obj.giftwrap_available = faker.random.boolean();
  // obj.quantity_max = Math.floor(Math.random() * 10) + 1;
  // obj.seller = faker.company.companyName();

  // obj.protection_plan.exists = faker.random.boolean();
  // obj.protection_plan.name = faker.lorem.text();
  // obj.protection_plan.price = (Math.random() * (1000) / 100).toFixed(2);
  // obj.protection_plan.years = Math.floor(Math.random()*5) +1;
  // obj.protection_plan.provider = faker.company.companyName();
  // obj.protection_plan.rating = Math.floor(Math.random()*5);
  // obj.protection_plan.description = faker.lorem.lines();

  // obj.used_option.exists = faker.random.boolean();
  // obj.used_option.price = faker.commerce.price();
  // return obj;