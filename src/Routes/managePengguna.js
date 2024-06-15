const express = require('express');
const router = express.Router();
const manageUser = require('../Controllers/manageUser');

// Route untuk mendapatkan parkir yang tersedia
router.get('/pengguna/all', manageUser.getAllPengguna);
router.post('/pengguna/add', manageUser.createNewPengguna);
router.delete('/pengguna/delete', manageUser.deletePengguna);


module.exports = router;
