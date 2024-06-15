const Transaksi = require('../Models/transaksi');
const Parkiran = require('../Models/parkiran')

exports.getStatTransaksi = async (req, res) => {
  try {

    const transaksi = await Transaksi.findAll({
      include: [
        {
            model: Parkiran,
            as: 'parkiran', 
            attributes: ['kendaraan'] 
        }
    ]
    });
    
    // Objek untuk menyimpan transaksi per email
    const transaksiPerEmail = {};

    transaksi.forEach(trx => {
      const email = trx.email;

      if (!transaksiPerEmail[email]) {
        transaksiPerEmail[email] = { masuk: 0, keluar: 0 };
      }

      // Hitung transaksi "masuk" dan "keluar"
      if (trx.status === 'masuk') {
        transaksiPerEmail[email].masuk += 1;
      } else if (trx.status === 'keluar') {
        transaksiPerEmail[email].keluar += 1;
      }
    });

    // Hitung total transaksi unik
    let totalTransaksi = 0;

    Object.values(transaksiPerEmail).forEach(emailTransaksi => {
      // Minimum jumlah antara "masuk" dan "keluar" memberikan jumlah transaksi unik
      totalTransaksi += Math.min(emailTransaksi.masuk, emailTransaksi.keluar);
    });

    if (totalTransaksi === 0) {
      return res.status(404).json({ error: 'Tidak ada transaksi parkir ditemukan dengan kondisi tersebut' });
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