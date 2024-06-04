const connection = require('../connection');

//get all surveys
const getAllSurvey = (callback) => {
    const sql = 'SELECT * FROM survey';
    connection.query(sql, callback);
};

//get survey by id
const getSurveyById = (id, callback) => {
    const sql = 'SELECT * FROM survey WHERE id = ?';
    connection.query(sql, id, callback);
};

//get specific user surveys -- viewed in Profile page
const getSurveyHistory = (username, callback) => {
    const sql = 'SELECT * FROM survey WHERE createdBy = ?';
    connection.query(sql, [username], callback);
};

//create survey
const addSurvey = (survey, callback) => {
    const sql = `INSERT INTO survey (fullName, createdBy, description, surveyLink, surveyTitle, time, datePublished) VALUES (?, ?, ?, ?, ?, ?, ?)`; 
    connection.query(sql, [survey.fullName, survey.createdBy, survey.description, survey.surveyLink, survey.surveyTitle, survey.time, survey.datePublished], callback); //survey.datePublished should be replaced with CURDATE() after complete testing using Postman  
};

//update survey
const updateSurvey = (id, survey, callback) => {
    const sql = 'UPDATE survey SET fullName = ?, description = ?, surveyLink = ?, surveyTitle = ?, time = ? WHERE id = ?';
    connection.query(sql, [survey.fullName, survey.description, survey.surveyLink, survey.surveyTitle, survey.time, id], callback);
};

//delete survey
const deleteSurvey = (id, callback) => {
    const sql = "DELETE FROM survey WHERE id = ?";
    connection.query(sql, id, callback);
};

module.exports = {
    getAllSurvey,
    getSurveyHistory,
    getSurveyById,
    addSurvey,
    updateSurvey,
    deleteSurvey
};