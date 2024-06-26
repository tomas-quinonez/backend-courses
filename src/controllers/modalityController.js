// controllers/modalityController.js

const Modality = require('../models/modality');

exports.getAllModalities = async (req, res) => {
    try {
        const modalities = await Modality.findAll({
            attributes: ['description']
        });
        res.json(modalities);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};