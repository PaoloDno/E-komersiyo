const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 

const { fetchUserStores, fetchUsersStore, createStore, updateUserStore, requestDeleteUserStore } = require('../controllers/storeController')

router.get('/:userID', authMiddleware, fetchUserStores );
router.post('/create/:userID', authMiddleware, createStore);
router.get('/users/:storeID', authMiddleware, fetchUsersStore);
router.put('/updateUsersStore/:storeID', authMiddleware, updateUserStore);
router.put('/delete/:storeID/:userID', authMiddleware, requestDeleteUserStore);

module.exports = router;