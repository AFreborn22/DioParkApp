const express = require('express');
const router = express.Router();
const parkirController = require('../Controllers/parkirAvaible');

// Route untuk mendapatkan parkir yang tersedia
router.get('/', parkirController.getAvailableParkir);

module.exports = router;
