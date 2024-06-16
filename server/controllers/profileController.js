const Profile = require('../models/userProfileModel');
const User = require('../models/usersModel');
const UserHistory = require('../models/userHistoryModel');
const Address = require('../models/userAddressModel');

exports.createProfile = async (req, res) => {
  try {
    const { userProfile, phoneNumber, userImage, userName, userStores, address, cartNumber, userHistory } = req.body;

    // Check if the user exists
    const user = await User.findById(userName);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create and save the new profile
    const profile = new Profile({
      userProfile,
      phoneNumber,
      userImage,
      userName,
      userStores,
      address,
      cartNumber,
      userHistory
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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
    const { userProfile, phoneNumber, userImage, userStores, address, cartNumber, userHistory } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userName: req.params.userId },
      { userProfile, phoneNumber, userImage, userStores, address, cartNumber, userHistory },
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

