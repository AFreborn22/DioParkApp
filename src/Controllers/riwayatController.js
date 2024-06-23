const Pengguna = require('../Models/pengguna');
const Transaksi = require('../Models/transaksi');
const moment = require('moment-timezone');

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
        const duplicateIds = [];

        for (const transaksi of riwayatTransaksi) {
            const waktuParkirJakarta = moment(transaksi.waktu_parkir).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            const key = `${waktuParkirJakarta}-${transaksi.status}`;
            if (!transaksiSet.has(key)) {
                transaksiSet.add(key);
                uniqueTransaksi.push({
                    ...transaksi.get({ plain: true }),
                    waktu_parkir: waktuParkirJakarta
                });
            } else {
                duplicateIds.push(transaksi.id_transaksi);
            }
        }

        // Menghapus transaksi duplikat dari database
        if (duplicateIds.length > 0) {
            await Transaksi.destroy({ where: { id_transaksi: duplicateIds } });
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