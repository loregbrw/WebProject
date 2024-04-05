const Sequelize = require('sequelize');
const database = require('../config/db');

const calendar = database.define('Calendar', {
    id_calendar: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    day: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    weekday: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = calendar;