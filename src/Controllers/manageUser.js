const Pengguna = require('../Models/pengguna')
const bcrypt = require('bcrypt');

async function getAllPengguna(req, res) {
    try {
        const pengguna = await Pengguna.findAll();
        res.json(pengguna);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createNewPengguna(req, res) {
    try {
        const { email, nama, username, password, nomor_polisi, detail_kendaraan } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const penggunaData = { email, nama, username, password: hashedPassword, nomor_polisi, detail_kendaraan };
        if (email) {
            penggunaData.email = email;
        }

        const newPengguna = await Pengguna.create(penggunaData);

        res.status(201).json({ message: 'Data pengguna berhasil ditambahkan', data: newPengguna });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletePengguna(req, res) {
    try {
        const { email } = req.body;
        const deletedRows = await Pengguna.destroy({ where: { email } });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Data pengguna tidak ditemukan' });
        }

        res.status(200).send({ message: 'Data pengguna berhasil dihapus' }).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getAllPengguna, createNewPengguna, deletePengguna };