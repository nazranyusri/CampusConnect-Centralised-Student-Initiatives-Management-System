const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../services/authentication');

//get specific user programs
function getProgramHistory(username) {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT * FROM program WHERE createdBy = ?';
        connection.query(sql, [username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//get all programs
router.get('/', (req, res, next) => {
    var sql = 'SELECT * FROM program';
    connection.query(sql, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});

//get specific user programs
router.get('/history', auth.authenticateToken, (req, res, next) => {
    const tokenPayload = res.userLocal;
    var sql = 'SELECT * FROM program WHERE createdBy = ?';
    connection.query(sql, [tokenPayload.username], (err, result) => {
        if (!err) {
            if(result.length == 0){
                return res.status(404).json({message: tokenPayload.username + ": has no program history "});
            }
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});

//get program by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    var sql = 'SELECT * FROM program WHERE id = ?';
    connection.query(sql, id, (err, result) => {
        if (!err) {
            if(result.length == 0){
                return res.status(404).json({message: "Program id not found"});
            }
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    });
});

//create program
router.post('/add', auth.authenticateToken, (req, res, next) => {
    let program = req.body;
    var sql = `INSERT INTO program (createdBy, description, endDate, endTime, location, programTitle, registrationLink, startDate, startTime, tag, telNo, telName, image, datePublished) 
               VALUES ('${program.createdBy}', '${program.description}', '${program.endDate}', '${program.endTime}', '${program.location}','${program.programTitle}',
               '${program.registrationLink}','${program.startDate}','${program.startTime}','${program.tag}','${program.telNo}','${program.telName}','${program.image}','${program.datePublished}')`; //${program.datePublished} should be replaced with CURDATE() after complete testing using Postman
    connection.query(sql, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Program added successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

//update program
router.patch('/update/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id; //sementara, nanti diganti bila frontend siap
    let program = req.body;
    var sql = 'UPDATE program SET description = ?, endDate = ?, endTime = ?, location = ?, programTitle = ?, registrationLink = ?, startDate = ?, startTime = ?,'
            + 'tag = ?, telNo = ?, telName = ?, image = ? WHERE id = ?';
    connection.query(sql, [program.description, program.endDate, program.endTime, program.location, program.programTitle, program.registrationLink, program.startDate,
                     program.startTime, program.tag, program.telNo, program.telName, program.image, id], (err, result) => { // (program.id) id tu sementara, nanti diganti bila frontend siap
        if (!err) {
            return res.status(200).json({ message: "Program updated successfully" });
        } else {
            return res.status(500).json(err); 
        }
    });
});

//delete program
router.delete('/delete/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var sql = "DELETE FROM program WHERE id = ?";
    connection.query(sql, id, (err, result) => {
        if(!err){
            if(result.affectedRows == 0){
                return res.status(404).json({message: "Program id not found"});
            }
            return res.status(200).json({message: "Program deleted successfully"});
        }else{
            return res.status(500).json(err);
        }
    });
});

module.exports = { 
    router: router,
    getProgramHistory: getProgramHistory
};