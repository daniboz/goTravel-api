// routes/review.js
const express = require('express');
const { addReview, deleteReview, getReviews } = require('../../controllers/attractions/attractionReviewController');
const router = express.Router();

router.post('/add', addReview);
router.delete('/delete', deleteReview);  // Add this line
router.get('/:placeId/reviews', getReviews);


module.exports = router;
