const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET /api/reviews/:productId
router.get('/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/reviews
router.post('/', async (req, res) => {
    const { productId, username, rating, comment } = req.body;
    try {
        const newReview = new Review({
            productId,
            username,
            rating,
            comment
        });
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
