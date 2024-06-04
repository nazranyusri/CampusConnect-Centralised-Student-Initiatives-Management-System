const programModel = require('../models/program');

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
    const username = req.params.username;
    programModel.getProgramHistory(username, (err, result) => {
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
    const id = req.params.id;
    const program = req.body;
    programModel.updateProgram(id, program, (err, result) => {
        if (!err) {
            if(result.affectedRows == 0){
                return res.status(404).json({message: "Program id not found"});
            }
            return res.status(200).json({ message: "Program updated successfully" });
        } else {
            return res.status(500).json(err); 
        }
    });
};

//delete program
const deleteProgram = (req, res) => {
    const id = req.params.id;
    programModel.deleteProgram(id, (err, result) => {
        if(!err){
            if(result.affectedRows == 0){
                return res.status(404).json({message: "Program id not found"});
            }
            return res.status(200).json({message: "Program deleted successfully"});
        }else{
            return res.status(500).json(err);
        }
    });
};

module.exports = {
    getAllProgram,
    getProgramById,
    getProgramHistory,
    addProgram,
    updateProgram,
    deleteProgram
};