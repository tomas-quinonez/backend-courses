const express = require('express');

const router = express.Router();

const courseController = require('../controllers/courseController');

// Route to get all todos
router.get('/getallcourses', courseController.getAllCourses);

// Route to get all todos
router.get('/getcourses', courseController.getCourses);

// Route to create a new todo
//router.post('/', courseController.createTodo);

// Route to get a todo by ID
//router.get('/:id', courseController.getTodoById);

// Route to update a todo by ID
//router.put('/:id', courseController.updateTodo);

// Route to delete a todo by ID
//router.delete('/:id', courseController.deleteTodo);

module.exports = router;