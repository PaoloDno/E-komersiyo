const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userProfile: 
    {
      firstname: {
        type: String,
        default: ""
      },
      lastname: {
        type: String,
        default: ""
      },
      middleInitial: {
        type: String,
        default: ""
      },
      phoneNumber: {
        type: String,
        default: ""
      },
  },
  userImage: {
    type: String,
    default: "avatar"
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userStores: [{
    storeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store'
    },
    storeName: {
      type: String,
      required: true
    }
  }],
  addressID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  cartID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  userHistoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserHistory',
    required: true
  },
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
