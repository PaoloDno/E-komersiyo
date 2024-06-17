const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');
const Profile = require('../models/userProfileModel');



exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userName: req.params.userId }).populate('userStores address cartNumber userHistory');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { userProfile, phoneNumber, userImage, userStores } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userName: req.params.userId },
      { userProfile, phoneNumber, userImage, userStores },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

