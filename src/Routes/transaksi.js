const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../midleware/authMidleware');
const riwayatController = require('../Controllers/riwayatController');

router.get('/riwayat-transaksi', authenticateToken, riwayatController.getRiwayatTransaksi);

module.exports = router;