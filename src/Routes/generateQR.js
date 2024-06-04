const express = require('express');
const router = express.Router();
const generateQR = require('../Controllers/generateQR');

// Endpoint untuk generate QR code parkiran available
router.get('/parkiran/masuk/generate-qr/motor', generateQR.generateQRCodeForAvailableParkingMotor);
router.get('/parkiran/masuk/generate-qr/mobil', generateQR.generateQRCodeForAvailableParkingMobil);


module.exports = router;
