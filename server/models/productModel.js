const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  storeName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  productCategory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  productImage: {
    type: String,
    default: ""
  },
  productTotalRating: {
    type: Number,
    default: 3
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
