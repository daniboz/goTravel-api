const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  hours: { type: String, required: true },
  types: [String],
  priceRange: { type: String, required: true },
  dietaryOptions: [String],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  reviews: [reviewSchema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
