const connection = require('../connection');

//get all programs
const getAllProgram = (callback) => {
    const sql = 'SELECT id, programTitle, startDate, endDate, TIME_FORMAT(startTime, "%h:%i %p") AS startTime, TIME_FORMAT(endTime, "%h:%i %p") AS endTime, location, image, datePublished FROM program';
    connection.query(sql, callback);
};

//get program by id
const getProgramById = (id, callback) => {
    const sql = 'SELECT id, createdBy, description, endDate, TIME_FORMAT(endTime, "%h:%i %p") AS endTime, location, programTitle, registrationLink, startDate, TIME_FORMAT(startTime, "%h:%i %p") AS startTime, tag, telNo, telName, image, datePublished FROM program WHERE id = ?';
    connection.query(sql, id, callback);
};

//get specific user programs -- viewed in Profile page
const getProgramHistory = (username, callback) => {
    const sql = 'SELECT * FROM program WHERE createdBy = ?';
    connection.query(sql, [username], callback);
};

// Create program
const addProgram = (program, callback) => {
    const sql = `INSERT INTO program (createdBy, description, endDate, endTime, location, programTitle, registrationLink, startDate, startTime, tag, telNo, telName, image, datePublished) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [program.createdBy, program.description, program.endDate, program.endTime, program.location, program.programTitle, program.registrationLink, program.startDate,
    program.startTime, program.tag, program.telNo, program.telName, program.image, program.datePublished], callback);
};

//update program
const updateProgram = (id, program, callback) => {
    const sql = 'UPDATE program SET description = ?, endDate = ?, endTime = ?, location = ?, programTitle = ?, registrationLink = ?, startDate = ?, startTime = ?,'
        + 'tag = ?, telNo = ?, telName = ?, image = ? WHERE id = ?';
    connection.query(sql, [program.description, program.endDate, program.endTime, program.location, program.programTitle, program.registrationLink, program.startDate,
    program.startTime, program.tag, program.telNo, program.telName, program.image, id], callback);
};

//delete program
const deleteProgram = (id, callback) => {
    const sql = "DELETE FROM program WHERE id = ?";
    connection.query(sql, id, callback);
};

module.exports = {
    getAllProgram,
    getProgramHistory,
    getProgramById,
    addProgram,
    updateProgram,
    deleteProgram
};