const Parkiran = require('../Models/parkiran');

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
        const newParkiran = await Parkiran.create({ blok_parkir, lantai, kendaraan, status });
        res.status(201).json({message: 'Data parkiran berhasil ditambahkan', data:newParkiran});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateParkiran(req, res) {
    try {
        const { blok_parkir } = req.params;
        const { lantai, kendaraan, status } = req.body;
        const updatedParkiran = await Parkiran.update({ lantai, kendaraan, status }, {
            where: { blok_parkir },
        });

        if (updatedParkiran[0] === 0) {
            return res.status(404).json({ message: 'Data parkiran tidak ditemukan' });
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


module.exports = { getAllParkiran, createParkiran, updateParkiran, deleteParkiran };