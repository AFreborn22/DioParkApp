const express = require('express');
const passport = require('passport');
const authController = require('../Controllers/authController');
const authGoogleController = require('../Controllers/authGoogleController');
const router = express.Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/logout', authController.logout);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', authGoogleController.googleCallbackHandler);

module.exports = router;