const Sequelize = require('sequelize');
const database = require('../config/db');
const user = require('./Users');

const type = database.define('Types', {
    id_type: {
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
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id_user'
        }
    }
});

user.hasMany(type, { foreignKey: 'user_id' });

module.exports = type;