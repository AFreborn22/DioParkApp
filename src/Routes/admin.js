const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/authAdmin');

router.post('/login', adminController.adminLogin);

module.exports = router;
