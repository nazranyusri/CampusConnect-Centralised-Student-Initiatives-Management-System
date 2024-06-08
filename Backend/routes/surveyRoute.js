const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

// const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../services/authentication');

//get all surveys
router.get('/', surveyController.getAllSurvey);

//get survey by id
router.get('/:surveyId', surveyController.getSurveyById);

//get survey history
router.get('/history/:userId', surveyController.getSurveyHistory);

//create survey
router.post('/add', auth.authenticateToken, surveyController.addSurvey);

//update survey
router.patch('/update/:id', auth.authenticateToken, surveyController.updateSurvey);

//delete survey
router.delete('/delete/:id', auth.authenticateToken, surveyController.deleteSurvey);

module.exports = router;