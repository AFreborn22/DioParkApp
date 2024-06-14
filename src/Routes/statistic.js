const express = require('express');
const router = express.Router();
const statistic = require('../Controllers/statistic'); 

router.get('/transaksi', statistic.getStatTransaksi);

module.exports = router;