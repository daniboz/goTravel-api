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
router.get('/', getAllRestaurants); 
router.post('/', createRestaurant); 
router.put('/:id', updateRestaurant); 
router.delete('/:id', deleteRestaurant); 

module.exports = router;
