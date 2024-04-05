const Sequelize = require('sequelize');
const database = require('../config/db');
const user = require('./Users');

const meal = database.define('Meals', {
    id_meal: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    bg_color: {
        type: Sequelize.STRING(7),
        allowNull: false,
    },
    txt_color: {
        type: Sequelize.STRING(7),
        allowNull: false,
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id_user'
        }
    }
});

user.hasMany(meal, { foreignKey: 'user_id' });

module.exports = meal;