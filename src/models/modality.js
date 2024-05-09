const Sequelize = require('sequelize');

const db = require('../config/database');

const Modality = db.define('modalities', {
    idmodality: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},
    {
        timestamps: false,
        tableName: 'modalities',
        underscored: true,
        schema: 'courses',
    });


module.exports = Modality;