const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/messages', authMiddleware.isAuthenticated, authController.getMessagePage);
router.get('/')

module.exports = router;