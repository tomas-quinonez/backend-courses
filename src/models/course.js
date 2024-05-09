const Sequelize = require('sequelize');

const db = require('../config/database');

const Category = require('../models/category');
const Platform = require('../models/platform');
const Level = require('../models/level');
const Modality = require('../models/modality');

const Course = db.define('courses', {
    idcourse: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    idcategory: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: 'categories',
        referencesKey: 'idcategory'
    },
    idplatform: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    idlevel: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: false,
        references: 'levels',
        referencesKey: 'idlevel'
    },
    idmodality: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: false,
        references: 'modalities',
        referencesKey: 'idmodality'
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

Course.belongsTo(Level, {
    foreignKey: {
        name: 'idlevel'
    }
});

Course.belongsTo(Modality, {
    foreignKey: {
        name: 'idmodality'
    }
});

module.exports = Course;