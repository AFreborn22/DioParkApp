const express = require('express');
const router = express.Router();
const parkirController = require('../Controllers/parkirAvaible');

// Route untuk mendapatkan parkir yang tersedia
router.get('/motor', parkirController.getAvailableParkirMotor);
router.get('/mobil', parkirController.getAvailableParkirMobil);


module.exports = router;
