const qr = require('qr-image');
const fs = require('fs');
const Parkiran = require('../Models/parkiran');

async function generateQRCodeForAvailableParkingMotor(req, res) {
    try {
      // Cari data parkiran "available" dari database berdasarkan blok_parkir
      const availableParking = await Parkiran.findOne({ where: { status: 'available', kendaraan:'Motor' } });
  
      if (!availableParking) {
        return res.status(404).json({ message: 'Tidak ada tempat parkir yang tersedia' });
      }
  
      // Generate QR code dari data parkiran
      const qr_png = qr.image(availableParking.blok_parkir.toString(), { type: 'png' }); // Menggunakan blok_parkir sebagai data QR code
      qr_png.pipe(fs.createWriteStream(`qrcodes/${availableParking.blok_parkir}.png`)); // Simpan QR code sebagai file PNG
  
      res.status(200).json({ message: 'QR code berhasil di buat', data: availableParking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan ssat membuat QR code' });
    }
}

async function generateQRCodeForAvailableParkingMobil(req, res) {
  try {
    // Cari data parkiran "available" dari database berdasarkan blok_parkir
    const availableParking = await Parkiran.findOne({ where: { status: 'available', kendaraan:'Mobil' } });

    if (!availableParking) {
      return res.status(404).json({ message: 'Tidak ada tempat parkir yang tersedia' });
    }

    // Generate QR code dari data parkiran
    const qr_png = qr.image(availableParking.blok_parkir.toString(), { type: 'png' }); // Menggunakan blok_parkir sebagai data QR code
    qr_png.pipe(fs.createWriteStream(`qrcodes/${availableParking.blok_parkir}.png`)); // Simpan QR code sebagai file PNG

    res.status(200).json({ message: 'QR code berhasil di buat', data: availableParking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan ssat membuat QR code' });
  }
}

module.exports = {generateQRCodeForAvailableParkingMotor, generateQRCodeForAvailableParkingMobil };