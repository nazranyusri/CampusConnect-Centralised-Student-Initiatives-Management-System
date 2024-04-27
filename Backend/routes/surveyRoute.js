const express = require('express');
const router = express.Router();
const businessController = require('../controllers/surveyController');

// const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../services/authentication');

//get all surveys
router.get('/', businessController.getAllSurvey);

//get survey by id
router.get('/:id', businessController.getSurveyById);

//create survey
router.post('/add', auth.authenticateToken, businessController.addSurvey);

//update survey
router.patch('/update/:id', auth.authenticateToken, businessController.updateSurvey);

//delete survey
router.delete('/delete/:id', auth.authenticateToken, businessController.deleteSurvey);

module.exports = router;