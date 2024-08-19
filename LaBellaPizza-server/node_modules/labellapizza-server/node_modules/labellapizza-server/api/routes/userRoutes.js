const express = require('express');
const router = express.Router();

const userContoller = require('../controllers/userControllers');
const verifyToken = require ('../middleware/verifyToken')


router.get('/', userContoller.getAllUsers);
router.post('/', userContoller.createUser);
router.delete('/:id', userContoller.deleteUser);
router.get('/admin/:email', userContoller.getAdmin);
router.patch('/admin/:id', userContoller.makeAdmin);
router.get('/staff/:email', userContoller.getStaff);
router.patch('/staff/:id', userContoller.makeStaff);

//2000


module.exports = router;