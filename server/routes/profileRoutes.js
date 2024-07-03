const express = require('express');
const router = express.Router();
const { getProfileByUserId, updateProfile, getAddressByUserId } = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware for protected routes

router.get('/:userID', authMiddleware, getProfileByUserId);
router.put('/:profileId', authMiddleware, updateProfile);
router.get('/address/:userID', authMiddleware, getAddressByUserId);


module.exports = router;
