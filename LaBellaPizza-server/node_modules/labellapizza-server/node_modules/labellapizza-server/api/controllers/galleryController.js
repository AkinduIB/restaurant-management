const Gallery = require('../models/gallery');

// Add a new gallery item
exports.addGalleryItem = async (req, res) => {
  try {
    const { imageUrl, description } = req.body;

    const newGalleryItem = new Gallery({
      imageUrl,
      description,
    });

    const savedGalleryItem = await newGalleryItem.save();
    res.status(201).json(savedGalleryItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add gallery item', error });
  }
};

// Get all gallery items
exports.getAllGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find();
    res.status(200).json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch gallery items', error });
  }
};
