// routes/review.js
const express = require('express');
const { addReview, deleteReview } = require('../controllers/reviewController');
const router = express.Router();

router.post('/add', addReview);
router.delete('/delete', deleteReview);  // Add this line


module.exports = router;
