const express = require('express');
const authController = require('../controllers/authController'); // Ensure this points to your controller file

const router = express.Router();

router.get('/login', authController.getLoginPage);
router.post('/login', authController.handleLogin);

router.get('/signup', authController.getSignupPage);
router.post('/signup', authController.createUser);

router.get('/logout', authController.handleLogout);

router.get('/message', authController.getMessagePage);

module.exports = router;