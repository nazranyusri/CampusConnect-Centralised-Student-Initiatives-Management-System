const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const businessController = require('../controllers/businessController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

const upload = multer({ storage: storage });

// const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../services/authentication');

//get all businesses
router.get('/', businessController.getAllBusiness);

//get business by id
router.get('/:businessId', businessController.getBusinessById);

//get business history
router.get('/history/:userId', businessController.getBusinessHistory);

//create business
router.post('/add', auth.authenticateToken, upload.single('image'), businessController.addBusiness);

//update program
router.patch('/update', auth.authenticateToken, upload.single('image'), businessController.updateBusiness);

//delete business
router.delete('/delete/:id/:imagePath', auth.authenticateToken, businessController.deleteBusiness);

module.exports = router;