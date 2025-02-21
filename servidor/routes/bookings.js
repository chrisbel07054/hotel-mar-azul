const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController')
const { authenticate, authorize } = require('../middleware/authMiddleware')

// Rutas para las reservas
router.post('/', [authenticate, authorize(['user'])], BookingController.create); // Los administradores no pueden hacer reservas.
router.get('/:id', [authenticate, authorize(['user'])], BookingController.getByUser);
router.put('/:id', [authenticate, authorize(['user'])], BookingController.update);
router.delete('/:id', [authenticate, authorize(['user'])], BookingController.delete);

module.exports = router;








