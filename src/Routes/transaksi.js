const express = require('express');
const router = express.Router();
const riwayatController = require('../Controllers/riwayatController');

router.get('/riwayat-transaksi', riwayatController.getRiwayatTransaksi);

module.exports = router;