const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    default: ''
  },
  bgry: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''  
  },
  country: {
    type: String,
    default: ''
  },
  postal: {
    type: String,
    default: ''
  }
});

const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;
