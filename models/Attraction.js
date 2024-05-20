const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    username: { type: String, required: true },
    profile: { type: String, required: true }
  },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const attractionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  rating: { type: Number, default: 0 },
  location: {
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  reviewCount: { type: Number, default: 0 },
  hours: { type: String, required: true },
  reviews: [reviewSchema],
  types: [{ type: String }],
  duration: { type: String },
  suitability: [{ type: String }]
});

const Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction;
