const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

const menuContoller = require('../controllers/menuControllers')


//get all menu items 
router.get('/', menuContoller.getAllMenuItems )

module.exports = router;