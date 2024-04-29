const Sequelize = require('sequelize');

const db = require('../config/database');

const Learningpath = db.define('learningpaths', {
    idpath: {
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
        tableName: 'learningpaths',
        underscored: true,
        schema: 'courses',
    });


module.exports = Learningpath;