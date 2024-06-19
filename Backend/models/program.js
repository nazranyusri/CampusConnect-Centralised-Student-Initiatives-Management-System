const connection = require('../connection');

// Get all programs
const getAllProgram = (callback) => {
    const sql = 'SELECT p.programId, p.programTitle, p.startDate, p.endDate, TIME_FORMAT(p.startTime, "%h:%i %p") AS startTime, TIME_FORMAT(p.endTime, "%h:%i %p") AS endTime, p.tag, p.telNo, p.location, p.image, p.description, p.datePublished, u.username AS createdBy, u.image AS profileImage FROM program p JOIN user u ON p.userId = u.userId ORDER BY p.programId DESC';
    connection.query(sql, callback);
};

// Get program by id
const getProgramById = (id, callback) => {
    const sql = 'SELECT p.programId, p.userId, p.description, p.endDate, TIME_FORMAT(p.endTime, "%h:%i %p") AS endTime, p.location, p.programTitle, p.startDate, TIME_FORMAT(p.startTime, "%h:%i %p") AS startTime, p.tag, p.telNo, p.telName, p.image, p.datePublished, u.username AS createdBy, u.image AS profileImage FROM program p JOIN user u ON p.userId = u.userId WHERE p.programId = ?';
    connection.query(sql, id, callback);
};

//get total upcoming program -- viewed in Homepage
const getTotalProgram = (callback) => {
    const sql = 'SELECT COUNT(*) AS totalProgram FROM program WHERE startDate > CURDATE()';
    connection.query(sql, callback);
};

// Get latest program -- viewed in Homepage
const getLatestProgram = (callback) => {
    const sql = 'SELECT p.programId, p.programTitle, p.startDate, p.endDate, TIME_FORMAT(p.startTime, "%h:%i %p") AS startTime, TIME_FORMAT(p.endTime, "%h:%i %p") AS endTime, p.location, p.image, p.datePublished, u.username AS createdBy, u.image AS profileImage FROM program p JOIN user u ON p.userId = u.userId ORDER BY p.programId DESC LIMIT 3';
    connection.query(sql, callback);
};

// Get specific user programs -- viewed in Profile page
const getProgramHistory = (userId, callback) => {
    const sql = 'SELECT programId, programTitle, startDate, endDate, TIME_FORMAT(startTime, "%h:%i %p") AS startTime, TIME_FORMAT(endTime, "%h:%i %p") AS endTime, location, image, datePublished FROM program WHERE userId = ? ORDER BY programId DESC';
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
