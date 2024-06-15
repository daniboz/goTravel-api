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
router.get('/', getAllAttractions);
router.post('/', createAttraction);
router.put('/:id', updateAttraction);
router.delete('/:id', deleteAttraction);

module.exports = router;
