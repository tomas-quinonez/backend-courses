const Sequelize = require('sequelize');

module.exports = new Sequelize('courses_db', 'postgres', 'admin', {
    host: 'postgres',
    port: '5432',
    dialect: 'postgres', // Change to your database type
});