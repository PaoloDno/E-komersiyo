const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true
  },
  storeOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  storeDescription: {
    type: String,
    required: true
  },
  storeCategory: {
    type: [String],
    default: []
  },
  storeImage: {
    type: String,
    default: ""
  },
  verified: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;
