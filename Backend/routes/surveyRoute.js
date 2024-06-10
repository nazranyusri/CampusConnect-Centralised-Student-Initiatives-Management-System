const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

// const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../services/authentication');

//get all surveys
router.get('/', surveyController.getAllSurvey);

//get total survey -- viewed in Homepage
router.get('/total', surveyController.getTotalSurvey);

//get latest survey -- viewed in Homepage
router.get('/latest', surveyController.getLatestSurvey);

//get survey by id
router.get('/:surveyId', surveyController.getSurveyById);

//get survey history
router.get('/history/:userId', surveyController.getSurveyHistory);

//create survey
router.post('/add', auth.authenticateToken, surveyController.addSurvey);

//update survey
router.patch('/update', auth.authenticateToken, surveyController.updateSurvey);

//delete survey
router.delete('/delete/:surveyId', auth.authenticateToken, surveyController.deleteSurvey);

module.exports = router;