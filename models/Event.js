const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  description: String,
  date: String,
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
  types: [String], // Added for filtering by type
  duration: String, // Added for filtering by duration
  suitability: [String], // Added for filtering by suitability
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

module.exports = mongoose.model('Event', EventSchema);
