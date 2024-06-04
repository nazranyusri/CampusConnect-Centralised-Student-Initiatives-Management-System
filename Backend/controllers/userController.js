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
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '2h' });
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

    userModel.checkExistingUser(user, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result) {
            return res.status(401).json({ message: "Email or username already exists" });
        }

        userModel.register(user, (err, result) => {
            if (!err) {
                return res.status(200).json({ message: "User registered successfully" });
            } else {
                return res.status(500).json(err);
            }
        });
    });
};

//view profile
const getUser = (req, res) => {
    const tokenPayload = res.userLocal;
    userModel.getUser(tokenPayload.id, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
}

//view profile and posts history
// const viewProfile = async (req, res, next) => {
//     const tokenPayload = res.userLocal;
//     try {
//         const userData = await getUserData(tokenPayload.id);
//         const programHistory = await progHistory(userData.username); // Call getUserProgramHistory function
//         const businessHistory = await busiHistory(userData.username); // Call getUserBusinessHistory function
//         const surveyHistory = await survHistory(userData.username); // Call getUserSurveyHistory function
//         // console.log(tokenPayload.id);
//         // console.log(userData);
//         // console.log(userData.username);
//         // console.log(userData);
//         // console.log(programHistory);
//         // console.log(businessHistory);
//         // console.log(surveyHistory);
//         return res.status(200).json({ userData, programHistory, businessHistory, surveyHistory }); // Returns user data, program history, business history
//     } catch (error) {
//         return res.status(500).json({ message: "Internal server error" });
//     }

//     function getUserData(userId) {
//         return new Promise((resolve, reject) => {
//             userModel.viewProfile(userId, (err, result) => {
//                 if (!err && result.length > 0) {
//                     resolve(result[0]);
//                 } else {
//                     reject(err || { message: "User not found" });
//                 }
//             });
//         });
//     }
// };

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
    getUser,
    updateProfile
};