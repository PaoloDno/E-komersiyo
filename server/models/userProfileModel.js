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
  phoneNo: {
    type: String,
    default: ""
  },
  userImg: {
    type: String,
    default: ""
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userStores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }],
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
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
  },
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
