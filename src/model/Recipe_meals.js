const Sequelize = require('sequelize');
const database = require('../config/db');
const recipe = require('./Recipes');
const meal = require('./Meals');

const recipe_meal = database.define('Recipe_types', {
    id_recipe_meal: {
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
    meal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: meal,
            key: 'id_meal'
        }
    }
});

recipe.belongsToMany(meal, { through: recipe_meal, foreignKey: 'recipe_id' });
meal.belongsToMany(recipe, { through: recipe_meal, foreignKey: 'meal_id' });


module.exports = recipe_meal;