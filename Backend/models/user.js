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

// user register
const registerUser = (user, callback) => {
    const sql = "INSERT INTO user (username, email, password, role, fullName, matricNo, telNo, status, isDeletable) VALUES (?, ?, ?, 'user', ?, ?, ?, 'true', 'true')";
    connection.query(sql, [user.username, user.email, user.password, user.fullName, user.matricNo, user.telNo], callback);
};

//club register
const registerClub = (user, callback) => {
    const sql = "INSERT INTO user (username, email, password, role, fullName, matricNo, telNo, status, isDeletable) VALUES (?, ?, ?, 'club', ?, ?, ?, 'false', 'true')";
    connection.query(sql, [user.username, user.email, user.password, user.fullName, user.matricNo, user.telNo], callback);
};

//get all user
const getAllUser = (callback) => {
    const sql = 'SELECT userId, username, email, role, fullName, matricNo, telNo, status, isDeletable, image FROM user WHERE status = "true"';
    connection.query(sql, callback);
}

//get club request
const getClubRequest = (callback) => {
    const sql = 'SELECT userId, username, email, role, fullName, matricNo, telNo, status, isDeletable FROM user WHERE role = "club" AND status = "false"';
    connection.query(sql, callback);
}

//aprove club request
const approveClub = (userId, callback) => {
    const sql = 'UPDATE user SET status = "true" WHERE userId = ?';
    connection.query(sql, userId, callback);
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

//delete user
const deleteUser = (userId, callback) => {
    const sql = 'DELETE FROM user WHERE userId = ?';
    connection.query(sql, userId, callback);
};

module.exports = {
    authenticateUser,
    checkExistingUser,
    registerUser,
    registerClub,
    getAllUser,
    getClubRequest,
    approveClub,
    getUser,
    updateProfile,
    deleteUser
};