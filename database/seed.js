require('dotenv').config();
const mongoose = require('mongoose');
const helper = require('./helpers/dataGenerator.js');
mongoose.connect(process.env.MLAB_DB_URI);

const productSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  shares: Number,
  image: String,
  link: String,
  price: Number,
  is_prime: Boolean,
  in_stock: Boolean,
  giftwrap_available: Boolean,
  quantity_max: Number,
  seller: String,
  protection_plan: {
    exists: Boolean,
    name: String,
    price: Number,
    years: Number,
    provider: String,
    rating: Number,
    description: String,
  },
  used_option: {
    exists: Boolean,
    price: Number,
  },
});

const Product = mongoose.model('Product', productSchema);

const generateRandomData = (amount) => {
  for (let id = 1; id <= amount; id++) {
    // let checkoutProduct = helper.generateRandomData(id);
    const newEntry = new Product(helper.generateRandomData(id));
    newEntry.save();
  }
  console.log('Seed succesfully completed.')
};

generateRandomData(100);

