const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Pengguna = require('../Models/pengguna');
const jwt = require('jsonwebtoken');
require('dotenv').config();

passport.use(new GoogleStrategy({
    name: 'diopark app',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let pengguna = await Pengguna.findOne({ where: { email: profile.emails[0].value } });
      if (!pengguna) {
        pengguna = await Pengguna.create({
          username: profile.displayName,
          email: profile.emails[0].value,
        });
      }

      return done(null, pengguna);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((pengguna, done) => {
  done(null, pengguna.id_pengguna);
});

passport.deserializeUser(async (id, done) => {
  try {
    const pengguna = await Pengguna.findByPk(id);
    done(null, pengguna);
  } catch (error) {
    done(error);
  }
});

const googleCallbackHandler = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/login' }, async (err, pengguna) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!pengguna) {
      return res.status(401).json({ error: 'Unauthorized' });
    } 

    try {
      const token = jwt.sign({ id_pengguna: pengguna.id_pengguna, email: pengguna.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
      const decodedToken = jwt.decode(token);
      console.log(decodedToken);

      res.cookie('token', token, { httpOnly: true, secure: true });
      
      res.redirect(`${CLIENT_URL}/dashboard`)
      // res.status(200).send({ message: "Login berhasil", pengguna, token });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  })(req, res, next);
};

module.exports = {
  googleCallbackHandler
};