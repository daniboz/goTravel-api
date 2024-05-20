// routes/attractions.js

const express = require('express');
const router = express.Router();
const { filterAttractions } = require('../controllers/attractionController');

router.get('/filter', filterAttractions);

module.exports = router;
