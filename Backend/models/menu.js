const connection = require('../connection');

const getMenuItems = (businessId, callback) => {
    const sql = 'SELECT * FROM menu WHERE businessId = ?';
    connection.query(sql, businessId, callback);
};

const getIndividualMenu = (menuId, callback) => {
    const sql = 'SELECT menuId, businessId, itemName, price, note FROM menu WHERE menuId = ?';
    connection.query(sql, menuId, callback);
};

const addMenuItem = (menu, callback) => {
    const sql = `INSERT INTO menu (businessId, itemName, price, quantity, note) VALUES (?, ?, ?, ?, ?)`;
    connection.query(sql, [menu.businessId, menu.itemName, menu.price, menu.quantity, menu.note], callback);
};

const updateMenuItem = (menu, callback) => {
    const sql = `UPDATE menu SET itemName = ?, price = ?, quantity = ?, note = ? WHERE menuId = ?`;
    connection.query(sql, [menu.itemName, menu.price, menu.quantity, menu.note, menu.menuId], callback);
};

const deleteMenuItem = (menuId, callback) => {
    const sql = `DELETE FROM menu WHERE menuId = ?`;
    connection.query(sql, [menuId], callback);
};

module.exports = {
    getMenuItems,
    getIndividualMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
};