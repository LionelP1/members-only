const express = require('express');
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/messages', authMiddleware.isAuthenticated, messageController.getMessagePage);
router.get('/', messageController.getHomePage);

router.get('/messages/new', (req, res) => {
    res.render('message/messageForm');
});

router.post('/messages/new', messageController.createNewMessage);

module.exports = router;