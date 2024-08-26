const express = require('express');
const router = express.Router();

const userContoller = require('../controllers/userControllers');
const verifyToken = require ('../middleware/verifyToken');
const verifyAdmin = require ('../middleware/verifyAdmin');
const verifyStaff = require ('../middleware/verifyStaff');


router.get('/', verifyToken, userContoller.getAllUsers);
router.post('/', userContoller.createUser);
router.delete('/:id', verifyToken, verifyAdmin, userContoller.deleteUser);
router.get('/admin/:email', verifyToken, userContoller.getAdmin);
router.patch('/admin/:id',verifyToken, verifyAdmin, userContoller.makeAdmin);
router.get('/staff/:email', verifyToken, userContoller.getStaff);
router.patch('/staff/:id', verifyToken, verifyStaff, userContoller.makeStaff);




module.exports = router;