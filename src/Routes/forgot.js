const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../Controllers/forgotPassword');

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
