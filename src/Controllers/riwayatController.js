const Pengguna = require('../Models/pengguna');
const Transaksi = require('../Models/transaksi');
const { Op } = require('sequelize');

exports.getRiwayatTransaksi = async (req, res) => {
    const t = await sequelize.transaction();
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
            order: [['waktu_parkir', 'DESC']],
            transaction: t
        });

        // Menghapus entri duplikat
        const uniqueTransaksi = [];
        const transaksiMap = new Map();

        for (const transaksi of riwayatTransaksi) {
            const key = `${transaksi.waktu_parkir}-${transaksi.status}`;
            if (!transaksiMap.has(key)) {
                transaksiMap.set(key, transaksi);
                uniqueTransaksi.push(transaksi);
            } else {
                await Transaksi.destroy({ where: { id_transaksi: transaksi.id_transaksi }, transaction: t });
            }
        }

        await t.commit();

        if (uniqueTransaksi.length > 0) {
            res.send({ success: true, data: uniqueTransaksi });
        } else {
            res.send({ success: false, message: "Tidak ada riwayat transaksi." });
        }
    } catch (error) {
        await t.rollback();
        console.error("Error saat mengambil riwayat transaksi:", error);
        res.status(500).send({ success: false, message: "Terjadi kesalahan saat mengambil riwayat transaksi." });
    }
};