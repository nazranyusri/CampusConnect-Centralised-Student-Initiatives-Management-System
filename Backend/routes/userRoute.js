const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

const upload = multer({ storage: storage });

require('dotenv').config();
var auth = require('../services/authentication');

//login
router.post('/login', userController.authenticateUser);

//register
router.post('/register', userController.register);

//view profile
router.get('/profile/:userId', auth.authenticateToken, userController.getUser);

//update profile
router.patch('/update', auth.authenticateToken, upload.single('image'), userController.updateProfile);

module.exports = router;