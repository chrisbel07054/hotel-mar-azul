const express = require('express');
const router = express.Router();
const ClimaController = require('../controllers/ClimaController');

router.get('/clima-ciudad', ClimaController.getWeather);

module.exports = router;
