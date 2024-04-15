const sequelize = require('sequelize');

const database = new sequelize('Alecrim', 'Alecrim', '123',
    {
        dialect: 'mssql', host: 'localhost', port: 50753
    });
    
database.sync();
module.exports = database;