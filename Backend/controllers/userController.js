const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const progHistory = require('../controllers/programController').getProgramHistory;
const busiHistory = require('../controllers/businessController').getBusinessHistory;
const survHistory = require('../controllers/surveyController').getSurveyHistory;

//login
const authenticateUser = (req, res) => {
    const user = req.body;
    userModel.authenticateUser(user, (err, result) => {
        if (!err) {
            if (result.length <= 0 || result[0].password != user.password) {
                return res.status(401).json({ message: "Incorrect email or password" });
            }
            else if (result[0].password == user.password) {
                const response = { id: result[0].id, username: result[0].username, role: result[0].role, email: result[0].email };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                return res.status(200).json({ token: accessToken });
            }
        } else {
            return res.status(500).json(err);
        }
    });
};

//register
const register = (req, res) => {
    const user = req.body;
    userModel.register(user, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "User registered successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
};

//view profile and posts history

//update profile
const updateProfile = (req, res) => {
    const tokenPayload = res.userLocal;
    let user = req.body;
    userModel.updateProfile(user, tokenPayload.id, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "User details updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
};


module.exports = {
    authenticateUser,
    register,
    updateProfile
};