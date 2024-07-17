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

const updateUserProfile = async (req, res) => {
  const { userID } = req.params;
  const profileData = req.body;

  if (!profileData) {
    return res.status(400).json({ error: "Profile data is missing" });
  }

  const { firstname, lastname, middleInitial, phoneNumber } = profileData;

  try {
    console.log("Profile data received:", profileData);

    const profile = await Profile.findOneAndUpdate(
      { userID },
      {
        'userProfile.firstname': firstname,
        'userProfile.lastname': lastname,
        'userProfile.middleInitial': middleInitial,
        'phoneNumber': phoneNumber
      },
      { new: true, upsert: true } // Return the updated document
    );

    console.log("Updated profile:", profile);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    console.log('finished profile update')
    return res.status(200).json({ message: 'Profile successfully updated', profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ error: "An error occurred while updating the profile" });
  }
};

const getAddressByUserId = async (req, res) => {
  console.log('Fetching address in controller');

  const { userID } = req.params;

  try {
    const address = await Address.findOne({ userID });
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


const updateAddressProfile = async (req, res) => {
  const { userID } = req.params;
  const addressData = req.body;
  
  console.log(userID)
  if (!addressData) {
    return res.status(400).json({ error: "Profile Address data is missing" });
  }

  const { street, brgy, city, country, postal } = addressData;

  try {
    console.log("Profile data received:", addressData);

    const address = await Address.findOneAndUpdate(
      { userID },
      {
        street,
        brgy,
        city,
        country,
        postal
      },
      { new: true, upsert: true } // Return the updated document
    );

    console.log("Updated profile:", address);

    if (!address) {
      return res.status(404).json({ error: "Profile not found" });
    }
    console.log('finished address update')
    return res.status(200).json({ message: 'Profile successfully updated', address });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ error: "An error occurred while updating the profile" });
  }
};


module.exports = { getProfileByUserId, updateUserProfile, getAddressByUserId, updateAddressProfile };
