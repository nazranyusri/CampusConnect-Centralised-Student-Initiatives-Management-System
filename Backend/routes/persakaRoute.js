const express = require('express');
const router = express.Router();
const persakaController = require('../controllers/persakaController');

require('dotenv').config();
var auth = require('../services/authentication');

//get persaka content
router.get('/', persakaController.getContent);

//update persaka content
router.patch('/update', auth.authenticateToken, persakaController.updateContent);

module.exports = router;