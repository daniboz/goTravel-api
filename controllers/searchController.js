const Attraction = require('../models/Attraction');
const Event = require('../models/Event');
const Restaurant = require('../models/Restaurant');

exports.search = async (req, res) => {
  const { query } = req.query;
  const regex = new RegExp(`^${query}$`, 'i'); // exact match with case-insensitivity

  try {
    const attractions = await Attraction.find({
      $or: [
        { 'location.city': regex },
        { 'location.country': regex },
        { name: regex }
      ]
    });

    const events = await Event.find({
      $or: [
        { 'location.city': regex },
        { 'location.country': regex },
        { name: regex }
      ]
    });

    const restaurants = await Restaurant.find({
      $or: [
        { 'location.city': regex },
        { 'location.country': regex },
        { name: regex }
      ]
    });

    res.json({ attractions, events, restaurants });
  } catch (error) {
    res.status(500).json({ message: 'Error performing search', error });
  }
};
