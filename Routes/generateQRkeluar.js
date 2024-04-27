const express = require('express');
const router = express.Router();
const generateQRkeluar = require('../Controllers/generateQRkeluar');

// Endpoint untuk generate QR code parkiran available
router.post('/generate-qr/exit', generateQRkeluar.generateQRCodeForExitParking);


module.exports = router;
