const express = require('express');
const router = express.Router();
const { generateQRCodeForAvailableParking } = require('../Controllers/generateQR');

// Endpoint untuk generate QR code parkiran available
router.get('/generate-qr', generateQRCodeForAvailableParking);

module.exports = router;
