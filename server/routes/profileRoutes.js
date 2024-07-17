const express = require('express');
const router = express.Router();
const { getProfileByUserId, updateUserProfile, getAddressByUserId, updateAddressProfile} = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.get('/:userID', authMiddleware, getProfileByUserId);
router.put('/update/:userID', authMiddleware, updateUserProfile);
router.get('/address/:userID', authMiddleware, getAddressByUserId);
router.put('/updateAddress/:userID', authMiddleware, updateAddressProfile);



module.exports = router;
