const Course = require('../models/todo');

// Controller method to get all todos
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Course.findAll();
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller method to create a new todo
exports.createTodo = async (req, res) => {
    const { task, createdDate, percentCompleted, isCompleted } = req.body;
    try {
        const newTodo = await Course.create({
            task,
            createdDate,
            percentCompleted,
            isCompleted,
        });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller method to get a todo by ID
exports.getTodoById = async (req, res) => {
    const id = req.params.id;
    try {
        const todo = await Course.findByPk(id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller method to update a todo by ID
exports.updateTodo = async (req, res) => {
    const id = req.params.id;
    const { task, createdDate, percentCompleted, isCompleted } = req.body;
    try {
        const todo = await Course.findByPk(id);
        if (todo) {
            todo.task = task;
            todo.createdDate = createdDate;
            todo.percentCompleted = percentCompleted;
            todo.isCompleted = isCompleted;
            await todo.save();
            res.json(todo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller method to delete a todo by ID
exports.deleteTodo = async (req, res) => {
    const id = req.params.id;
    try {
        const todo = await Course.findByPk(id);
        if (todo) {
            await todo.destroy();
            res.json(todo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};