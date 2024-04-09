const Sequelize = require('sequelize');
const database = require('../config/db');
const user = require('./Users');
const calendar = require('./Calendar');

const user_calendar = database.define('User_calendar', {
    id_user_calendar: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id_user'
        }
    },
    calendar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: calendar,
            key: 'id_calendar'
        }
    }
});

user.belongsToMany(calendar, { through: user_calendar, foreignKey: 'user_id' });
calendar.belongsToMany(user, { through: user_calendar, foreignKey: 'calendar_id' });


module.exports = user_calendar;