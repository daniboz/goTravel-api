// routes/events/event.js
const express = require('express');
const {
  filterEvents,
  getEventDetails,
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../../controllers/events/eventController');

const router = express.Router();

router.get('/filter', filterEvents);
router.get('/:id', getEventDetails);
router.get('/', getAllEvents); // Get all events
router.post('/', createEvent); // Create a new event
router.put('/:id', updateEvent); // Update an event
router.delete('/:id', deleteEvent); // Delete an event

module.exports = router;
