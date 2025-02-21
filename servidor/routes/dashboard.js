const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');
const { authenticate, authorize } = require('../middleware/authMiddleware')


router.get('/stats', [authenticate, authorize(['admin'])], DashboardController.getDashboardStats);

module.exports = router;