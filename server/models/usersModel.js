const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
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
  userRole: {
    type: Number,
    default: 0
  },
  phoneNumber: {
    type: String,
    default: ""
  },
  userImage: {
    type: String,
    default: ""
  },
  verified: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
