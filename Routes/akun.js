const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Midleware/authMidleware');
const authController = require('../Controllers/authController'); 

router.put('/update', authenticateToken, authController.updateProfile);

module.exports = router;
