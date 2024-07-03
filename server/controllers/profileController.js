const Profile = require('../models/userProfileModel');
const Address = require('../models/userAddressModel');

const getProfileByUserId = async (req, res) => {
  console.log('Fetching profile in controller');
  const { userID } = req.params;

  try {
    const profile = await Profile.findOne({ userID });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    console.log('success profiel fetech')
    return res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { userID } = req.params;
  const { userProfile, phoneNumber, userImage, userStores } = req.body;

  try {
    const profile = await Profile.findOneAndUpdate(
      { userID },
      { userProfile, phoneNumber, userImage, userStores },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error('Error updating profile:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getAddressByUserId = async (req, res) => {
  console.log('Fetching address in controller');

  const { userID } = req.params;

  try {
    const address = await Address.findOne({ userId: userID });
    //fucking shit ID vs Id

    if (!address) {
      return res.status(404).json({ message: 'Profile Address not found' });
    }
    console.log('success address fetech')
    return res.status(200).json(address);
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfileByUserId, updateProfile, getAddressByUserId };
