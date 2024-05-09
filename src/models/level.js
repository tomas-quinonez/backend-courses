const Sequelize = require('sequelize');

const db = require('../config/database');

const Level = db.define('levels', {
    idlevel: {
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
        tableName: 'levels',
        underscored: true,
        schema: 'courses',
    });


module.exports = Level;