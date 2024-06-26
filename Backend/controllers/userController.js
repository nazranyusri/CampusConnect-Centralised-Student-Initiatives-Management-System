const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const fs = require('fs');

//login
const authenticateUser = (req, res) => {
    const user = req.body;
    userModel.authenticateUser(user, (err, result) => {
        if (!err) {
            if (result.length <= 0 || result[0].password != user.password) {
                return res.status(401).json({ message: "Incorrect email or password" });
            }
            else if(result[0].status === 'false') {
                return res.status(401).json({ message: "Please wait for admin approval" });
            }
            else if (result[0].password == user.password) {
                const response = { userId: result[0].userId, username: result[0].username, role: result[0].role, email: result[0].email };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '2h' });
                // console.log(accessToken);
                return res.status(200).json({ token: accessToken });
            }
        } else {
            return res.status(500).json(err);
        }
    });
};

// user register
const registerUser = (req, res) => {
    const user = req.body;
    userModel.checkExistingUser(user, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result) {
            return res.status(401).json({ message: "Email or username already exists" });
        }

        userModel.registerUser(user, (err, result) => {
            if (!err) {
                return res.status(200).json({ message: "Account successfully registered!" });
            } else {
                return res.status(500).json(err);
            }
        });
    });
};

// club register
const registerClub = (req, res) => {
    const user = req.body;
    // console.log(user);
    userModel.checkExistingUser(user, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result) {
            return res.status(401).json({ message: "Email or username already exists" });
        }

        userModel.registerClub(user, (err, result) => {
            if (!err) {
                return res.status(200).json({ message: "Account successfully registered! Please wait for admin approval." });
            } else {
                return res.status(500).json(err);
            }
        });
    });
};

//get all user
const getAllUser = (req, res) => {
    userModel.getAllUser((err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
};

//get club request
const getClubRequest = (req, res) => {
    userModel.getClubRequest((err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
};

//approve club request
const approveClub = (req, res) => {
    const userId = req.body.userId;
    userModel.approveClub(userId, (err, result) => {
        if (!err) {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "User id not found" });
            }
            return res.status(200).json({ message: "Club request approved successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
};

//view profile
const getUser = (req, res) => {
    const userId = req.params.userId;
    userModel.getUser(userId, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
}

// Update profile
const updateProfile = (req, res) => {
    const user = req.body;
    console.log("update profile controller");
    if (req.file) {
        user.image = req.file.path; // Store the path of the uploaded image
    }
    userModel.getUser(user.userId, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length == 0) {
            return res.status(404).json({ message: "User id not found" });
        }

        // Ownership check
        if (result[0].userId !== res.userLocal.userId) {
            // console.log(result[0].userId, res.userLocal.userId);
            return res.status(403).json({ message: "Forbidden" });
        }

        const oldImagePath = result[0].image;
        if (user.image === oldImagePath || oldImagePath === null) {
            // console.log("Same image file " + user.image + " " + oldImagePath);
        } else (
            // console.log("Different image file " + user.image + " " + oldImagePath),
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Error deleting old image file" });
                }
                // console.log("Old image file deleted successfully");
            })
        )

        userModel.updateProfile(user, (err, result) => {
            if (!err) {
                if (result.affectedRows == 0) {
                    return res.status(404).json({ message: "User id not found" });
                }
                return res.status(200).json({ message: "Profile updated successfully" });
            } else {
                return res.status(500).json(err);
            }
        });
    });
};

//delete user
const deleteUser = (req, res) => {
    const userId = req.params.userId;
    const imagePath = req.params.imagePath;
    console.log(userId, imagePath);

    userModel.deleteUser(userId, (err, result) => {
        if (!err) {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "User id not found" });
            }
            if (imagePath !== 'null') {
                fs.unlink(`uploads/${imagePath}`, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Error deleting image file" });
                    }
                    // return res.status(200).json({ message: "User deleted successfully" });
                });
            }
            return res.status(200).json({ message: "User deleted successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
};

module.exports = {
    authenticateUser,
    registerUser,
    registerClub,
    getAllUser,
    getClubRequest,
    approveClub,
    getUser,
    updateProfile,
    deleteUser
};