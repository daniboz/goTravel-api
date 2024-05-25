// routes/attractions/attraction.js
const express = require('express');
const {
  filterAttractions,
  getAttractionDetails,
  getAllAttractions,
  createAttraction,
  updateAttraction,
  deleteAttraction
} = require('../../controllers/attractions/attractionController');

const router = express.Router();

router.get('/filter', filterAttractions);
router.get('/:id', getAttractionDetails);
router.get('/', getAllAttractions); // Get all attractions
router.post('/', createAttraction); // Create a new attraction
router.put('/:id', updateAttraction); // Update an attraction
router.delete('/:id', deleteAttraction); // Delete an attraction

module.exports = router;
