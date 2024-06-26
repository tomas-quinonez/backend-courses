// controllers/levelController.js

const Level = require('../models/level');

exports.getAllLevels = async (req, res) => {
    try {
        const levels = await Level.findAll({
            attributes: ['description']
        });
        res.json(levels);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};