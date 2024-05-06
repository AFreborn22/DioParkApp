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

    const token = jwt.sign({ id_pengguna: pengguna.id_pengguna, email: pengguna.email }, 'secret_key', { expiresIn: '1h' }); 
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  }
);

module.exports = router;

