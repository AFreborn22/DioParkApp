const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Pengguna = require('../Models/pengguna');

function generateToken(pengguna) {
  const token = jwt.sign({ id: pengguna.id, email: pengguna.email }, 'secret_key', { expiresIn: '1h' });
  return token;
}

passport.use(new GoogleStrategy({
    name: 'diopark Web client',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Cek apakah user dengan email Google sudah terdaftar
      let pengguna = await Pengguna.findOne({ where: { email: profile.emails[0].value } });
      if (!pengguna) {
        // Jika belum terdaftar, buat pengguna baru
        pengguna = await Pengguna.create({
          username: profile.displayName,
          email: profile.emails[0].value,
        });
      }

      if (!pengguna.token) {
        pengguna.token = generateToken(pengguna);
        await pengguna.save();
      }

      // Kirim token JWT kepada klien
      return done(null, pengguna);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((pengguna, done) => {
  done(null, pengguna.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const pengguna = await Pengguna.findOne({ where: { email } });
    done(null, pengguna);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;