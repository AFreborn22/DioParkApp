const Parkiran = require('../Models/parkiran');

exports.getAvailableParkir = async (req, res) => {
    try {
        const availableParkir = await Parkiran.findAll({
            where: {
                status: 'available'
            }
        });

        const countAvailableParkir = availableParkir.length; // Hitung jumlah parkir yang tersedia

        res.json({ availableParkir: availableParkir, jumlahParkirTersedia: countAvailableParkir });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
