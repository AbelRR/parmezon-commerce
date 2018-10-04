const mongoose = require('mongoose');
const helper = require('./helpers/dataGenerator.js');
require('dotenv').config();
mongoose.connect( process.env.MLAB_DB_URI || 'mongodb://abel:password1@ds113853.mlab.com:13853/sidebar'); //


const productSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  image: String,
  shares: Number,
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

const retrieveInformationById = (id, callback) => {
  Product.find({ product_id: id }, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const generateRandomData = (amount) => {
  for (let id = 1; id <= amount; id++) {
    // let checkoutProduct = helper.generateRandomData(id);
    const newEntry = new Product(helper.generateRandomData(id));
    newEntry.save();
  }
  console.log('Seed succesfully completed.')
};

const updateById = (product_id) => {
Product.update({ product_id }, helper.generateRandomData(product_id), { multi: false }, function (err, raw) {
  if (err) return handleError(err);
  console.log('The raw response from Mongo was ', raw);
});
}

const deleteById = (product_id) => {
  Product.deleteOne({ product_id }, function (err) {
    if (err) return handleError(err);
  });
}

module.exports = {
  retrieveInformationById,
  generateRandomData,
  updateById,
  deleteById,
};
