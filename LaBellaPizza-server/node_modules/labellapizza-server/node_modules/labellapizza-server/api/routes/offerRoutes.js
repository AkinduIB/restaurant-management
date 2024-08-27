const express = require('express');
const Offer = require('../models/Offer');
const router = express.Router();

const offerController = require('../controllers/offerController');

// Get all offers
router.get('/', offerController.getAllOffers);

// Post a new offer
router.post('/', offerController.postOffer);

// Delete an offer
router.delete('/:id', offerController.deleteOffer);

// Get a single offer by ID
router.get('/:id', offerController.singleOffer);

// Update a single offer
router.patch('/:id', offerController.updateOffer);

module.exports = router;
