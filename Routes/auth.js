// routes/auth.js
const express = require('express');
const passport = require('passport');
const authController = require('../Controllers/authController'); 
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  const token = req.pengguna.token;
  res.redirect('https://diopark.vercel.app/dashboard?token=${token}');
});


module.exports = router;