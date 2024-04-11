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
const add_recipe_type = require('./src/controllers/add_recipe_type');
const add_meal = require('./src/controllers/add_meal');

const multer = require('multer');
const multerConfig = require('./src/config/multer');

const recipe = require('./src/model/Recipes');

// const upload = multer(multerConfig);

route.get('/', index.pagIndexGet);

route.get('/login', login.pagLoginGet);
route.post('/login', login.pagLoginPost);

route.get('/signup-1', signup_1.pagSignup1Get);
route.post('/signup-1', signup_1.pagSignup1Post);

route.get('/signup-2', signup_2.pagSignup2Get);
route.post('/signup-2', signup_2.pagSignup2Post);

route.get('/signup-3', signup_3.pagSignup3Get);
route.post('/signup-3', signup_3.pagSignup3Post);

route.get('/:username/home', home.pagHomeGet);
route.post('/:username/home', home.pagHomeGet);

route.get('/:username/view-recipes-:id_recipe', view_recipes.pagViewRecipesGet);
route.post('/:username/view-recipes-:id_recipe', view_recipes.deleteRecipe);

route.get('/:username/edit-recipes-:id_recipe', edit_recipes.pagEditRecipesGet);
route.post('/:username/edit-recipes-:id_recipe', multer(multerConfig).single('recipe_image'), edit_recipes.pagEditRecipePost);

route.get('/:username/edit-recipe-type-:id_type', edit_recipe_type.pagEditRecipeTypeGet);
route.post('/:username/edit-recipe-type-:id_type', edit_recipe_type.pagEditRecipeTypePost);

route.get('/:username/profile', profile.pagProfileGet);

route.get('/:username/calendar', calendar.pagCalendarGet);

route.get('/:username/edit-meal-:id_meal', edit_meal.pagEditMealGet);
route.post('/:username/edit-meal-:id_meal', edit_meal.pagEditMealPost);

route.get('/:username/day/:day-:month-:year', day.pagDayGet);

route.get('/:username/edit-profile', edit_profile.pagEditProfileGet);
route.post('/:username/edit-profile', multer(multerConfig).single('user_image'), edit_profile.pagEditProfilePost);


route.get('/:username/add-recipe/:day-:month-:year', comunity.pagComunityGet);

route.get('/:username/add-recipe', add_recipe.pagAddRecipeGet);
route.post('/:username/add-recipe', multer(multerConfig).single('recipe_image'), add_recipe.pagAddRecipePost);

route.get('/:username/add-recipe-type', add_recipe_type.pagAddRecipeTypeGet);
route.post('/:username/add-recipe-type', add_recipe_type.pagAddRecipeTypePost);

route.get('/:username/add-meal', add_meal.pagAddMealGet);
route.post('/:username/add-meal', add_meal.pagAddMealPost);

route.put('/api/recipes/:id_recipe/favorite', async (req, res) => {
    const idRecipe = req.params.id_recipe;
    const { favorite } = req.body;

    try {
        // Encontre a receita no banco de dados
        const thisRecipe = await recipe.findByPk(idRecipe);
        
        // Inverta o valor da propriedade `favorite`
        thisRecipe.favorite = !thisRecipe.favorite;
        
        // Salve as alterações no banco de dados
        await thisRecipe.save();

        res.json({ favorite: thisRecipe.favorite }); // Retorna o novo valor `favorite`
    } catch (error) {
        console.error('Failed to update favorite status:', error);
        res.status(500).json({ error: 'Failed to update favorite status' });
    }
});


module.exports = route;