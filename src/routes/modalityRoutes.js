const express = require('express');

const router = express.Router();

const modalityController = require('../controllers/modalityController');

// Obtener todas las modalidades
router.get('/getallmodalities', modalityController.getAllModalities);

module.exports = router;