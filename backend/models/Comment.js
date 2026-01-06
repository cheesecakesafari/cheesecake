const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    clientName: { type: String, required: true, default: 'Anonymous' }, // Client name or anonymous
    description: { type: String, required: true, maxlength: 250 }, // 50 words (approx. 5 words/line * 50)
    createdAt: { type: Date, default: Date.now }, // Automatically set time stamp
});

module.exports = mongoose.model('Comment', CommentSchema);