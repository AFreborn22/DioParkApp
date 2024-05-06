const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authController = require('../Controllers/authController');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }

    const token = jwt.sign({ id_pengguna: req.user.id_pengguna, email: req.user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('https://diopark.vercel.app//dashboard?token=${token}');
    
  }
);

module.exports = router;