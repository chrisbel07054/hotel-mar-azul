const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonialController');
const { authenticate, authorize } = require('../middleware/authMiddleware')


// Rutas para los testimonios
router.post('/', [authenticate, authorize(['user'])], TestimonialController.create);
router.get('/', TestimonialController.getAll);


module.exports = router;