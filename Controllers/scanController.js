const Transaksi = require('../Models/transaksi');
const Parkiran = require('../Models/parkiran');
const Parkiranrealtime = require('../Models/parkiranrealtime');

async function scanMasukQRCode(req, res) {
  const { id_pengguna } = req.pengguna; // Ambil ID pengguna dari token JWT
  const { blok_parkir } = req.body; // Ambil blok parkir dari QR code yang dipindai

  try {
    // Cari data parkiran sesuai dengan blok_parkir dari QR code
    const parkiran = await Parkiran.findOne({ where: { blok_parkir, status: 'available' } });

    if (!parkiran) {
      return res.status(404).json({ error: 'Parkiran tidak tersedia atau QR code tidak valid' });
    }

    // Ubah status parkiran dari available ke unavailable
    await Parkiran.update({ status: 'unavailable' }, { where: { blok_parkir } });

    // Buat transaksi masuk
    const waktu_parkir = new Date();
    const status = 'masuk';
    const transaksi = await Transaksi.create({ id_pengguna, waktu_parkir, status, blok_parkir });
    const parkiranrealtime = await Parkiranrealtime.create({ id_pengguna, blok_parkir, id_transaksi: transaksi.id_transaksi })

    res.status(200).json({transaksi, parkiranrealtime});
  } catch (error) {
    console.error('Error saat memproses pemindaian QR code masuk:', error);
    res.status(500).json({ error: 'Gagal memproses pemindaian QR code masuk' });
  }
}

async function scanKeluarQRCode(req, res) {
  const { id_pengguna } = req.pengguna; // Ambil ID pengguna dari token JWT
  const { blok_parkir } = req.body; // Ambil blok parkir dari QR code yang dipindai

  try {
    // Cari data parkiran sesuai dengan blok_parkir dari QR code
    const parkiran = await Parkiran.findOne({ where: { blok_parkir, status: 'unavailable' } });

    if (!parkiran) {
      return res.status(404).json({ error: 'Parkiran tidak ditemukan atau QR code tidak valid' });
    }

    // Ubah status parkiran dari unavailable ke available
    await Parkiran.update({ status: 'available' }, { where: { blok_parkir } });

    // Buat transaksi keluar
    const waktu_parkir = new Date();
    const status = 'keluar';
    const transaksi = await Transaksi.create({ id_pengguna, waktu_parkir, status, blok_parkir });

    // Hapus data dari tabel Parkiranrealtime
    await Parkiranrealtime.destroy({ where: { id_pengguna, blok_parkir } });

    res.status(200).json(transaksi);
  } catch (error) {
    console.error('Error saat memproses pemindaian QR code keluar:', error);
    res.status(500).json({ error: 'Gagal memproses pemindaian QR code keluar' });
  }
}

module.exports = { scanMasukQRCode, scanKeluarQRCode };
