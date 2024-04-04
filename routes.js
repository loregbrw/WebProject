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
const edit_recipe_type = require('./src/controllers/edit_recipe_type');
const profile = require('./src/controllers/profile');
const calendar = require('./src/controllers/calendar');
const edit_meal = require('./src/controllers/edit_meal');
const day = require('./src/controllers/day');
const edit_profile = require('./src/controllers/edit_profile');
const comunity = require('./src/controllers/comunity');
const add_recipe = require('./src/controllers/add_recipe');


route.get('/', index.pagIndexGet);

route.get('/login', login.pagLoginGet);

route.get('/signup-1', signup_1.pagSignup1Get);
route.post('/signup-1', signup_1.pagSignup1Post);

route.get('/signup-2', signup_2.pagSignup2Get);
route.post('/signup-2', signup_2.pagSignup2Post);

route.get('/signup-3', signup_3.pagSignup3Get);
route.post('/signup-3', signup_3.pagSignup3Post);

route.get('/home', home.pagHomeGet);

route.get('/view-recipes', view_recipes.pagViewRecipesGet);

route.get('/edit-recipes', edit_recipes.pagEditRecipesGet);

route.get('/edit-recipe-type', edit_recipe_type.pagEditRecipeTypeGet);

route.get('/profile', profile.pagProfileGet);

route.get('/calendar', calendar.pagCalendarGet);

route.get('/edit-meal', edit_meal.pagEditMealGet);

route.get('/day', day.pagDayGet);

route.get('/edit-profile', edit_profile.pagEditProfileGet);

route.get('/comunity', comunity.pagComunityGet);

route.get('/add-recipe', add_recipe.pagAddRecipeGet);



// route.post('/login', login.pagLoginPost);

module.exports = route;