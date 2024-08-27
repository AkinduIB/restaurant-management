const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema object for Offers
const offerSchema = new Schema({
    category: {
        type: String,
        required: true,
        trim: true,
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
    },
    couponCode: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Ensure the coupon code is unique
    },
    description: {
        type: String,
        trim: true,
    },
    expiryDate: {
        type: Date,
        required: true, 
    },    
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create a model
const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;
