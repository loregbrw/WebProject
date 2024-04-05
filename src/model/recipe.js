const Sequelize = require('sequelize');
const database = require('../config/db');

const recipe = database.define('Recipes', {
    id_recipe: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    duration: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    portions: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    image: {
        type: Sequelize.STRING(15),
    }
});

module.exports = recipe;