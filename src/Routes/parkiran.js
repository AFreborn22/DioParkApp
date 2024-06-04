const express = require('express');
const router = express.Router();
const parkiranController = require('../Controllers/manageParkir');
const { checkAdminAuth } = require('../midleware/authAdmin');

router.use(checkAdminAuth);

router.get('/admin/parkiran/realtime', parkiranController.getAllParkiranRealtime);
router.get('/admin/parkiran/search/:blok_parkir', parkiranController.getPenggunaByBlokParkir);
router.get('/admin/parkiran', parkiranController.getAllParkiran);
router.post('/admin/parkiran/create', parkiranController.createParkiran);
router.put('/admin/parkiran/:blok_parkir', parkiranController.updateParkiran);
router.delete('/admin/parkiran/:blok_parkir', parkiranController.deleteParkiran);

module.exports = router;
