const express = require('express');
const router = express.Router();
const connection = require('../connection');
const userController = require('../controllers/userController');

const progHistory = require('../controllers/programController').getProgramHistory;
const busiHistory = require('../controllers/businessController').getBusinessHistory;
const survHistory = require('../controllers/surveyController').getSurveyHistory;

require('dotenv').config();
var auth = require('../services/authentication');

//login
router.post('/login', userController.authenticateUser);

//register
router.post('/register', userController.register);

//view profile and posts history
router.get('/profile', auth.authenticateToken, async (req, res, next) => { // Added async keyword
    const tokenPayload = res.userLocal;
    try {
        const userData = await getUserData(tokenPayload.id);
        const programHistory = await progHistory(userData.username); // Call getUserProgramHistory function
        const businessHistory = await busiHistory(userData.username); // Call getUserBusinessHistory function
        const surveyHistory = await survHistory(userData.username); // Call getUserSurveyHistory function

        return res.status(200).json({ userData, programHistory, businessHistory, surveyHistory }); // Returns user data, program history, business history
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

//fetch user data for profile viewing
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT id, username, email, role FROM user WHERE id = ?';
        connection.query(sql, [userId], (err, result) => {
            if (!err && result.length > 0) {
                resolve(result[0]);
            } else {
                reject(err || { message: "User not found" });
            }
        });
    });
}

//update profile
router.patch('/update', auth.authenticateToken, userController.updateProfile);

module.exports = router;