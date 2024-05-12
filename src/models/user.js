// models/user.js

const Sequelize = require('sequelize');

const db = require('../config/database');
const Role = require('../models/role');


const User = db.define('users', {
    iduser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    idrole: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: false,
        references: 'roles',
        referencesKey: 'idrole'
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
},
    {
        timestamps: false,
        tableName: 'users',
        underscored: true,
        schema: 'users',
    });


User.belongsTo(Role, {
    foreignKey: {
        name: 'idrole'
    }
});

module.exports = User;