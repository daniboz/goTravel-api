const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/jwt_token');

router.get('/me', verifyToken, userController.getCurrentUser);
router.get('/:id', userController.getUserById);
router.put('/me', verifyToken, userController.upload.single('profile'), userController.updateUser);

module.exports = router;
