const Sequelize = require('sequelize');
const database = require('../config/db');
const meal = require('./Meals');
const calendar = require('./Calendar');

const meal_calendar = database.define('Meal_calendar', {
    id_meal_calendar: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    meal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: meal,
            key: 'id_meal'
        }
    },
    calendar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: calendar,
            key: 'id_calendar'
        }
    }
});

meal.belongsToMany(calendar, { through: meal_calendar, foreignKey: 'meal_id' });
calendar.belongsToMany(meal, { through: meal_calendar, foreignKey: 'calendar_id' });


module.exports = meal_calendar;