const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../midleware/authMidleware');
const authController = require('../Controllers/authController'); 

router.put('/profile/update', authenticateToken, authController.updateProfile);
router.get('/profile/show', authenticateToken, authController.getDataUser);

module.exports = router;
