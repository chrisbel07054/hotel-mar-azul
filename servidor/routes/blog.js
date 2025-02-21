const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController')

// Rutas blog
router.post('/', BlogController.create);
router.get('/', BlogController.getAll);


module.exports = router;