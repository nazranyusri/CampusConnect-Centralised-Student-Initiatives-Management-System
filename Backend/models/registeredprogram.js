const connection = require('../connection');

// Get user registered program
const getUserRegisteredProgram = (userId, callback) => {
    const sql = 'SELECT p.programId, p.programTitle, p.startDate, p.endDate, p.description, TIME_FORMAT(p.startTime, "%h:%i %p") AS startTime, TIME_FORMAT(p.endTime, "%h:%i %p") AS endTime, p.location, p.image, rp.registrationdate FROM registeredprogram rp JOIN program p ON rp.programId = p.programId WHERE rp.userId = ? ORDER BY p.programId DESC';
    connection.query(sql, [userId], callback);
};

// Register program
const registerProgram = (id, callback) => {
    const sql = 'INSERT INTO registeredprogram (programId, userId, registrationdate) VALUES (?, ?, NOW())';
    connection.query(sql, [id.programId, id.userId], callback);
};

// Get program registrant
const getRegistrant = (programId, callback) => {
    const sql = 'SELECT u.fullName, u.matricNo, u.email, u.telNo, rp.registrationdate FROM registeredprogram rp JOIN user u ON rp.userId = u.userId WHERE rp.programId = ?';
    connection.query(sql, [programId], callback);
};

module.exports = {
    getUserRegisteredProgram,
    registerProgram,
    getRegistrant
}