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

//get all user
router.get('/', userController.getAllUser);

//get club request
router.get('/clubrequest', userController.getClubRequest);

//approve club request
router.patch('/approveclub', auth.authenticateToken, userController.approveClub);

//login
router.post('/login', userController.authenticateUser);

//user register
router.post('/registeruser', userController.registerUser);

//club register
router.post('/registerclub', userController.registerClub);

//view profile
router.get('/profile/:userId', auth.authenticateToken, userController.getUser);

//update profile
router.patch('/update', auth.authenticateToken, upload.single('image'), userController.updateProfile);

//delete user
router.delete('/delete/:userId/:imagePath', auth.authenticateToken, userController.deleteUser);

module.exports = router;