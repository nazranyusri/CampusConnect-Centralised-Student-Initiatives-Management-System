const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../services/authentication');

//get all programs
router.get('/', programController.getAllProgram);

//get program by id
router.get('/:id', programController.getProgramById);

//create program
router.post('/add', auth.authenticateToken, programController.addProgram);

//update program
router.patch('/update/:id', auth.authenticateToken, programController.updateProgram);

//delete program
router.delete('/delete/:id', auth.authenticateToken, programController.deleteProgram);

module.exports = router;