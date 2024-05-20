const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  description: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  rating: Number,
  location: {
    city: String,
    country: String
  },
  reviewCount: Number,
  hours: String,
  types: [String], // Added to support filtering by cuisine type
  priceRange: String, // Added to support filtering by price range
  dietaryOptions: [String], // Added to support filtering by dietary options
  reviews: [{
    user: {
      username: String,
      profile: String
    },
    rating: Number,
    review: String,
    updatedAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
