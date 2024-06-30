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

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // address
    const newAddress = new UserAddress({
      userId: savedUser._id,
    });
    const savedAddress = await newAddress.save();

    // cart
    const newCart = new Cart({
      userId: savedUser._id,
      items: []  // Initial empty cart
    });
    const savedCart = await newCart.save();


    // history
    const newUserHistory = new UserHistory({
      userId: savedUser._id,
      reviewHistory: [],
      itemHistory: []
    });
    const savedHistory = await newUserHistory.save();

    // profile
    const newProfile = new UserProfile({
      userProfile: {
        firstname: '',
        lastname: '',
        middleInitial: ''
      },
      phoneNumber: '',
      userImage: 'defaultImg',
      userStores: [],
      userID: savedUser._id,
      addressID: savedAddress._id,
      cartID: savedCart._id,
      userHistoryID: savedHistory._id
    });
    await newProfile.save();

    // Generate JWT token
    const token = jwt.sign(
      { userID: savedUser._id, username: savedUser.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    //postman if i ever learn to use postman
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
      message: 'successful login'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



module.exports = { registerUser, loginUser};
