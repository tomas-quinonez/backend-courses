// models/role.js

const Sequelize = require('sequelize');

const db = require('../config/database');

const Role = db.define('roles', {
    idrole: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},
    {
        timestamps: false,
        tableName: 'roles',
        underscored: true,
        schema: 'users',
    });


module.exports = Role;