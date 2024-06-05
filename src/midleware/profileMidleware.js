// const Pengguna = require('../Models/pengguna');

// async function checkProfileCompletion(req, res, next) {
//   const  id_pengguna = req.pengguna.id_pengguna; // Ambil ID pengguna dari token JWT

//   try {
//     const pengguna = await Pengguna.findByPk(id_pengguna);

//     if (!pengguna) {
//       return res.status(404).json({ error: 'Profil pengguna tidak ditemukan' });
//     }

//     // Cek apakah profil sudah lengkap
//     if (!pengguna.nama || !pengguna.username || !pengguna.email || !pengguna.password || !pengguna.nomor_telp || !pengguna.nomor_polisi || !pengguna.detail_kendaraan) {
//       // Redirect ke rute update profil jika profil belum lengkap
//       return res.redirect('/api/profile/update');
//     }

//     next();
//   } catch (error) {
//     console.error('Error saat memeriksa profil pengguna:', error);
//     res.status(500).json({ error: 'Terjadi kesalahan saat memeriksa profil pengguna' });
//   }
// }

// module.exports = checkProfileCompletion;
