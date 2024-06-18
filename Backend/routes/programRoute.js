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
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../services/authentication');

//get all programs
router.get('/', programController.getAllProgram);

//get total program -- viewed in Homepage
router.get('/total', programController.getTotalProgram);

//get latest program -- viewed in Homepage
router.get('/latest', programController.getLatestProgram);

//get program by id
router.get('/:id', programController.getProgramById);

//get program history
router.get('/history/:userId', auth.authenticateToken, programController.getProgramHistory);

//get user registered program
router.get('/registered/:userId', auth.authenticateToken, programController.getUserRegisteredProgram);

//create program
router.post('/add', auth.authenticateToken, upload.single('image'), programController.addProgram);

//update program
router.patch('/update', auth.authenticateToken, upload.single('image'), programController.updateProgram);

//delete program
router.delete('/delete/:id/:imagePath', auth.authenticateToken, programController.deleteProgram);

//register program
router.post('/register', programController.registerProgram);

//get program registrant
router.get('/registrant/:programId', auth.authenticateToken, programController.getRegistrant);

module.exports = router;