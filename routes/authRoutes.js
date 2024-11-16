const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/login', authMiddleware.redirectIfAuthenticated, authController.getLoginPage);
router.post('/login', authController.handleLogin);

router.get('/signup', authMiddleware.redirectIfAuthenticated, authController.getSignupPage);
router.post('/signup', authController.createUser);

router.post('/logout', authController.handleLogout);

router.get('/messages', authMiddleware.isAuthenticated, authController.getMessagePage);

module.exports = router;