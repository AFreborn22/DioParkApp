const express = require('express');
const router = express.Router();
const generateQR = require('../Controllers/generateQR');

// Endpoint untuk generate QR code parkiran available
router.get('/generate-qr/motor', generateQR.generateQRCodeForAvailableParkingMotor);
router.get('/generate-qr/mobil', generateQR.generateQRCodeForAvailableParkingMobil);


module.exports = router;
