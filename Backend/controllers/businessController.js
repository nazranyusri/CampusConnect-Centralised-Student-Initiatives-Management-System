const businessModel = require('../models/business');

//get all business
const getAllBusiness = (req, res) => {
    businessModel.getAllBusiness((err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
};

//get business by id
const getBusinessById = (req, res) => {
    const id = req.params.id;
    businessModel.getBusinessById(id, (err, result) => {
        if (!err) {
            if(result.length == 0){
                return res.status(404).json({message: "Business id not found"});
            }
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    });
};

//get specific user business -- viewed in Profile 
const getBusinessHistory = (req, res) => {
    const username = req.params.username;
    businessModel.getBusinessHistory(username, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
}

//create busines
const addBusiness = (req, res) => {
    const business = req.body;
    businessModel.addBusiness(business, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Business added successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
};

//update business
const updateBusiness = (req, res) => {
    const id = req.params.id;
    const business = req.body;
    businessModel.updateBusiness(id, business, (err, result) => {
        if (!err) {
            if(result.affectedRows == 0){
                return res.status(404).json({message: "Business id not found"});
            }
            return res.status(200).json({ message: "Business updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
};

//delete business
const deleteBusiness = (req, res) => {
    const id = req.params.id;
    businessModel.deleteBusiness(id, (err, result) => {
        if (!err) {
            if(result.affectedRows == 0){
                return res.status(404).json({message: "Business id not found"});
            }
            return res.status(200).json({ message: "Business deleted successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
};

module.exports = {
    getAllBusiness,
    getBusinessById,
    getBusinessHistory,
    addBusiness,
    updateBusiness,
    deleteBusiness
};