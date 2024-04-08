const Sequelize = require('sequelize');
const database = require('../config/db');
const user = require('./Users');

const recipe = database.define('Recipes', {
    id_recipe: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
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
        type: Sequelize.TEXT,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id_user'
        }
    },
    favorite: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = recipe;