const express = require('express');
const router = express.Router();
const { filterEvents } = require('../controllers/eventController');

router.get('/filter', filterEvents);

module.exports = router;
