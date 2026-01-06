const express = require('express');
const multer = require('multer');
const path = require('path');
const Gallery = require('../models/Gallery');

const router = express.Router();

// Use diskStorage to preserve file extensions and generate safe filenames
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname) || '';
        const name = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
        cb(null, name);
    }
});

const upload = multer({ storage }); // Store images in uploads folder with extensions

// Submit a new gallery item
router.post('/', upload.array('images', 3), async (req, res) => {
    try {
        const { clientName, description, location } = req.body;

        // Validate description length
        if (!description || description.split(' ').length > 50) {
            return res.status(400).json({ message: 'Description must not exceed 50 words' });
        }

        const imagePaths = req.files.map(file => file.path); // Add uploaded images
        const newGalleryItem = new Gallery({ clientName, description, location, images: imagePaths });
        await newGalleryItem.save();
        res.status(201).json(newGalleryItem);
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit gallery item', error });
    }
});

// Get all gallery items
router.get('/', async (req, res) => {
    try {
        const galleryItems = await Gallery.find();
        res.status(200).json(galleryItems);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch gallery items', error });
    }
});

module.exports = router;