const express = require('express');
const route = express.Router();

const index = require('./src/controllers/index');
const login = require('./src/controllers/login');
const signup_1 = require('./src/controllers/signup_1');
const signup_2 = require('./src/controllers/signup_2');
const signup_3 = require('./src/controllers/signup_3');
const home = require('./src/controllers/home');
const view_recipes = require('./src/controllers/view_recipes');
const edit_recipes = require('./src/controllers/edit_recipes');
const profile = require('./src/controllers/profile');
const calendar = require('./src/controllers/calendar');

route.get('/', index.pagIndexGet);

route.get('/login', login.pagLoginGet);

route.get('/signup-1', signup_1.pagSignup1Get);

route.get('/signup-2', signup_2.pagSignup2Get);

route.get('/signup-3', signup_3.pagSignup3Get);

route.get('/home', home.pagHomeGet);

route.get('/view-recipes', view_recipes.pagViewRecipesGet);

route.get('/edit-recipes', edit_recipes.pagEditRecipesGet);

route.get('/profile', profile.pagProfileGet);

route.get('/calendar', calendar.pagCalendarGet);


// route.post('/login', login.pagLoginPost);

module.exports = route;