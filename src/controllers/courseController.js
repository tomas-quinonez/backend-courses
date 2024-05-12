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

        if (req.body.keywords) {
            courses = filterByKeywords(req.body.keywords, courses);
        }

        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};