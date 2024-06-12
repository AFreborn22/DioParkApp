const express = require('express');
const router = express.Router();
const scanController = require('../Controllers/scanController');

// Rute untuk scan QR code masuk
router.post('/scan-masuk', (req, res) => {
    scanController.scanMasukQRCode(req, res);
  });

// Rute untuk scan QR code keluar
router.post('/scan-keluar', (req, res) => {
    scanController.scanKeluarQRCode(req, res);
  });

module.exports = router;
