const express = require('express');
const router = express.Router();
const parkiranController = require('../Controllers/manageParkir');
// const { checkAdminAuth } = require('../midleware/authAdmin');

// router.use(checkAdminAuth);

router.get('/realtime', parkiranController.getAllParkiranRealtime);
router.get('/search/:blok_parkir', parkiranController.getPenggunaByBlokParkir);
router.get('/', parkiranController.getAllParkiran);
router.post('/create', parkiranController.createParkiran);
router.put('/:blok_parkir', parkiranController.updateParkiran);
router.delete('/:blok_parkir', parkiranController.deleteParkiran);

module.exports = router;
