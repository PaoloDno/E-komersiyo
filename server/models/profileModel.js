const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  add an array for user stores he owns
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
  },
  cartNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  userHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserHistory'
  }
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
