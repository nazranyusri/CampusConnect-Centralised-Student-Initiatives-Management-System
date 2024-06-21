const connection = require('../connection');

//get all businesses
const getAllBusiness = (callback) => {
    const sql = 'SELECT b.*, u.username AS createdBy, u.image AS profileImage FROM business b JOIN user u ON b.userId = u.userId ORDER BY b.businessId DESC';
    connection.query(sql, callback);
};

//get business by id
const getBusinessById = (businessId, callback) => {
    const sql = 'SELECT b.*, u.username AS createdBy, u.image AS profileImage FROM business b JOIN user u ON b.userId = u.userId WHERE b.businessId = ?';
    connection.query(sql, businessId, callback);
};

//get total business -- viewed in Homepage
const getTotalBusiness = (callback) => {
    const sql = 'SELECT COUNT(*) AS totalBusiness FROM business';
    connection.query(sql, callback);
};

//get latest business -- viewed in Homepage
const getLatestBusiness = (callback) => {
    const sql = 'SELECT b.businessId, b.businessTitle, b.image, b.description, b.datePublished, u.username AS createdBy, u.image AS profileImage FROM business b JOIN user u ON b.userId = u.userId ORDER BY b.businessId DESC LIMIT 3';
    connection.query(sql, callback);
};

//get specific user businesses -- viewed in Profile page
const getBusinessHistory = (userId, callback) => {
    const sql = 'SELECT * FROM business WHERE userId = ? ORDER BY businessId DESC';
    connection.query(sql, [userId], callback);
};

//create business
const addBusiness = (business, callback) => {
    const sql = `INSERT INTO business (businessTitle, userId, description, location, tag, telNo, telName, image, datePublished) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [business.businessTitle, business.userId, business.description, business.location, business.tag, business.telNo, business.telName, business.image, business.datePublished], callback);
};

//update business
const updateBusiness = (business, callback) => {
    const sql = 'UPDATE business SET businessTitle = ?, description = ?, location = ?, tag = ?, telNo = ?, telName = ?, image = ? WHERE businessId = ?';
    connection.query(sql, [business.businessTitle, business.description, business.location, business.tag, business.telNo, business.telName, business.image, business.id], callback);
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
    getTotalBusiness,
    getLatestBusiness,
    addBusiness,
    updateBusiness,
    deleteBusiness
};