const express = require('express');
const { addReview, deleteReview, getReviews } = require('../../controllers/attractions/attractionReviewController');
const router = express.Router();

router.post('/add', addReview);
router.delete('/delete', deleteReview);
router.get('/:placeId/reviews', getReviews);


module.exports = router;
