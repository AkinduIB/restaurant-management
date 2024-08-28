
const express = require('express');
const { addGalleryItem, getAllGalleryItems } = require('../controllers/galleryController');

const router = express.Router();

// Route to add a new gallery item
router.post('/', addGalleryItem);

// Route to get all gallery items
router.get('/', getAllGalleryItems);

module.exports = router;
