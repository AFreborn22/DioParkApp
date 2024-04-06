const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const { authenticateToken } = require('../midleware/authMidleware');

// Endpoint untuk update akun
router.put('/update', authenticateToken, authController.updateAccount);

module.exports = router;
