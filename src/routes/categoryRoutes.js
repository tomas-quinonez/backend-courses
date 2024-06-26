const express = require('express');

const router = express.Router();

const categoryController = require('../controllers/categoryController');

// Obtener todas las categorias
router.get('/getallcategories', categoryController.getAllCategories);

module.exports = router;