const connection = require('../connection');

const addOrder = (order, callback) => {
    const sql = `INSERT INTO orders (userId, businessId, menuId, quantity, total, status, billingAddress, datePurchased) VALUES (?, ?, ?, ?, ?, 'paid', ?, ?)`;
    connection.query(sql, [order.userId, order.businessId, order.menuId, order.quantity, order.total, order.billingAddress, order.datePurchased], callback);
};

const getUserOrderedBusiness = (userId, callback) => {
    const sql = 'SELECT * FROM orders WHERE userId = ? ORDER BY orderId DESC';
    connection.query(sql, userId, callback);
};

const getBusinessOrderList = (businessId, callback) => {
    const sql = 'SELECT * FROM orders WHERE businessId = ? AND status = ?';
    connection.query(sql, [businessId, 'paid'], callback);
};

const updateOrderStatus = (orderId, status, callback) => {
    const sql = "UPDATE orders SET status = ? WHERE orderId = ?";
    connection.query(sql, [status, orderId], callback);
}

module.exports = {
    addOrder,
    getBusinessOrderList,
    getUserOrderedBusiness,
    updateOrderStatus
};