const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const progHistory = require('../controllers/programController').getProgramHistory;
require('dotenv').config();
var auth = require('../services/authentication');

//login
router.post('/login', (req, res, next) => {
    const user = req.body;
    var sql = 'SELECT * FROM user WHERE email = ?';
    connection.query(sql, [user.email], (err, result) => {
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
});

//register
router.post('/register', (req, res, next) => {
    const user = req.body;
    var sql = `INSERT INTO user (username, email, password, role) VALUES ('${user.username}', '${user.email}', '${user.password}', 'user')`;
    connection.query(sql, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "User added successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

//get user profile and posts history
router.get('/profile', auth.authenticateToken, async (req, res, next) => { // Added async keyword
    const tokenPayload = res.userLocal;

    try {
        const userData = await getUserData(tokenPayload.id);
        const programHistory = await progHistory(userData.username); // Call getUserProgramHistory function

        return res.status(200).json({ userData, programHistory }); // Return both user data and program history
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
router.patch('/update', auth.authenticateToken, (req, res, next) => {
    const tokenPayload = res.userLocal;
    let user = req.body;
    var sql = 'UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?';
    connection.query(sql, [user.username, user.email, user.password, tokenPayload.id], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "User details updated successfully" });
        } else {
            return res.status(500).json(err); 
        }
    });
});

module.exports = router;