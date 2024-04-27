const surveyModel = require('../models/survey');

//get all surveys
const getAllSurvey = (req, res) => {
    surveyModel.getAllSurvey((err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
};

//get specific user surveys -- viewed in Profile page
const getSurveyHistory = (username) => {
    return new Promise((resolve, reject) => {
        surveyModel.getSurveyHistory(username, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

//get survey by id
const getSurveyById = (req, res) => {
    const id = req.params.id;
    surveyModel.getSurveyById(id, (err, result) => {
        if (!err) {
            if(result.length == 0){
                return res.status(404).json({message: "Survey id not found"});
            }
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    });
};

//create survey
const addSurvey = (req, res) => {
    const survey = req.body;
    surveyModel.addSurvey(survey, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Survey added successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
};

//update survey
const updateSurvey = (req, res) => {
    const id = req.params.id;
    const survey = req.body;
    surveyModel.updateSurvey(id, survey, (err, result) => {
        if (!err) {
            if(result.affectedRows == 0){
                return res.status(404).json({message: "Business id not found"});
            }
            return res.status(200).json({ message: "Survey updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
};

//delete survey
const deleteSurvey = (req, res) => {
    const id = req.params.id;
    surveyModel.deleteSurvey(id, (err, result) => {
        if (!err) {
            if(result.affectedRows == 0){
                return res.status(404).json({message: "Survey id not found"});
            }
            return res.status(200).json({ message: "Survey deleted successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
};

module.exports = {
    getAllSurvey,
    getSurveyHistory,
    getSurveyById,
    addSurvey,
    updateSurvey,
    deleteSurvey
};