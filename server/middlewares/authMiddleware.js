const jwt = require('jsonwebtoken');
const User = require('../models/usersModel'); // Adjust the path based on your project structure
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Access denied, no token provided.' });
    }

    // Extract token from Authorization header
    const token = authHeader.replace('Bearer ', '');

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded)
    // Check if user exists
    const user = await User.findById(decoded.userID);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Attach user information to request object
    req.user = user;
    next(); // Pass control to the next middleware
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ success: false, message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
