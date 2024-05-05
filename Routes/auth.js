// routes/auth.js
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController'); // Pastikan pathnya sesuai dengan struktur proyek Anda
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('https://diopark.vercel.app/dashboard');
});


module.exports = router;