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
router.get('/', getAllEvents); 
router.post('/', createEvent); 
router.put('/:id', updateEvent); 
router.delete('/:id', deleteEvent); 

module.exports = router;
