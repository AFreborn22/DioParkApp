const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController'); 

router.put('/update', authController.updateProfile);
router.get('/show', authController.getDataUser);

module.exports = router;