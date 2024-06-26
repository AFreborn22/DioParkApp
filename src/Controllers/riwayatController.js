const Pengguna = require('../Models/pengguna');
const Transaksi = require('../Models/transaksi');

exports.getRiwayatTransaksi = async (req, res) => {
    try {
        const emailPengguna = req.pengguna.email; 

        const riwayatTransaksi = await Transaksi.findAll({
            where: { email: emailPengguna },
            include: [{
                model: Pengguna, 
                as: 'pengguna',
                attributes: ['nama', 'username', 'email', 'nomor_polisi', 'detail_kendaraan']
            }],
            attributes: ['id_transaksi', 'waktu_parkir', 'status'], 
            order: [['waktu_parkir', 'DESC']] 
        });

        // Menghapus entri duplikat
        const uniqueTransaksi = [];
        const transaksiSet = new Set();

        for (const transaksi of riwayatTransaksi) {
            const key = `${transaksi.waktu_parkir}-${transaksi.status}`;
            if (!transaksiSet.has(key)) {
                transaksiSet.add(key);
                uniqueTransaksi.push(transaksi);
            } else {
                // Hapus transaksi duplikat dari database
                await Transaksi.destroy({ where: { id_transaksi: transaksi.id_transaksi } });
            }
        }

        if (uniqueTransaksi.length > 0) {
            res.send({ success: true, data: uniqueTransaksi });
        } else {
            res.send({ success: false, message: "Tidak ada riwayat transaksi." });
        }
    } catch (error) {
        console.error("Error saat mengambil riwayat transaksi:", error);
        res.status(500).send({ success: false, message: "Terjadi kesalahan saat mengambil riwayat transaksi." });
    }
};