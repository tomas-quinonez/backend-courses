const Sequelize = require('sequelize');

const db = require('../config/database');

const Category = db.define('categories', {
    idcategory: {
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
        tableName: 'categories',
        underscored: true,
        schema: 'courses',
    });


module.exports = Category;