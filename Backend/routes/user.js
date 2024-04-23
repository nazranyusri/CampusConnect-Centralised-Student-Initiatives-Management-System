const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
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

//get a user
router.get('/profile', auth.authenticateToken, (req, res, next) => {
    const tokenPayload = res.userLocal;
    var sql = 'SELECT id, username, email, role FROM user WHERE id = ?';
    connection.query(sql, [tokenPayload.id], (err, result) => {
        if (!err) {
            return res.status(200).json({ result });
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;