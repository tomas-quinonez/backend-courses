const express = require('express');

const router = express.Router();

const todoController = require('../controllers/todoController');

// Route to get all todos
router.get('/', todoController.getAllTodos);

// Route to create a new todo
router.post('/', todoController.createTodo);

// Route to get a todo by ID
router.get('/:id', todoController.getTodoById);

// Route to update a todo by ID
router.put('/:id', todoController.updateTodo);

// Route to delete a todo by ID
router.delete('/:id', todoController.deleteTodo);

module.exports = router;