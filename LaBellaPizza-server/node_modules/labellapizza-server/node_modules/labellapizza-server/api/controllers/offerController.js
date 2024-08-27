const Offer = require("../models/Offer");

// Get all offers
const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find({}).sort({createdAt: -1});
        if (!offers.length) {
            return res.status(404).json({ message: "No offers found" });
        }
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Post a new offer
const postOffer = async (req, res) => {
    const newOffer = req.body;
    try {
        const result = await Offer.create(newOffer);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an offer
const deleteOffer = async (req, res) => {
    const offerId = req.params.id;
    try {
        const deletedOffer = await Offer.findByIdAndDelete(offerId);
        if (!deletedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.status(200).json({ message: "Offer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single offer by ID
const singleOffer = async (req, res) => {
    const offerId = req.params.id;
    try {
        const offer = await Offer.findById(offerId);
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a single offer
const updateOffer = async (req, res) => {
    const offerId = req.params.id;
    const { _id, category, discount, couponCode, description, expiryDate } = req.body;
    try {
        const updatedOffer = await Offer.findByIdAndUpdate(
            offerId, 
            { _id, category, discount, couponCode, description, expiryDate },
            { new: true, runValidators: true }
        );

        if (!updatedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.status(200).json(updatedOffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllOffers,
    postOffer,
    deleteOffer,
    singleOffer,
    updateOffer,
};
