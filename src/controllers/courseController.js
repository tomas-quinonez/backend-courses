// controllers/courseController.js

const Course = require('../models/course');
const Category = require('../models/category');
const Platform = require('../models/platform');
const Level = require('../models/level');
const Modality = require('../models/modality');
const User = require('../models/user');
const { Op } = require('sequelize');
const { leven } = require('@nlpjs/similarity');

function filterByKeywords(keywords, courses) {
    filteredCourses = [];
    keywords = keywords.map(k => k.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));

    courses.forEach(function (course) {
        nameWords = course.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').concat();
        descriptionWords = course.description.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(' ');
        words = nameWords.concat(descriptionWords);

        wordsLoop:
        for (i = 0; i < words.length; i++) {
            for (j = 0; j < keywords.length; j++) {
                if (leven(keywords[j], words[i]) <= 3) {
                    console.log(keywords[j] + ' ' + words[i] + ' ' + leven(keywords[j], words[i]));
                    filteredCourses.push(course);
                    break wordsLoop;
                }
            }
        }
    });

    return filteredCourses;
}

exports.getAllCourses = async (req, res) => {
    try {
        const todos = await Course.findAll();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const queries = {};

        if (req.query.idcategory) {
            queries['idcategory'] = req.query.idcategory;
        }
        if (req.query.idplatform) {
            queries['idplatform'] = req.query.idplatform;
        }
        if (req.query.duration) {
            queries['duration'] = { [Op.lte]: req.query.duration };
        }
        if (req.query.cost) {
            queries['cost'] = { [Op.lte]: req.query.cost };
        }
        if (req.query.level) {
            queries['level'] = req.query.level;
        }
        if (req.query.modality) {
            queries['modality'] = req.query.modality;
        }

        var courses = await Course.findAll({
            attributes: ['name', 'description', 'duration', 'cost'],
            where: queries,
            include: [{
                model: Category,
                attributes: ['name', 'description']
            }, {
                model: Platform,
                attributes: ['name', 'description']
            }, {
                model: Level,
                attributes: ['description']
            }, {
                model: Modality,
                attributes: ['description']
            }]
        });

        if (req.query.keywords) {
            courses = filterByKeywords(req.query.keywords, courses);
        }

        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
};