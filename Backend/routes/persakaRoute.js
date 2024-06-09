const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const persakaController = require('../controllers/persakaController');

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

//get persaka content
router.get('/', persakaController.getContent);

//update persaka content
router.patch('/update', auth.authenticateToken, upload.single('image'), persakaController.updateContent);

module.exports = router;