const connection = require('../connection');

//get all surveys
const getAllSurvey = (callback) => {
    const sql = 'SELECT s.*, u.username AS createdBy, u.image AS profileImage FROM survey s JOIN user u ON s.userId = u.userId ORDER BY s.surveyId DESC';
    connection.query(sql, callback);
};

//get survey by id
const getSurveyById = (surveyId, callback) => {
    const sql = `SELECT s.*, u.fullName, u.username AS createdBy, u.image AS profileImage FROM survey s JOIN user u ON s.userId = u.userId WHERE s.surveyId = ?`;
    connection.query(sql, surveyId, callback);
};

//get total survey -- viewed in Homepage
const getTotalSurvey = (callback) => {
    const sql = 'SELECT COUNT(*) AS totalSurvey FROM survey';
    connection.query(sql, callback);
};

//get latest survey -- viewed in Homepage
const getLatestSurvey = (callback) => {
    const sql = 'SELECT s.surveyId, s.surveyTitle, s.description, s.datePublished, u.username AS createdBy, u.image AS profileImage FROM survey s JOIN user u ON s.userId = u.userId ORDER BY s.surveyId DESC LIMIT 3';
    connection.query(sql, callback);
};

//get specific user surveys -- viewed in Profile page
const getSurveyHistory = (userId, callback) => {
    const sql = 'SELECT * FROM survey WHERE userId = ? ORDER BY surveyId DESC';
    connection.query(sql, [userId], callback);
};

//create survey
const addSurvey = (survey, callback) => {
    const sql = `INSERT INTO survey (userId, description, surveyLink, surveyTitle, time, datePublished) VALUES (?, ?, ?, ?, ?, ?)`; 
    connection.query(sql, [survey.userId, survey.description, survey.surveyLink, survey.surveyTitle, survey.time, survey.datePublished], callback);
};

//update survey
const updateSurvey = (survey, callback) => {
    const sql = 'UPDATE survey SET description = ?, surveyLink = ?, surveyTitle = ?, time = ? WHERE surveyId = ?';
    connection.query(sql, [survey.description, survey.surveyLink, survey.surveyTitle, survey.time, survey.surveyId], callback);
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
    getTotalSurvey,
    getLatestSurvey,
    addSurvey,
    updateSurvey,
    deleteSurvey
};