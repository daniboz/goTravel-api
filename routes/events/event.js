const express = require('express');
const router = express.Router();
const { filterEvents, getEventDetails } = require('../../controllers/events/eventController');

router.get('/filter', filterEvents);
router.get('/:id', getEventDetails);

module.exports = router;
