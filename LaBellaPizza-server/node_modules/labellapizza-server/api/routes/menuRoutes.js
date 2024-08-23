const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

const menuContoller = require('../controllers/menuControllers')


//get all menu items 
router.get('/', menuContoller.getAllMenuItems );


//post a menu
router.post('/', menuContoller.postMenuItem);

//delete a menu
router.delete('/:id', menuContoller.deleteMenuItem);

//get single menu item
router.get('/:id', menuContoller.singleMenuItem);


//update single item
router.patch('/:id', menuContoller.updateMenuItem);


module.exports = router;