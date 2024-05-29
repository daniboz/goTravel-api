// routes/calendarEntries.js
const express = require('express');
const { getEntries, createEntry, updateEntry, deleteEntry } = require('../controllers/calendarEntryController');
const verifyToken = require('../middleware/jwt_token');
const router = express.Router();

router.get('/', verifyToken, getEntries);
router.post('/', verifyToken, createEntry);
router.put('/:id', verifyToken, updateEntry);
router.delete('/:id', verifyToken, deleteEntry);

module.exports = router;
