const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const eventSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
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
  types: [String], // For filtering by type
  duration: { type: String }, // For filtering by duration
  suitability: [String], // For filtering by suitability
  reviews: [reviewSchema]
});

module.exports = mongoose.model('Event', eventSchema);
