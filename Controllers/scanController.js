const Transaksi = require('../Models/transaksi');

async function scanMasukQRCode(req, res) {
  const { id_pengguna } = req.pengguna; // Ambil ID pengguna dari token JWT

  try {
    const waktu_parkir = new Date();
    const status = 'masuk';
    const transaksi = await Transaksi.create({ id_pengguna, waktu_parkir, status });

    res.status(200).json(transaksi);
  } catch (error) {
    console.error('Error saat memproses pemindaian QR code masuk:', error);
    res.status(500).json({ error: 'Gagal memproses pemindaian QR code masuk' });
  }
}

async function scanKeluarQRCode(req, res) {
  const { id_pengguna } = req.pengguna; // Ambil ID pengguna dari token JWT

  try {
    const waktu_parkir = new Date();
    const status = 'keluar';
    const transaksi = await Transaksi.create({ id_pengguna, waktu_parkir, status });

    res.status(200).json(transaksi);
  } catch (error) {
    console.error('Error saat memproses pemindaian QR code keluar:', error);
    res.status(500).json({ error: 'Gagal memproses pemindaian QR code keluar' });
  }
}

module.exports = { scanMasukQRCode, scanKeluarQRCode };
