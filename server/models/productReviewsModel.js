const mongoose = require('mongoose');

const ProductReviewSchema = new mongoose.Schema({
  reviewerName: {
    type: String,
    required: true
  },
  ReviwerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  reviewerRating: {
    type: Number,
    required: true
  },
  reviewText: {
    type: String,
    default: ""
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const ProductReview = mongoose.model('ProductReview', ProductReviewSchema);
module.exports = ProductReview;
