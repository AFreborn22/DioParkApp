const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/authAdmin');

router.post('/auth/admin/login', adminController.adminLogin);

module.exports = router;
