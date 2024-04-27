const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../services/authentication');

//get persaka content
router.get('/', (req, res, next) => {
    var sql = "SELECT * FROM persakacontent";
    connection.query(sql, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});

//update persaka content
router.patch('/update', auth.authenticateToken, (req, res, next) => {
    var tokenPayload = res.userLocal;
    if (tokenPayload.role != 'admin') {
        return res.status(403).json({ message: "You don't have access to edit this page!" });
    }
    else {
        let content = req.body;
        var sql = "UPDATE persakacontent SET title = ?, description = ?, image = ? WHERE id = 1";
        connection.query(sql, [content.title, content.description, content.image], (err, result) => {
            if (!err) {
                return res.status(200).json({ message: "Persaka page updated successfully" });
            } else {
                return res.status(500).json(err); 
            }
        });
    }
});

module.exports = router;