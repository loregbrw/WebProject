const Sequelize = require('sequelize');
const database = require('../config/db');
const user = require('./Users');

const follow = database.define('Follows', {
    id_follows: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    follower_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id_user'
        }
    },
    following_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id_user'
        }
    }
});

user.hasMany(follow, { foreignKey: 'follower_id' });
user.hasMany(follow, { foreignKey: 'following_id' });
follow.belongsTo(user, { foreignKey: 'follower_id', as: 'follower' });
follow.belongsTo(user, { foreignKey: 'following_id', as: 'following' });

module.exports = follow;