const connection = require('../connection');

//get persaka content
const getContent = (callback) => {
    const sql = 'SELECT * FROM persakacontent';
    connection.query(sql, callback);
};

//update persaka content
const updateContent = (content, callback) => {
    const sql = 'UPDATE persakacontent SET title = ?, description = ?, image = ? WHERE id = 1';
    connection.query(sql, [content.title, content.description, content.image], callback);
};

module.exports = {
    getContent,
    updateContent
};