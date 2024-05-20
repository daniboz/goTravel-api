const Attraction = require('../models/Attraction');

const filterAttractions = async (req, res) => {
  const { query, types, ratings, durations, suitabilities } = req.query;

  console.log('Query:', query);
  console.log('Types:', types);
  console.log('Ratings:', ratings);
  console.log('Durations:', durations);
  console.log('Suitabilities:', suitabilities);

  let filter = {};

  if (query) {
    filter.$or = [
      { name: new RegExp(query, 'i') },
      { 'location.city': new RegExp(query, 'i') },
      { 'location.country': new RegExp(query, 'i') }
    ];
  }

  if (types && Array.isArray(types)) {
    filter.types = { $in: types };
  }

  if (ratings && Array.isArray(ratings)) {
    filter.rating = { $in: ratings.map(Number) };
  }

  if (durations && Array.isArray(durations)) {
    filter.duration = { $in: durations };
  }

  if (suitabilities && Array.isArray(suitabilities)) {
    filter.suitability = { $in: suitabilities };
  }

  console.log('Filters:', filter);


  try {
    const attractions = await Attraction.find(filter);
    res.json({ attractions });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { filterAttractions };
