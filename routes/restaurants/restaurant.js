// routes/restaurant.js
const express = require('express');
const { filterRestaurants, getRestaurantDetails } = require('../../controllers/restaurants/restaurantController');

const router = express.Router();

router.get('/filter', filterRestaurants);
router.get('/:id', getRestaurantDetails);

module.exports = router;
