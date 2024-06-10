const connection = require('../connection');

const getMenuItems = (businessId, callback) => {
    const sql = 'SELECT * FROM menu WHERE businessId = ?';
    connection.query(sql, businessId, callback);
};

const addMenuItem = (menu, callback) => {
    const sql = `INSERT INTO menu (businessId, itemName, price, quantity, note) VALUES (?, ?, ?, ?, ?)`;
    connection.query(sql, [menu.businessId, menu.itemName, menu.price, menu.quantity, menu.note], callback);
};

module.exports = {
    getMenuItems,
    addMenuItem
};