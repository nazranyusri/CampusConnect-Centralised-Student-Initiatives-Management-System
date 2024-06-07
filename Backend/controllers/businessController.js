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
    const businessId = req.params.businessId;
    businessModel.getBusinessById(businessId, (err, result) => {
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
    const userId = req.params.userId;
    businessModel.getBusinessHistory(userId, (err, result) => {
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
    if (req.file) {
        business.image = req.file.path; // Store the path of the uploaded image
    } else {
        return res.status(400).json({ message: "Image file is required" });
    }
    businessModel.addBusiness(business, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Business added successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
};

// Update business
const updateBusiness = (req, res) => {
    const business = req.body;
    if (req.file) {
        business.image = req.file.path; // Store the path of the uploaded image
    }
    businessModel.getBusinessById(business.id, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length == 0) {
            return res.status(404).json({ message: "Business id not found" });
        }

        // Ownership check
        if (result[0].userId !== res.userLocal.userId) {
            console.log(result[0].userId, res.userLocal.userId)
            return res.status(403).json({ message: "Forbidden" });
        }

        businessModel.updateBusiness(business, (err, result) => {
            if (!err) {
                if (result.affectedRows == 0) {
                    return res.status(404).json({ message: "Business id not found" });
                }
                return res.status(200).json({ message: "Business updated successfully" });
            } else {
                return res.status(500).json(err);
            }
        });
    });
};

// Delete business
const deleteBusiness = (req, res) => {
    const id = req.params.id;

    businessModel.getBusinessById(id, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length == 0) {
            return res.status(404).json({ message: "Business id not found" });
        }

        // Ownership check
        if (result[0].userId !== res.userLocal.userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        businessModel.deleteBusiness(id, (err, result) => {
            if (!err) {
                if (result.affectedRows == 0) {
                    return res.status(404).json({ message: "Business id not found" });
                }
                return res.status(200).json({ message: "Business deleted successfully" });
            } else {
                return res.status(500).json(err);
            }
        });
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