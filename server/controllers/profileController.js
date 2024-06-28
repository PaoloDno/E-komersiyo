const Profile = require('../models/userProfileModel');

const getProfileByUserId = async (req, res) => {
  try {
    
    console.log(json(profile));
    const profile = await Profile.findOne({ userID: req.params.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profilesasdas not found' });
    }
    console.log(json(profile));
    res.status(200).json(profile);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateProfile = async (req, res) => {
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

module.exports = { getProfileByUserId, updateProfile };