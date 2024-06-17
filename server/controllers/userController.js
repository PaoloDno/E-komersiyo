const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel.js');
const UserProfile = require('../models/userProfileModel.js');
const Cart = require('../models/cartModel.js');
const UserHistory = require('../models/userHistoryModel.js');
const UserAddress = require('../models/userAddressModel.js');

const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // Create related address
    const newAddress = new UserAddress();
    await newAddress.save();

    // Create related cart
    const newCart = new Cart({
      userId: savedUser._id,
      items: []  // Initial empty cart
    });
    await newCart.save();

    // Create related history
    const newUserHistory = new UserHistory({
      userId: savedUser._id,
      reviewHistory: [],
      itemHistory: []
    });
    await newUserHistory.save();

    // Create related profile
    const newProfile = new UserProfile({
      userProfile: {
        firstname: '',
        lastname: '',
        middleInitial: ''
      },
      phoneNumber: '',
      userImage: '',
      userName: savedUser._id,
      userStores: [],
      address: newAddress._id,
      cartNumber: newCart._id,
      userHistory: newUserHistory._id
    });
    await newProfile.save();

    // Generate JWT token
    const token = jwt.sign(
      { userID: savedUser._id, username: savedUser.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully', 
      token, 
      user: { userID: savedUser._id, username: savedUser.username },
      profile: newProfile,
      cart: newCart,
      history: newUserHistory,
      address: newAddress
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userID: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      success: true, 
      token,
      user: { userID: user._id, username: user.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getUser = async (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Failed to authenticate token' });
    }

    const user = await User.findById(decoded.userID, { password: 0 }); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  });
};

module.exports = { registerUser, loginUser, getUser };
