const Sequelize = require('sequelize');
const database = require('../config/db');
const recipe = require('./Recipes');
const user = require('./Users');
const calendar = require('./Calendar');

const recipe_calendar = database.define('Recipe_calendar', {
    id_recipe_calendar: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    recipe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: recipe,
            key: 'id_recipe'
        }
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id_user'
        }
    },
    day: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = recipe_calendar;
