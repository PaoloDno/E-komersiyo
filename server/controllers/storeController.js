const Store = require('../models/storeModel');
const User = require('../models/usersModel');
const Profile = require('../models/userProfileModel');

const fetchUserStores = async (req, res) => {
  console.log('user stores');
  const { userID } = req.params;
  try {
    const stores = await Store.find({  "storeOwner.storeOwnerID": userID  });
    if (stores) {
      console.log(stores);
      res.status(200).json(stores);
    } else {
      res.status(404).json({ message: "Store not found" });
    }
   } catch (error) {
    res.status(500).json({message: "Error fetching user stores", error });
   } 
};

const fetchUsersStore = async (req, res) => {
  const { storeID } = req.params;
  
  console.log("Fetching store with ID:", storeID);
  
  try {
    const store = await Store.findById(storeID);
    
    if (store) {
      res.status(200).json(store);
    } else {
      res.status(404).json({ message: "Store not found fr fr" });
    }
  } catch (error) {
    console.log("Error fetching store:", error);
    res.status(500).json({ message: "Error fetching store", error });
  } 
};


const createStore = async (req, res) => {
  const { userID } = req.params;
  const { storeName, storeOwner, storeDescription } = req.body;
  const { storeOwnerID, storeOwnerName } = storeOwner;

  console.log("Received request to create store");
  try {
    console.log("Finding user");
    const user = await User.findById(userID);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found fr" });
    }

    console.log("Finding user profile");
    const userProfile = await Profile.findOne({ userID });
    if (!userProfile) {
      console.log("User profile not found");
      return res.status(404).json({ message: "User profile not found" });
    }

    console.log("Checking number of stores");
    if (userProfile.userStores.length >= 3) {
      console.log("User has reached the maximum number of stores");
      return res.status(400).json({ message: "User has reached the maximum number of stores" });
    }

    console.log("Adding new store to user's profile");
   

    console.log("Creating new store");
    const newStore = new Store({
      storeName,
      storeOwner: {
        storeOwnerID: storeOwnerID,
        storeOwnerName: storeOwnerName,
      },
      storeDescription,
      storeCategory: ["store"],
    });


    userProfile.userStores.push({ storeName, storeDescription, storeID: newStore._id, storeOwnerID });
    await userProfile.save();
    console.log("User profile updated with new store");

    const savedStore = await newStore.save();
    console.log("New store saved successfully");
    res.status(201).json(savedStore);
  } catch (error) {
    console.error("Error creating store:", error);
    res.status(500).json({ message: "Error creating store", error });
  }
};



const updateUserStore = async (req, res) => {
  const { storeID } = req.params;
  const updateData = req.body;
  try {
    const updatedStore = await Store.findByIdAndUpdate(storeID, updateData, { new: true });
    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.status(200).json(updatedStore);
  } catch (error) {
    res.status(500).json({ message: "Error updating store", error });
  }
};


const requestDeleteUserStore = async (req, res) => {
  const { storeID, userID } = req.params;

  try {
    const store = await Store.findOneAndUpdate(
      { _id: storeID, "storeOwner.storeOwnerID": userID },
      { OwnerRequestToDelete: true },
      { new: true }
    );

    if (!store) {
      return res.status(404).json({ message: "Store not found or you do not have permission to delete this store" });
    }

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: "Error requesting store deletion", error });
  }
};

module.exports = { fetchUserStores, fetchUsersStore, updateUserStore, createStore, requestDeleteUserStore};