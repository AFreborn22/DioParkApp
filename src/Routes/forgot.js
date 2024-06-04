const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../Controllers/forgotPassword');

router.post('/password/forgot-password', forgotPassword);
router.post('/password/reset-password', resetPassword);

module.exports = router;
