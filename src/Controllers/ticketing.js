const Parkiranrealtime = require('../Models/parkiranrealtime');
const Pengguna = require('../Models/pengguna')
const Transaksi = require('../Models/transaksi')

exports.getTicket = async (req, res) => {
    const emailPengguna = req.pengguna.email;
  
    try {

        const ticket = await Parkiranrealtime.findOne({
            where: { email: emailPengguna },
            include: [
                {
                    model: Pengguna,
                    as: 'pengguna',
                    attributes: ['nama', 'nomor_polisi', 'detail_kendaraan']
                },
                {
                    model: Transaksi,
                    as: 'transaksi_parkir',
                    attributes: ['waktu_parkir'],
                    where: { status: 'masuk' } 
                }
            ]
        });        
  
      if (!ticket) {
        return res.status(404).json({ error: 'Whoop anda belum parkir' });
      }
  
      res.status(200).json({ ticket });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data parkiran.' });
    }
  };