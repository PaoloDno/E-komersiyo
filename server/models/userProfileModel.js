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
  },
  phoneNumber: {
    type: String,
    default: ""
  },
  userImage: {
    type: String,
    default: ""
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userStores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }],
  addressID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  cartID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
  userHistoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserHistory'
  },
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
