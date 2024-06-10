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

//register
const register = (req, res) => {
    const user = req.body;
    userModel.checkExistingUser(user, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result) {
            return res.status(401).json({ message: "Email or username already exists" });
        }

        userModel.register(user, (err, result) => {
            if (!err) {
                return res.status(200).json({ message: "User registered successfully" });
            } else {
                return res.status(500).json(err);
            }
        });
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
        if (user.image === oldImagePath) {
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


module.exports = {
    authenticateUser,
    register,
    getUser,
    updateProfile
};