const connection = require('../connection');

//get all businesses
const getAllBusiness = (callback) => {
    const sql = 'SELECT * FROM business';
    connection.query(sql, callback);
};

//get business by id
const getBusinessById = (businessId, callback) => {
    const sql = 'SELECT * FROM business WHERE businessId = ?';
    connection.query(sql, businessId, callback);
};

//get specific user businesses -- viewed in Profile page
const getBusinessHistory = (userId, callback) => {
    const sql = 'SELECT * FROM business WHERE userId = ?';
    connection.query(sql, [userId], callback);
};

//create business
const addBusiness = (business, callback) => {
    const sql = `INSERT INTO business (businessTitle, userId, description, location, othersLocation, telNo, telName, image, businessLink, datePublished) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [business.businessTitle, business.userId, business.description, business.location, business.othersLocation, business.telNo, business.telName, business.image, business.businessLink, business.datePublished], callback); //business.datePublished should be replaced with CURDATE() after complete testing using Postman
};

//update business
const updateBusiness = (business, callback) => {
    const sql = 'UPDATE business SET businessTitle = ?, description = ?, location = ?, othersLocation = ?, telNo = ?, telName = ?, image = ?, businessLink = ? WHERE businessId = ?';
    connection.query(sql, [business.businessTitle, business.description, business.location, business.othersLocation, business.telNo, business.telName, business.image, business.businessLink, business.id], callback);
};

//delete business
const deleteBusiness = (id, callback) => {
    const sql = "DELETE FROM business WHERE businessId = ?";
    connection.query(sql, id, callback);
};

module.exports = {
    getAllBusiness,
    getBusinessHistory,
    getBusinessById,
    addBusiness,
    updateBusiness,
    deleteBusiness
};