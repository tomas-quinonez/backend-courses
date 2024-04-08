const Sequelize = require('sequelize');

const db = require('../config/database');

const Course = db.define('courses', {
    idcourse: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    code: {
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.STRING,
    },
},
    {
        timestamps: false,
        tableName: 'courses',
        underscored: true,
        schema: 'courses',
    });


module.exports = Course;