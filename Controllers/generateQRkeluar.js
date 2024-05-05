const qr = require('qr-image');
const fs = require('fs');
const Parkiranrealtime = require('../Models/parkiranrealtime');

// Endpoint untuk generate QR code keluar parkir
async function generateQRCodeForExitParking(req, res) {
    const { blok_parkir } = req.body; // Ambil blok_parkir dari body request

    try {
        // Cari data parkiran yang sesuai dengan blok_parkir dari database
        const exitParking = await Parkiranrealtime.findOne({ where: { blok_parkir } });

        if (!exitParking) {
            return res.status(404).json({ message: 'Data parkir tidak ditemukan' });
        }

        // Generate QR code dari data parkiran untuk keluar
        const qr_png = qr.image(exitParking.blok_parkir.toString(), { type: 'png' });
        qr_png.pipe(fs.createWriteStream(`qrcodes/${exitParking.blok_parkir}_exit.png`));

        res.status(200).json({ message: 'QR code berhasil di buat', data: exitParking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan ssat membuat QR code' });
    }
}

module.exports = { generateQRCodeForExitParking };