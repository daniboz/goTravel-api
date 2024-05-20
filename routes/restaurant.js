const express = require('express');
const router = express.Router();
const { filterRestaurants } = require('../controllers/restaurantController');

router.get('/filter', filterRestaurants);

module.exports = router;
