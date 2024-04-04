"use strict";

var sequelize = require('sequelize');
var database = new sequelize('Alecrim', 'Alecrim', '123', {
  dialect: 'mssql',
  host: 'localhost',
  port: 1433
});
database.sync();
module.exports = database;