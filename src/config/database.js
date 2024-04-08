const Sequelize = require('sequelize');

module.exports = new Sequelize('courses_db', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres', // Change to your database type
});