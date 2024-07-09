const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true
  },
  storeOwner: {
    storeOwnerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    storeOwnerName: {
      type: String,
      required: true
    }
  },
  storeDescription: {
    type: String,
    required: true
  },
  storeCategory: {
    type: [String],
    default: []
  },
  storeProfileImage: {
    type: String,
    default: ""
  },
  storeRating:{
    type: Number,
    default: 3
  },
  verified: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  OwnerRequestToDelete: {
    type: Boolean,
    default: false
  },
  storeReports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StoreReport'
  }],
  storeReviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StoreReview'
  }]
});

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;
