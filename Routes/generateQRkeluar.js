const express = require('express');
const router = express.Router();
const generateQRkeluar = require('../Controllers/generateQRkeluar');

// Endpoint untuk generate QR code parkiran available
router.get('/generate-qr/motor', generateQRkeluar.generateQRCodeForExitParkingMotor);
router.get('/generate-qr/mobil', generateQRkeluar.generateQRCodeForExitParkingMobil);


module.exports = router;
