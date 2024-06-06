const connection = require('../connection');

//get all programs
const getAllProgram = (callback) => {
    const sql = 'SELECT programId, programTitle, startDate, endDate, TIME_FORMAT(startTime, "%h:%i %p") AS startTime, TIME_FORMAT(endTime, "%h:%i %p") AS endTime, location, image, datePublished FROM program';
    connection.query(sql, callback);
};

//get program by id
const getProgramById = (id, callback) => {
    const sql = 'SELECT programId, createdBy, description, endDate, TIME_FORMAT(endTime, "%h:%i %p") AS endTime, location, programTitle, startDate, TIME_FORMAT(startTime, "%h:%i %p") AS startTime, tag, telNo, telName, image, datePublished FROM program WHERE programId = ?';
    connection.query(sql, id, callback);
};

//get specific user programs -- viewed in Profile page
const getProgramHistory = (username, callback) => {
    const sql = 'SELECT programId, programTitle, startDate, endDate, TIME_FORMAT(startTime, "%h:%i %p") AS startTime, TIME_FORMAT(endTime, "%h:%i %p") AS endTime, location, image, datePublished FROM program WHERE createdBy = ?';
    connection.query(sql, [username], callback);
};

//get user registered program
const getUserRegisteredProgram = (userId, callback) => {
    const sql = 'SELECT p.programId, p.programTitle, p.startDate, p.endDate, TIME_FORMAT(p.startTime, "%h:%i %p") AS startTime, TIME_FORMAT(p.endTime, "%h:%i %p") AS endTime, p.location, p.image, p.datePublished FROM registeredprogram rp JOIN program p ON rp.programId = p.programId WHERE rp.userId = ?';
    connection.query(sql, [userId], callback);
};

// Create program
const addProgram = (program, callback) => {
    const sql = `INSERT INTO program (createdBy, description, endDate, endTime, location, programTitle, startDate, startTime, tag, telNo, telName, image, datePublished) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [program.createdBy, program.description, program.endDate, program.endTime, program.location, program.programTitle, program.startDate,
    program.startTime, program.tag, program.telNo, program.telName, program.image, program.datePublished], callback);
};

//update program
const updateProgram = (program, callback) => {
    const sql = 'UPDATE program SET description = ?, endDate = ?, endTime = ?, location = ?, programTitle = ?, startDate = ?, startTime = ?, tag = ?, telNo = ?, telName = ?, image = ? WHERE programId = ?';
    connection.query(sql, [program.description, program.endDate, program.endTime, program.location, program.programTitle, program.startDate,
    program.startTime, program.tag, program.telNo, program.telName, program.image, program.id], callback);
};

//delete program
const deleteProgram = (id, callback) => {
    const sql = "DELETE FROM program WHERE programId = ?";
    connection.query(sql, id, callback);
};

//register program
const registerProgram = (id, callback) => {
    const sql = 'INSERT INTO RegisteredProgram (programId, userId, RegistrationDate) VALUES (?, ?, NOW())';
    connection.query(sql, [id.programId, id.userId], callback);
};

//get program registrant
const getRegistrant = (programId, callback) => {
    const sql = 'SELECT u.fullName, u.matricNo, u.email, u.telNo, rp.registrationdate FROM registeredprogram rp JOIN user u ON rp.userId = u.userId WHERE rp.programId = ?';
    connection.query(sql, [programId], callback);
};

module.exports = {
    getAllProgram,
    getProgramHistory,
    getUserRegisteredProgram,
    getProgramById,
    addProgram,
    updateProgram,
    deleteProgram,
    registerProgram,
    getRegistrant
};