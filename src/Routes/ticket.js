const express = require('express');
const router = express.Router();
const ticketing = require('../Controllers/ticketing'); 

router.get('/ticket', ticketing.getTicket);

module.exports = router;