const Sequelize = require('sequelize');
const database = require('../config/db');

const user = database.define('User', {
    id_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    birthdate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
    },
    image: {
        type: Sequelize.STRING(255)
    }
});

module.exports = user;