const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validators = require('../controllers/validators');
const router = express.Router();

router.get('/login', authMiddleware.redirectIfAuthenticated, authController.getLoginPage);
router.post('/login', authController.handleLogin);

router.get('/signup', authMiddleware.redirectIfAuthenticated, authController.getSignupPage);
router.post('/signup', validators.validateUser, authController.createUser);

router.post('/logout', authController.handleLogout);

module.exports = router;