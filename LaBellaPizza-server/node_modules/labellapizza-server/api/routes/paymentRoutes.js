const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Payment = require('../models/Payments');
const Cart = require('../models/Carts');
const ObjectId = mongoose.Types.ObjectId;

// token
const verifyToken = require('../middleware/verifyToken');

// Post payment info to db
router.post('/', verifyToken, async (req, res) => {
    console.log('Payments route hit');
    const payment = req.body;
    try {
        const paymentRequest = await Payment.create(payment);

        // Delete cart after payment
        const cartIds = payment.cartItems.map(id => new ObjectId(id));
        const deleteCartRequest = await Cart.deleteMany({ _id: { $in: cartIds } });

        res.status(200).json({ paymentRequest, deleteCartRequest });
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get payments by email
router.get('/', verifyToken, async (req, res) => {
    const email = req.query.email;
    const decodedEmail = req.decoded.email;

    console.log('Query email:', email);
    console.log('Decoded email:', decodedEmail);

    if (email.toLowerCase() !== decodedEmail.toLowerCase()) {
        return res.status(403).json({ message: "Forbidden Access" });
    }

    try {
        const result = await Payment.find({ email }).sort({ createdAt: -1 }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//get all payments 
router.get('/all', async (req, res) =>{
    try {
        const payments = await Payment.find({}).sort({createdAt: -1}).exec();
        res.status(200).json(payments)

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
});

//confirm payments status
router.patch('/:id', async (req, res) => { 
    const payId = req.params.id; 
    const { status } = req.body;

    try {
        const updatedStatus = await Payment.findByIdAndUpdate(payId, { status: "confirmed" },
            { new: true, runValidators: true }
        );

        if (!updatedStatus) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.status(200).json(updatedStatus);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


//delete order
router.delete('/:id', async (req, res) => {
    const payId = req.params.id;
    try {
        const deletedPayment = await Payment.findByIdAndDelete(payId);
        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not found!" });
        }

        res.status(200).json({ message: "Payment deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
