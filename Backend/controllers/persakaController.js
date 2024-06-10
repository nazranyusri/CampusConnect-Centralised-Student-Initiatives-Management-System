const persakaModel = require('../models/persaka');
const fs = require('fs');

//view persaka content
const getContent = (req, res) => {
    persakaModel.getContent((err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
};

//update persaka content
const updateContent = (req, res) => {
    const tokenPayload = res.userLocal;
    if (tokenPayload.role != 'admin') {
        return res.status(403).json({ message: "You don't have access to edit this page!" });
    }
    else {
        let content = req.body;
        if (req.file) {
            content.image = req.file.path; // Store the path of the uploaded image
        }

        persakaModel.getContent((err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            const oldImagePath = result[0].image;
            if (content.image === oldImagePath) {
                // console.log("Same image file " + content.image + " " + oldImagePath);
            } else (
                // console.log("Different image file " + content.image + " " + oldImagePath),
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Error deleting old image file" });
                    }
                    // console.log("Old image file deleted successfully");
                })
            )
    
            persakaModel.updateContent(content, (err, result) => {
                if (!err) {
                    return res.status(200).json({ message: "Persaka page updated successfully" });
                } else {
                    return res.status(500).json(err);
                }
            });
        });
    }
};

module.exports = {
    getContent,
    updateContent
};