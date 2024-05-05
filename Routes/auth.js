const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authController = require('../Controllers/authController');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    
    const token = jwt.sign({ id_pengguna: req.user.id_pengguna, email: req.user.email }, 'secret_key', { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true }); 
    res.status(200); 
  }
);

module.exports = router;
