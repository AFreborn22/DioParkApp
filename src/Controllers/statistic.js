const Transaksi = require('../Models/transaksi');

exports.getStatTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll();
    const totalTransaksi = await Transaksi.count();

    if (totalTransaksi === 0) {
      return res.status(404).json({ error: 'Tidak ada transaksi ditemukan' });
    }

    res.status(200).json({ 
      transaksi,
      totalTransaksi, 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data transaksi.' });
  }
};