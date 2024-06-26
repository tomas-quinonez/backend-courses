const express = require('express');

const router = express.Router();

const levelController = require('../controllers/levelController');

// Obtener todos los niveles
router.get('/getalllevels', levelController.getAllLevels);

module.exports = router;