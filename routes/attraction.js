// routes/attraction.js
const express = require('express');
const router = express.Router();
const { filterAttractions, getAttractionDetails } = require('../controllers/attractionController');

router.get('/filter', filterAttractions);
router.get('/:id', getAttractionDetails);

module.exports = router;
