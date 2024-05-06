const Sequelize = require('sequelize');

const db = require('../config/database');

const Category = require('../models/category');
const Platform = require('../models/platform');

const Course = db.define('courses', {
    idcourse: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    idcategory: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: 'categories',
        referencesKey: 'idcategory'
    },
    idplatform: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: 'platforms',
        referencesKey: 'idplatform'
    },
    code: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    level: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    modality: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    idpath: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: false,
        references: 'learningpaths',
        referencesKey: 'idpath'
    },
},
    {
        timestamps: false,
        tableName: 'courses',
        underscored: true,
        schema: 'courses',
    });


Course.belongsTo(Category, {
    foreignKey: {
        name: 'idcategory'
    }
});

Course.belongsTo(Platform, {
    foreignKey: {
        name: 'idplatform'
    }
});

module.exports = Course;