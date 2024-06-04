const connection = require('../connection');

//get all businesses
const getAllBusiness = (callback) => {
    const sql = 'SELECT * FROM business';
    connection.query(sql, callback);
};

//get business by id
const getBusinessById = (id, callback) => {
    const sql = 'SELECT * FROM business WHERE id = ?';
    connection.query(sql, id, callback);
};

//get specific user businesses -- viewed in Profile page
const getBusinessHistory = (username, callback) => {
    const sql = 'SELECT * FROM business WHERE createdBy = ?';
    connection.query(sql, [username], callback);
};

//create business
const addBusiness = (business, callback) => {
    const sql = `INSERT INTO business (businessTitle, createdBy, description, location, othersLocation, telNo, telName, image, businessLink, datePublished) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [business.businessTitle, business.createdBy, business.description, business.location, business.othersLocation, business.telNo, business.telName, business.image, business.businessLink, business.datePublished], callback); //business.datePublished should be replaced with CURDATE() after complete testing using Postman
};

//update business
const updateBusiness = (id, business, callback) => {
    const sql = 'UPDATE business SET businessTitle = ?, description = ?, location = ?, othersLocation = ?, telNo = ?, telName = ?, image = ?, businessLink = ? WHERE id = ?';
    connection.query(sql, [business.businessTitle, business.description, business.location, business.othersLocation, business.telNo, business.telName, business.image, business.businessLink, id], callback);
};

//delete business
const deleteBusiness = (id, callback) => {
    const sql = "DELETE FROM business WHERE id = ?";
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