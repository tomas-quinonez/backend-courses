// controllers/courseController.js

const Course = require('../models/course');
const Category = require('../models/category');
const Platform = require('../models/platform');
const Level = require('../models/level');
const Modality = require('../models/modality');
const User = require('../models/user');
const { Op } = require('sequelize');
const { leven } = require('@nlpjs/similarity');
const { exec } = require('child_process');

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

exports.getPrueba = async (req, res) => {
    text = 'Este es un texto de pueba sobre un curso de inteligencia artifial';

    try {
        await exec('python3 /usr/src/app/python/get_similarities.py', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return res.status(500).send(`Error: ${error.message}`);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return res.status(500).send(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            var courses = JSON.parse(stdout);
            
            //res.send(stdout); 
            res.status(200).json(courses);
        }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};