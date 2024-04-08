const express = require('express');
const router = express.Router();
const scanController = require('../Controllers/scanController');
const { authenticateToken } = require('../Midleware/authMidleware');
const checkProfileCompletion = require('../Midleware/profileMidleware');

// Rute untuk pemindaian QR code masuk
router.post('/scan-masuk', authenticateToken, checkProfileCompletion, (req, res) => {
    scanController.scanMasukQRCode(req, res);
  });

// Rute untuk pemindaian QR code keluar
router.post('/scan-keluar', authenticateToken, checkProfileCompletion, (req, res) => {
    scanController.scanKeluarQRCode(req, res);
  });

module.exports = router;
