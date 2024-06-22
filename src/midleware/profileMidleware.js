const Pengguna = require('../Models/pengguna');
require('dotenv').config();

async function checkProfileCompletion(req, res, next) {
  const  emailPengguna = req.pengguna.email; 

  try {
    const pengguna = await Pengguna.findOne({ where: { email: emailPengguna } });

    if (!pengguna) {
      return res.status(404).json({ error: 'Profil pengguna tidak ditemukan' });
    }

    // Cek apakah profil sudah lengkap
    if (!pengguna.nama || !pengguna.username || !pengguna.email || !pengguna.nomor_telp || !pengguna.nomor_polisi || !pengguna.detail_kendaraan) {
      // Redirect ke rute update profil jika profil belum lengkap
      return res.redirect(`${process.env.CLIENT_URL}/userprofile`);
    }

    next();
  } catch (error) {
    console.error('Error saat memeriksa profil pengguna:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat memeriksa profil pengguna' });
  }
}

module.exports = checkProfileCompletion;
