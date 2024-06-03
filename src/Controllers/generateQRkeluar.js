const Parkiranrealtime = require('../Models/parkiranrealtime');

async function generateQRCodeForExitParking(req, res) {
    const { blok_parkir } = req.body; 

    try {
    
        const exitParking = await Parkiranrealtime.findOne({ where: { blok_parkir } });

        if (!exitParking) {
            return res.status(404).json({ message: 'Data parkir tidak ditemukan' });
        }

        res.status(200).json({ message: 'Data parkir berhasil ditemukan', data: exitParking.blok_parkir });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mencari data parkir' });
    }
}

module.exports = { generateQRCodeForExitParking };