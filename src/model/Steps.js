const Sequelize = require('sequelize');
const database = require('../config/db');
const recipe = require('./Recipes');

const steps = database.define('Steps', {
    id_steps: {
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

recipe.hasMany(steps, { foreignKey: 'recipe_id' });

module.exports = steps;