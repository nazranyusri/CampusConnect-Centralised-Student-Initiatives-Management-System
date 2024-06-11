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
    const surveyId = req.params.surveyId;
    surveyModel.getSurveyById(surveyId, (err, result) => {
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

//get total survey -- viewed in Homepage
const getTotalSurvey = (req, res) => {
    surveyModel.getTotalSurvey((err, result) => {
        if (!err) {
            return res.status(200).json({ totalSurvey: result[0].totalSurvey });
        } else {
            return res.status(500).json(err);
        }
    });
};

//get latest survey -- viewed in Homepage
const getLatestSurvey = (req, res) => {
    surveyModel.getLatestSurvey((err, result) => {
        if (!err) {
            return res.status(200).json(result);
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

// Update survey
const updateSurvey = (req, res) => {
    const survey = req.body;
    surveyModel.getSurveyById(survey.surveyId, (err, result) => {
        // console.log("survey id", survey.surveyId);
        // console.log("masuk surveybyid", result);
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length == 0) {
            return res.status(404).json({ message: "Survey id not found" });
        }

        // Ownership check
        if (result[0].userId !== res.userLocal.userId) {
            // console.log(result[0].userId, res.userLocal.userId);
            // console.log("ownership");
            return res.status(403).json({ message: "Forbidden" });
        }

        surveyModel.updateSurvey(survey, (err, result) => {
            if (!err) {
                if (result.affectedRows == 0) {
                    return res.status(404).json({ message: "Survey id not found updateSurvey function" });
                }
                return res.status(200).json({ message: "Survey updated successfully" });
            } else {
                return res.status(500).json(err);
            }
        });
    });
};

//delete survey
const deleteSurvey = (req, res) => {
    const surveyId = req.params.surveyId;
    
    surveyModel.getSurveyById(surveyId, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length == 0) {
            return res.status(404).json({ message: "Survey id not found" });
        }

        // Ownership check
        if (result[0].userId !== res.userLocal.userId && res.userLocal.role !== 'admin') {
            // console.log("this survey", result[0].userId, "logged in as", res.userLocal.userId);
            return res.status(403).json({ message: "Forbidden" });
        }

        surveyModel.deleteSurvey(surveyId, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Survey id not found" });
            }

            return res.status(200).json({ message: "Survey deleted successfully"});
        });
    });
};

module.exports = {
    getAllSurvey,
    getSurveyById,
    getTotalSurvey,
    getLatestSurvey,
    getSurveyHistory,
    addSurvey,
    updateSurvey,
    deleteSurvey
};