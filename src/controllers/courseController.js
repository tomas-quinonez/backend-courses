const Course = require('../models/course');

// Controller method to get all todos
exports.getAllCourses = async (req, res) => {
    try {
        const todos = await Course.findAll();
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};