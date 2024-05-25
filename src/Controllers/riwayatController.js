const Pengguna = require('../src/Models/pengguna');
const Transaksi = require('../src/Models/transaksi');

exports.getRiwayatTransaksi = async (req, res) => {
    try {
        const penggunaId = req.pengguna.id_pengguna; 

        const riwayatTransaksi = await Transaksi.findAll({
            where: { id_pengguna: penggunaId },
            include: [{
                model: Pengguna, 
                as: 'pengguna',
                attributes: ['nama', 'username', 'email', 'nomor_polisi', 'detail_kendaraan']
            }],
            attributes: ['waktu_parkir', 'status'], 
            order: [['waktu_parkir', 'DESC']] 
        });

        if (riwayatTransaksi.length > 0) {
            res.send({ success: true, data: riwayatTransaksi });
        } else {
            res.send({ success: false, message: "Tidak ada riwayat transaksi." });
        }
    } catch (error) {
        console.error("Error saat mengambil riwayat transaksi:", error);
        res.status(500).send({ success: false, message: "Terjadi kesalahan saat mengambil riwayat transaksi." });
    }
};