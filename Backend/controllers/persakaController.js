const persakaModel = require('../models/persaka');

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
        persakaModel.updateContent(content, (err, result) => {
            if (!err) {
                return res.status(200).json({ message: "Persaka page updated successfully" });
            } else {
                return res.status(500).json(err);
            }
        });
    }
};

module.exports = {
    getContent,
    updateContent
};