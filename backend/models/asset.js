const mongoose = require('mongoose').default;

const Schema = mongoose.Schema;

const assetSchema = new Schema({
  id: String,
  amount: Number,
  price: Number,
  total: Number,
  date: String,
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
