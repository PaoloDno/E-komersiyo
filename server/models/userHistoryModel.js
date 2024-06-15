const mongoose = require('mongoose');

const UserHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  itemHistory: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    purchaseDate: {
      type: Date,
      default: Date.now
    }
  }]
});

const UserHistory = mongoose.model('UserHistory', UserHistorySchema);
module.exports = UserHistory;
