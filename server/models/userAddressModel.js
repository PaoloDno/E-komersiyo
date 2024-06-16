const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  bgry: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  postal: {
    type: String,
    required: true
  }
});

const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;
