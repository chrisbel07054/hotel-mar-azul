const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/roomController')

// Rutas para las habitaciones
router.post('/', RoomController.create);
router.get('/', RoomController.getAll);


module.exports = router;