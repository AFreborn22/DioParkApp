const express = require('express');
const router = express.Router();
const scanController = require('../Controllers/scanController');
const { authenticateToken } = require('../midleware/authMidleware');
const checkProfileCompletion = require('../midleware/profileMidleware');

// Rute untuk scan QR code masuk
router.post('/diopark/scan-masuk', authenticateToken, checkProfileCompletion, (req, res) => {
    scanController.scanMasukQRCode(req, res);
  });

// Rute untuk scan QR code keluar
router.post('/diopark/scan-keluar', authenticateToken, checkProfileCompletion, (req, res) => {
    scanController.scanKeluarQRCode(req, res);
  });

module.exports = router;
