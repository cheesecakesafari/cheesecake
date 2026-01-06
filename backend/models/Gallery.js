const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    clientName: { type: String, required: true }, // Client name
    description: { type: String, required: true, maxlength: 250 }, // 50 words, max
    location: { type: String, required: true }, // Location stamp
    createdAt: { type: Date, default: Date.now }, // Automatically set time stamp
    images: { type: [String], required: true, validate: [arrayLimit, 'Maximum 3 images allowed'] }, // Array of images, limited to 3
});

// Custom validator to limit number of images
function arrayLimit(val) {
    return val.length <= 3;
}

module.exports = mongoose.model('Gallery', GallerySchema);