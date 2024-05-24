const Restaurant = require('../../models/Restaurant');

const filterRestaurants = async (req, res) => {
  const { query, types, ratings, priceRanges, dietaryOptions } = req.query;

  console.log('Query:', query);
  console.log('Types:', types);
  console.log('Ratings:', ratings);
  console.log('Price Ranges:', priceRanges);
  console.log('Dietary Options:', dietaryOptions);

  let filter = {};

  if (query) {
    filter.$or = [
      { name: new RegExp(query, 'i') },
      { 'location.city': new RegExp(query, 'i') },
      { 'location.country': new RegExp(query, 'i') }
    ];
  }

  if (types) {
    const typesArray = Array.isArray(types) ? types : types.split(',');
    filter.types = { $in: typesArray };
  }

  if (ratings) {
    const ratingsArray = Array.isArray(ratings) ? ratings : ratings.split(',').map(Number);
    filter.rating = { $in: ratingsArray };
  }

  if (priceRanges) {
    const priceRangesArray = Array.isArray(priceRanges) ? priceRanges : priceRanges.split(',');
    filter.priceRange = { $in: priceRangesArray };
  }

  if (dietaryOptions) {
    const dietaryOptionsArray = Array.isArray(dietaryOptions) ? dietaryOptions : dietaryOptions.split(',');
    filter.dietaryOptions = { $in: dietaryOptionsArray };
  }

  console.log('Filters:', filter);

  try {
    const restaurants = await Restaurant.find(filter);
    res.json({ restaurants });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getRestaurantDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findById(id).populate({
      path: 'reviews.user',
      select: 'username profile'
    });

    if (!restaurant) {
      console.log('No restaurant found with the given id');
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    console.log('Populated Restaurant with Reviews:', JSON.stringify(restaurant.reviews, null, 2));
    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { filterRestaurants, getRestaurantDetails};
