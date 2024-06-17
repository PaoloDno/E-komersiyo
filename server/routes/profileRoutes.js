const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware for protected routes


// Route to get a profile by user ID
router.get('/:userId', authMiddleware, profileController.getProfileByUserId);

// Route to update a profile by user ID
router.put('/:userId', authMiddleware, profileController.updateProfile);


module.exports = router;
