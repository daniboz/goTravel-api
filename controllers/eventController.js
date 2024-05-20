const Event = require('../models/Event');

const filterEvents = async (req, res) => {
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

  if (types) {
    const typesArray = Array.isArray(types) ? types : types.split(',');
    filter.types = { $in: typesArray };
  }

  if (ratings) {
    const ratingsArray = Array.isArray(ratings) ? ratings : ratings.split(',').map(Number);
    filter.rating = { $in: ratingsArray };
  }

  if (durations) {
    const durationsArray = Array.isArray(durations) ? durations : durations.split(',');
    filter.duration = { $in: durationsArray };
  }

  if (suitabilities) {
    const suitabilitiesArray = Array.isArray(suitabilities) ? suitabilities : suitabilities.split(',');
    filter.suitability = { $in: suitabilitiesArray };
  }

  console.log('Filters:', filter);

  try {
    const events = await Event.find(filter);
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { filterEvents };
