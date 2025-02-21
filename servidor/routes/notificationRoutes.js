const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController')


router.post('/subscription-blog', NotificationController.subscriptionNotification);

module.exports = router;
