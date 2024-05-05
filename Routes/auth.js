const express = require('express');
const passport = require('passport');
// const jwt = require('jsonwebtoken');
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
    // // Jika autentikasi sukses, kirim token JWT kepada klien
    // const token = jwt.sign({ id_pengguna: req.user.id_pengguna, email: req.user.email }, 'secret_key', { expiresIn: '1h' });
    // res.cookie('token', token, { httpOnly: true }); // Simpan token dalam cookie untuk digunakan pada setiap permintaan
    res.redirect('https://diopark.vercel.app/dashboard'); // Redirect ke halaman dashboard setelah autentikasi sukses
  }
);

module.exports = router;
