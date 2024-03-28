const express = require('express');
const route = express.Router();

const home = require('./src/controllers/home');
const login = require('./src/controllers/login');
const signup_1 = require('./src/controllers/signup_1');
const signup_2 = require('./src/controllers/signup_2');
const signup_3 = require('./src/controllers/signup_3');

route.get('/', home.pagInicialGet);

route.get('/login', login.pagLoginGet);

route.get('/signup-1', signup_1.pagSignup1Get);

route.get('/signup-2', signup_2.pagSignup2Get);

route.get('/signup-3', signup_3.pagSignup3Get);
// route.post('/login', login.pagLoginPost);

module.exports = route;