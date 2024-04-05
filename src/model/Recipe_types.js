const Sequelize = require('sequelize');
const database = require('../config/db');
const recipe = require('./Recipes');
const type = require('./Types');

const recipe_type = database.define('Recipe_types', {
    id_recipe_type: {
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
    type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: type,
            key: 'id_type'
        }
    }
});

recipe.belongsToMany(type, { through: recipe_type, foreignKey: 'recipe_id' });
type.belongsToMany(recipe, { through: recipe_type, foreignKey: 'type_id' });


module.exports = recipe_type;