const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  reviewerName: {
    type: String,
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
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
