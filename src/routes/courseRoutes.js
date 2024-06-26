const express = require('express');

const router = express.Router();

const courseController = require('../controllers/courseController');

// Obtener todos los cursos
router.get('/getallcourses', courseController.getAllCourses);

// Obtener cursos a partir de filtros
router.post('/getcourses', courseController.getCourses);

// Obtener cursos a partir de un texto de entrada
router.post('/getcoursesbyText', courseController.getCoursesByText);

module.exports = router;