const qr = require('qr-image');
const fs = require('fs');
const Parkiran = require('../Models/parkiran');

async function generateQRCodeForExitParkingMotor(req, res) {
  try {
    // Cari data parkiran yang telah di-scan keluar "exit" dari database berdasarkan blok_parkir
    const exitParking = await Parkiran.findOne({ where: { status: 'unavailable', kendaraan: 'Motor' } });

    if (!exitParking) {
      return res.status(404).json({ message: 'No exit parking found' });
    }

    // Generate QR code dari data parkiran untuk keluar
    const qr_png = qr.image(exitParking.blok_parkir.toString(), { type: 'png' }); // Menggunakan blok_parkir sebagai data QR code
    qr_png.pipe(fs.createWriteStream(`qrcodes/${exitParking.blok_parkir}_exit.png`)); // Simpan QR code keluar sebagai file PNG

    res.status(200).json({ message: 'QR code generated for exit parking', data: exitParking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating QR code for exit parking' });
  }
}

async function generateQRCodeForExitParkingMobil(req, res) {
    try {
      // Cari data parkiran yang telah di-scan keluar "exit" dari database berdasarkan blok_parkir
      const exitParking = await Parkiran.findOne({ where: { status: 'unavailable', kendaraan: 'Mobil' } });
  
      if (!exitParking) {
        return res.status(404).json({ message: 'No exit parking found' });
      }
  
      // Generate QR code dari data parkiran untuk keluar
      const qr_png = qr.image(exitParking.blok_parkir.toString(), { type: 'png' }); // Menggunakan blok_parkir sebagai data QR code
      qr_png.pipe(fs.createWriteStream(`qrcodes/${exitParking.blok_parkir}_exit.png`)); // Simpan QR code keluar sebagai file PNG
  
      res.status(200).json({ message: 'QR code generated for exit parking', data: exitParking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error generating QR code for exit parking' });
    }
  }

module.exports = { generateQRCodeForExitParkingMotor, generateQRCodeForExitParkingMobil };
