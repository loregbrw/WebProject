const Sequelize = require('sequelize');
const database = require('../config/db');
const recipe = require('./Recipes');
const user_calendar = require('./User_calendar');

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
    user_calendar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user_calendar,
            key: 'id_user_calendar'
        }
    }
});

recipe.belongsToMany(user_calendar, { through: recipe_calendar, foreignKey: 'recipe_id' });
user_calendar.belongsToMany(recipe, { through: recipe_calendar, foreignKey: 'user_calendar_id' });


module.exports = recipe_calendar;