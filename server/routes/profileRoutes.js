const express = require('express');
const router = express.Router();
const { getProfileByUserId, updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware for protected routes

router.get('/:userId', authMiddleware, getProfileByUserId);
router.put('/:profileId/profile', authMiddleware, updateProfile);


module.exports = router;
