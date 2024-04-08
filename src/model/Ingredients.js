const Sequelize = require('sequelize');
const database = require('../config/db');
const recipe = require('./Recipes');

const ingredients = database.define('Ingredients', {
    id_ingredients: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING(255),
    },
    weight: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    recipe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: recipe,
            key: 'id_recipe'
        }
    }
});

recipe.hasMany(ingredients, { foreignKey: 'recipe_id' });

module.exports = ingredients;