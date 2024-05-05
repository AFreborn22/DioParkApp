const Parkiran = require('../Models/parkiran');

exports.getAvailableParkirMotor = async (req, res) => {
    try {
        const availableParkir = await Parkiran.findAll({
            where: {
                status: 'available',
                kendaraan: 'Motor'
            }
        });

        const countAvailableParkir = availableParkir.length; // Hitung jumlah parkir yang tersedia

        res.json({ availableParkir: availableParkir, jumlahParkirTersedia: countAvailableParkir });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server sedang gangguan' });
    }
};

exports.getAvailableParkirMobil = async (req, res) => {
    try {
        const availableParkir = await Parkiran.findAll({
            where: {
                status: 'available',
                kendaraan: 'Mobil'
            }
        });

        const countAvailableParkir = availableParkir.length; // Hitung jumlah parkir yang tersedia

        res.json({ availableParkir: availableParkir, jumlahParkirTersedia: countAvailableParkir });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server sedang gangguan' });
    }
};
