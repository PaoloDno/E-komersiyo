const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
