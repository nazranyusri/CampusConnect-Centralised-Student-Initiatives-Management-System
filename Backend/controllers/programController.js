const programModel = require('../models/program');
const fs = require('fs');

//get all programs
const getAllProgram = (req, res) => {
    programModel.getAllProgram((err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
};

// get program by id
const getProgramById = (req, res) => {
    const id = req.params.id;
    programModel.getProgramById(id, (err, result) => {
        if (!err) {
            if(result.length == 0){
                return res.status(404).json({message: "Program id not found"});
            }
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    });
};

//get specific user programs -- viewed in Profile 
const getProgramHistory = (req, res) => {
    const userId = req.params.userId;
    programModel.getProgramHistory(userId, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
};

//get user registered program
const getUserRegisteredProgram = (req, res) => {
    const userId = req.params.userId;
    programModel.getUserRegisteredProgram(userId, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
};

//create program
const addProgram = (req, res) => {
    const program = req.body;
    if (req.file) {
        program.image = req.file.path; // Store the path of the uploaded image
    } else {
        return res.status(400).json({ message: "Image file is required" });
    }
    programModel.addProgram(program, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Program added successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
};

//update program
const updateProgram = (req, res) => {
    const program = req.body;
    if (req.file) {
        program.image = req.file.path; // Store the path of the uploaded image
    }

    programModel.getProgramById(program.id, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length == 0) {
            return res.status(404).json({ message: "Program id not found" });
        }

        // Ownership check
        if (result[0].userId !== res.userLocal.userId) {
            console.log("this program", result[0].userId, "logged in as", res.userLocal.userId)
            return res.status(403).json({ message: "Forbidden" });
        }
        programModel.updateProgram(program, (err, result) => {
            if (!err) {
                if(result.affectedRows == 0){
                    return res.status(404).json({message: "Program id not found"});
                }
                return res.status(200).json({ message: "Program updated successfully" });
            } else {
                return res.status(500).json(err); 
            }
        });
    });
};

//delete program
const deleteProgram = (req, res) => {
    const id = req.params.id;
    const imagePath = req.params.imagePath; 
    
    programModel.getProgramById(id, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length == 0) {
            return res.status(404).json({ message: "Program id not found" });
        }

        // Ownership check
        if (result[0].userId !== res.userLocal.userId) {
            console.log("this program", result[0].userId, "logged in as", res.userLocal.userId)
            return res.status(403).json({ message: "Forbidden" });
        }

        // console.log(imagePath);
        programModel.deleteProgram(id, (err, result) => {
            if (!err) {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Program id not found" });
                }

                // Delete the corresponding image file from the 'uploads/' directory
                fs.unlink(`uploads/${imagePath}`, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Error deleting image file" });
                    }
                    return res.status(200).json({ message: "Program and corresponding image deleted successfully" });
                });
            } else {
                return res.status(500).json(err);
            }
        });
    });
};

//register program
const registerProgram = (req, res) => {
    const id = req.body;
    programModel.registerProgram(id, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Program registered successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
};

//get program registrant
const getRegistrant = (req, res) => {
    const programId = req.params.programId;
    // console.log('Received programId:', programId);
    programModel.getRegistrant(programId, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error', details: err });
        }
        return res.status(200).json(result);
    });
};

module.exports = {
    getAllProgram,
    getProgramById,
    getProgramHistory,
    getUserRegisteredProgram,
    addProgram,
    updateProgram,
    deleteProgram,
    registerProgram,
    getRegistrant
};