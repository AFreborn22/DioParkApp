const Parkiranrealtime = require('../src/Models/parkiranrealtime');

// Endpoint untuk generate QR code keluar parkir
async function generateQRCodeForExitParking(req, res) {
    const { blok_parkir } = req.body; // Ambil blok_parkir dari body request

    try {
        // Cari data parkiran yang sesuai dengan blok_parkir dari database
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