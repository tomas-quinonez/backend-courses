const Course = require('../models/course');
const Category = require('../models/category');
const Platform = require('../models/platform');
const { Op } = require('sequelize');

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

exports.getCourses = async (req, res) => {
    try {
        const queries = {};

        if (req.body.idcategory) {
            queries['idcategory'] = req.body.idcategory;
        }
        if (req.body.idplatform) {
            queries['idplatform'] = req.body.idplatform;
        }
        if (req.body.duration) {
            queries['duration'] = { [Op.lte]: req.body.duration };
        }
        if (req.body.cost) {
            queries['cost'] = { [Op.lte]: req.body.cost };
        }
        if (req.body.level) {
            queries['level'] = req.body.level;
        }
        if (req.body.modality) {
            queries['modality'] = req.body.modality;
        }

        const courses = await Course.findAll({
            attributes: ['code', 'name', 'description', 'duration', 'cost', 'level', 'modality'],
            where: queries,
            include: [{
                model: Category,
                attributes: ['name', 'description']
            }, {
                model: Platform,
                attributes: ['name', 'description']
            }]
        });

        res.json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};