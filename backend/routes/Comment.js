const express = require('express');
const Comment = require('../models/Comment');

const router = express.Router();

// Submit a new comment
router.post('/', async (req, res) => {
    try {
        const { clientName, description } = req.body;

        // Validate description length
        if (!description || description.split(' ').length > 50) {
            return res.status(400).json({ message: 'Description must not exceed 50 words' });
        }

        const newComment = new Comment({ clientName, description });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit comment', error });
    }
});

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch comments', error });
    }
});

module.exports = router;