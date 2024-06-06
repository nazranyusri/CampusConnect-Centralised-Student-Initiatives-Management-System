const express = require('express');
const router = express.Router();
const connection = require('../connection');
const userController = require('../controllers/userController');

require('dotenv').config();
var auth = require('../services/authentication');

//login
router.post('/login', userController.authenticateUser);

//register
router.post('/register', userController.register);

//view profile
router.get('/profile/:userId', auth.authenticateToken, userController.getUser);

//update profile
router.patch('/update', auth.authenticateToken, userController.updateProfile);

module.exports = router;