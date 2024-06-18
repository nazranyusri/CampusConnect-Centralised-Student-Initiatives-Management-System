const connection = require('../connection');

const addOrder = (order, callback) => {
    const sql = `INSERT INTO orders (userId, businessId, menuId, quantity, total, status, billingAddress, datePurchased) VALUES (?, ?, ?, ?, ?, 'paid', ?, ?)`;
    connection.query(sql, [order.userId, order.businessId, order.menuId, order.quantity, order.total, order.billingAddress, order.datePurchased], callback);
};

const getUserOrderedBusiness = (userId, callback) => {
    const sql = 'SELECT * FROM orders WHERE userId = ?';
    connection.query(sql, userId, callback);
};

module.exports = {
    addOrder,
    getUserOrderedBusiness
};