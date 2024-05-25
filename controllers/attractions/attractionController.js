const Attraction = require('../../models/Attraction');

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

const getAttractionDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const attraction = await Attraction.findById(id).populate({
      path: 'reviews.user',
      select: 'username profile'
    });

    if (!attraction) {
      console.log('No attraction found with the given id');
      return res.status(404).json({ message: 'Attraction not found' });
    }

    console.log('Populated Attraction with Reviews:', JSON.stringify(attraction.reviews, null, 2));
    res.status(200).json(attraction);
  } catch (error) {
    console.error('Error fetching attraction details:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find();
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createAttraction = async (req, res) => {
  const { name, description, imageUrl, location, coordinates, types, duration, suitability, hours } = req.body;
  
  const newAttraction = new Attraction({
    name,
    description,
    imageUrl,
    location,
    coordinates,
    types,
    duration,
    suitability,
    hours,
  });

  try {
    const savedAttraction = await newAttraction.save();
    res.status(201).json(savedAttraction);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateAttraction = async (req, res) => {
  const { id } = req.params;
  const { name, description, imageUrl, location, coordinates, types, duration, suitability, hours } = req.body;

  try {
    const updatedAttraction = await Attraction.findByIdAndUpdate(
      id,
      { name, description, imageUrl, location, coordinates, types, duration, suitability, hours },
      { new: true }
    );

    if (!updatedAttraction) {
      return res.status(404).json({ message: 'Attraction not found' });
    }

    res.json(updatedAttraction);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteAttraction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAttraction = await Attraction.findByIdAndDelete(id);

    if (!deletedAttraction) {
      return res.status(404).json({ message: 'Attraction not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  filterAttractions,
  getAttractionDetails,
  getAllAttractions,
  createAttraction,
  updateAttraction,
  deleteAttraction,
};
