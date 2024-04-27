const connection = require('../connection');

//login
const authenticateUser = (user, callback) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    connection.query(sql, user.email, callback);
};

//register
const register = (user, callback) => {
    const sql = 'INSERT INTO user (username, email, password, role) VALUES (?, ?, ?, ?)';
    connection.query(sql, [user.username, user.email, user.password, 'user'], callback);
};

//view profile and posts history

//update profile
const updateProfile = (user, userId, callback) => {
    const sql = 'UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?';
    connection.query(sql, [user.username, user.email, user.password, userId], callback);
};

module.exports = {
    authenticateUser,
    register,
    updateProfile
};