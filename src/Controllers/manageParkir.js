const Parkiran = require('../Models/parkiran');
const Pengguna = require('../Models/pengguna');
const Parkiranrealtime = require('../Models/parkiranrealtime');

async function getAllParkiranRealtime(req, res) {
    try {
        const parkiranRealtime = await Parkiranrealtime.findAll({
            include: [{
                model: Pengguna,
                as: 'pengguna',
                attributes: ['nama', 'username', 'email', 'nomor_polisi', 'detail_kendaraan']
            }]
        });

        if (parkiranRealtime.length === 0) {
            return res.status(404).json({ message: 'Tidak ada pengguna yang parkir' });
        }

        res.json(parkiranRealtime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getPenggunaByBlokParkir(req, res) {
    const { blok_parkir } = req.params; 

    try {
        const penggunaParkir = await Parkiranrealtime.findOne({ where: { blok_parkir } });

        if (!penggunaParkir) {
            return res.status(404).json({ message: 'Pengguna yang parkir tidak ditemukan' });
        }

        res.json(penggunaParkir);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllParkiran(req, res) {
    try {
        const parkiran = await Parkiran.findAll();
        res.json(parkiran);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createParkiran(req, res) {
    try {
        const { blok_parkir, lantai, kendaraan, status } = req.body;

        // Cek apakah nilai "status" disertakan dalam permintaan
        const parkiranData = { blok_parkir, lantai, kendaraan };
        if (status) {
            parkiranData.status = status;
        }

        // Buat objek Parkiran dengan data yang sesuai
        const newParkiran = await Parkiran.create(parkiranData);

        res.status(201).json({ message: 'Data parkiran berhasil ditambahkan', data: newParkiran });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateParkiran(req, res) {
    try {
        const { blok_parkir } = req.params;
        const { lantai, kendaraan, status } = req.body;

        // Cek apakah data parkiran dengan blok_parkir tertentu ada dalam database
        const existingParkiran = await Parkiran.findOne({ where: { blok_parkir } });
        if (!existingParkiran) {
            return res.status(404).json({ message: 'Data parkiran tidak ditemukan' });
        }

        // Update data parkiran dengan nilai yang diberikan
        const updatedParkiran = await Parkiran.update({ lantai, kendaraan, status }, {
            where: { blok_parkir },
        });

        // Periksa apakah data berhasil diperbarui
        if (updatedParkiran[0] === 0) {
            return res.status(400).json({ message: 'Gagal memperbarui data parkiran' });
        }

        res.json({ message: 'Data parkiran berhasil diperbarui' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteParkiran(req, res) {
    try {
        const { blok_parkir } = req.params;
        const deletedRows = await Parkiran.destroy({ where: { blok_parkir } });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Data parkiran tidak ditemukan' });
        }

        res.status(200).send({ message: 'Data parkiran berhasil dihapus' }).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { getAllParkiranRealtime, getAllParkiran, getPenggunaByBlokParkir, createParkiran, updateParkiran, deleteParkiran };