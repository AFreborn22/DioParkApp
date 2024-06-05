const express = require('express');
const router = express.Router();
const scanController = require('../Controllers/scanController');

// Rute untuk scan QR code masuk
router.post('/diopark/scan-masuk', (req, res) => {
    scanController.scanMasukQRCode(req, res);
  });

// Rute untuk scan QR code keluar
router.post('/diopark/scan-keluar', (req, res) => {
    scanController.scanKeluarQRCode(req, res);
  });

module.exports = router;
