const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/userController');

const router = express.Router();
///api/users
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getUser); 

module.exports = router;