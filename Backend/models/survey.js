const connection = require('../connection');

//get all surveys
const getAllSurvey = (callback) => {
    const sql = 'SELECT * FROM survey';
    connection.query(sql, callback);
};

//get survey by id
const getSurveyById = (surveyId, callback) => {
    const sql = 'SELECT * FROM survey WHERE surveyId = ?';
    connection.query(sql, surveyId, callback);
};

//get specific user surveys -- viewed in Profile page
const getSurveyHistory = (userId, callback) => {
    const sql = 'SELECT * FROM survey WHERE userId = ?';
    connection.query(sql, [userId], callback);
};

//create survey
const addSurvey = (survey, callback) => {
    const sql = `INSERT INTO survey (fullName, userId, description, surveyLink, surveyTitle, time, datePublished) VALUES (?, ?, ?, ?, ?, ?, ?)`; 
    connection.query(sql, [survey.fullName, survey.userId, survey.description, survey.surveyLink, survey.surveyTitle, survey.time, survey.datePublished], callback); //survey.datePublished should be replaced with CURDATE() after complete testing using Postman  
};

//update survey
const updateSurvey = (surveyId, survey, callback) => {
    const sql = 'UPDATE survey SET fullName = ?, description = ?, surveyLink = ?, surveyTitle = ?, time = ? WHERE surveyId = ?';
    connection.query(sql, [survey.fullName, survey.description, survey.surveyLink, survey.surveyTitle, survey.time, surveyId], callback);
};

//delete survey
const deleteSurvey = (surveyId, callback) => {
    const sql = "DELETE FROM survey WHERE surveyId = ?";
    connection.query(sql, surveyId, callback);
};

module.exports = {
    getAllSurvey,
    getSurveyHistory,
    getSurveyById,
    addSurvey,
    updateSurvey,
    deleteSurvey
};