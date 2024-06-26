const Event = require('../../models/Event');

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

const getEventDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id).populate({
      path: 'reviews.user',
      select: 'username profile'
    });

    if (!event) {
      console.log('No event found with the given id');
      return res.status(404).json({ message: 'Event not found' });
    }

    console.log('Populated Event with Reviews:', JSON.stringify(event.reviews, null, 2));
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createEvent = async (req, res) => {
  const { name, description, imageUrl, location, coordinates, types, duration, suitability, date } = req.body;
  
  const newEvent = new Event({
    name,
    description,
    imageUrl,
    location,
    coordinates,
    types,
    duration,
    suitability,
    date,
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, description, imageUrl, location, coordinates, types, duration, suitability, date } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, description, imageUrl, location, coordinates, types, duration, suitability, date },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  filterEvents,
  getEventDetails,
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
