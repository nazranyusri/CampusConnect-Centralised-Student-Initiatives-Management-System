const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const programController = require('../controllers/programController');

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

//get all programs
router.get('/', programController.getAllProgram);

//get program by id
router.get('/:id', programController.getProgramById);

//get program history
router.get('/history/:username', programController.getProgramHistory);

//create program
router.post('/add', auth.authenticateToken, upload.single('image'), programController.addProgram);

//update program
router.patch('/update', auth.authenticateToken, upload.single('image'), programController.updateProgram);

//delete program
router.delete('/delete/:id/:imagePath', auth.authenticateToken, programController.deleteProgram);

module.exports = router;