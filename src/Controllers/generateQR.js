const Parkiran = require('../Models/parkiran');

async function generateQRCodeForAvailableParkingMotor(req, res) {
    try {
        const availableParking = await Parkiran.findOne({ where: { status: 'available', kendaraan: 'Motor' } });
        if (!availableParking) {
            return res.status(404).json({ message: 'Tidak ada tempat parkir yang tersedia' });
        }

        res.status(200).json({ 
            message: 'Data tempat parkir berhasil ditemukan', 
            data: {
                blok_parkir: availableParking.blok_parkir
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mencari tempat parkir' });
    }
}

async function generateQRCodeForAvailableParkingMobil(req, res) {
    try {
        const availableParking = await Parkiran.findOne({ where: { status: 'available', kendaraan: 'Mobil' } });
        if (!availableParking) {
            return res.status(404).json({ message: 'Tidak ada tempat parkir yang tersedia' });
        }

        res.status(200).json({ 
            message: 'Data tempat parkir berhasil ditemukan', 
            data: {
                blok_parkir: availableParking.blok_parkir
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mencari tempat parkir' });
    }
}

module.exports = { generateQRCodeForAvailableParkingMotor, generateQRCodeForAvailableParkingMobil };