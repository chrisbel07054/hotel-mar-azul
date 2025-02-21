const express = require('express');
const router = express.Router();
const ContactMessageController = require('../controllers/contactMessageController')

// Rutas para los mensajes de contacto
router.post('/', ContactMessageController.create);
router.get('/', ContactMessageController.getAll);


module.exports = router;