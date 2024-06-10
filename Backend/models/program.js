const connection = require('../connection');

// Get all programs
const getAllProgram = (callback) => {
    const sql = 'SELECT programId, programTitle, startDate, endDate, TIME_FORMAT(startTime, "%h:%i %p") AS startTime, TIME_FORMAT(endTime, "%h:%i %p") AS endTime, tag, location, image, datePublished FROM program';
    connection.query(sql, callback);
};

// Get program by id
const getProgramById = (id, callback) => {
    const sql = 'SELECT programId, userId, description, endDate, TIME_FORMAT(endTime, "%h:%i %p") AS endTime, location, programTitle, startDate, TIME_FORMAT(startTime, "%h:%i %p") AS startTime, tag, telNo, telName, image, datePublished FROM program WHERE programId = ?';
    connection.query(sql, id, callback);
};

//get total upcoming program -- viewed in Homepage
const getTotalProgram = (callback) => {
    const sql = 'SELECT COUNT(*) AS totalProgram FROM program WHERE startDate > CURDATE()';
    connection.query(sql, callback);
};

// Get latest program -- viewed in Homepage
const getLatestProgram = (callback) => {
    const sql = 'SELECT programId, programTitle, startDate, endDate, TIME_FORMAT(startTime, "%h:%i %p") AS startTime, TIME_FORMAT(endTime, "%h:%i %p") AS endTime, location, image, datePublished FROM program ORDER BY datePublished DESC LIMIT 3';
    connection.query(sql, callback);
};

// Get specific user programs -- viewed in Profile page
const getProgramHistory = (userId, callback) => {
    const sql = 'SELECT programId, programTitle, startDate, endDate, TIME_FORMAT(startTime, "%h:%i %p") AS startTime, TIME_FORMAT(endTime, "%h:%i %p") AS endTime, location, image, datePublished FROM program WHERE userId = ?';
    connection.query(sql, [userId], callback);
};

// Create program
const addProgram = (program, callback) => {
    const sql = `INSERT INTO program (userId, description, endDate, endTime, location, programTitle, startDate, startTime, tag, telNo, telName, image, datePublished) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [program.userId, program.description, program.endDate, program.endTime, program.location, program.programTitle, program.startDate,
    program.startTime, program.tag, program.telNo, program.telName, program.image, program.datePublished], callback);
};

// Update program
const updateProgram = (program, callback) => {
    const sql = 'UPDATE program SET description = ?, endDate = ?, endTime = ?, location = ?, programTitle = ?, startDate = ?, startTime = ?, tag = ?, telNo = ?, telName = ?, image = ? WHERE programId = ?';
    connection.query(sql, [program.description, program.endDate, program.endTime, program.location, program.programTitle, program.startDate,
    program.startTime, program.tag, program.telNo, program.telName, program.image, program.id], callback);
};

// Delete program
const deleteProgram = (id, callback) => {
    const sql = "DELETE FROM program WHERE programId = ?";
    connection.query(sql, id, callback);
};

module.exports = {
    getAllProgram,
    getProgramHistory,
    getTotalProgram,
    getLatestProgram,
    getProgramById,
    addProgram,
    updateProgram,
    deleteProgram,
};
