const connection = require('../connection');

//login
const authenticateUser = (user, callback) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    connection.query(sql, user.email, callback);
};

//check existing user
const checkExistingUser = (user, callback) => {
    const sql = 'SELECT * FROM user WHERE email = ? OR username = ?';
    connection.query(sql, [user.email, user.username], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        // If results length is not empty, the user already exists
        if (results.length > 0) {
            return callback(null, true); // true means already exists
        } else {
            return callback(null, false);
        }
    });
};

//register
const register = (user, callback) => {
    const sql = 'INSERT INTO user (username, email, password, role, fullName, matricNo, telNo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [user.username, user.email, user.password, user.role, user.fullName, user.matricNo, user.telNo], callback);
};

//view profile
const getUser = (userId, callback) => {
    const sql = 'SELECT userId, username, email, role, fullName, matricNo, telNo, image FROM user WHERE userId = ?';
    connection.query(sql, userId, callback);
};

//update profile
const updateProfile = (user, callback) => {
    const sql = 'UPDATE user SET username = ?, fullName = ?, matricNo = ?, telNo = ?, image = ? WHERE userId = ?';
    connection.query(sql, [user.username, user.fullName, user.matricNo, user.telNo, user.image, user.userId], callback);
};

module.exports = {
    authenticateUser,
    checkExistingUser,
    register,
    getUser,
    updateProfile
};