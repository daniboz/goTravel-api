// routes/review.js
const express = require('express');
const { addReview, deleteReview, getReviews } = require('../../controllers/restaurants/restaurantReviewController');
const router = express.Router();

router.post('/add', addReview);
router.delete('/delete', deleteReview);
router.get('/:placeId/reviews', getReviews); // New route for fetching reviews


module.exports = router;
