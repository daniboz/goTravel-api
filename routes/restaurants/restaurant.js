// routes/restaurants/restaurant.js
const express = require('express');
const {
  filterRestaurants,
  getRestaurantDetails,
  getAllRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require('../../controllers/restaurants/restaurantController');

const router = express.Router();

router.get('/filter', filterRestaurants);
router.get('/:id', getRestaurantDetails);
router.get('/', getAllRestaurants); // Get all restaurants
router.post('/', createRestaurant); // Create a new restaurant
router.put('/:id', updateRestaurant); // Update a restaurant
router.delete('/:id', deleteRestaurant); // Delete a restaurant

module.exports = router;
