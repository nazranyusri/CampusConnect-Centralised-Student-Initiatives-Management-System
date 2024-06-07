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

//get specific user survey -- viewed in Profile 
const getSurveyHistory = (req, res) => {
    const userId = req.params.userId;
    surveyModel.getSurveyHistory(userId, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
}

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
    getSurveyById,
    getSurveyHistory,
    addSurvey,
    updateSurvey,
    deleteSurvey
};