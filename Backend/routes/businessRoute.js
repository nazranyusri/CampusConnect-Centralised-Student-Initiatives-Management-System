const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

// const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../services/authentication');

//get all businesses
router.get('/', businessController.getAllBusiness);

//get business by id
router.get('/:id', businessController.getBusinessById);

//create business
router.post('/add', auth.authenticateToken, businessController.addBusiness);

//update business
router.patch('/update/:id', auth.authenticateToken, businessController.updateBusiness);

//delete business
router.delete('/delete/:id', auth.authenticateToken, businessController.deleteBusiness);

module.exports = router;