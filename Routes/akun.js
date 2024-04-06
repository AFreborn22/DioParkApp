const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Midleware/authMidleware');
const authController = require('../Controllers/authController'); 

// Endpoint untuk update profil
router.put('/update', authenticateToken, authController.updateProfile);

module.exports = router;
