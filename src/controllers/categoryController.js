// controllers/categoryController.js

const Category = require('../models/category');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: ['name', 'description']
        });
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};