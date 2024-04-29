const Sequelize = require('sequelize');

const db = require('../config/database');

const Platform = db.define('platforms', {
    idplatform: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},
    {
        timestamps: false,
        tableName: 'platforms',
        underscored: true,
        schema: 'courses',
    });


module.exports = Platform;