const user = require('../model/Users');
const recipe = require('../model/Recipes');
const type = require('../model/Types');
const recipe_type = require('../model/Recipe_types');
const meal = require('../model/Meals');
const recipe_meal = require('../model/Recipe_meals');
const ingredient = require('../model/Ingredients');
const step = require('../model/Steps');

module.exports = {
    async pagAddRecipeGet(req, res) {

        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        const user_types = await type.findAll({
            where: {
                user_id: this_user.id_user
            }
        });

        const user_meals = await meal.findAll({
            where: {
                user_id: this_user.id_user
            }
        });

        res.render('../views/add_recipe', { this_user, user_types, user_meals });
    },
    async pagAddRecipePost(req, res) {
        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

        const user_types = await type.findAll({
            where: {
                user_id: this_user.id_user
            }
        });

        // Obtém os meals selecionados do corpo da requisição
        const selectedMeals = req.body.meals || [];

        // Obtém os types selecionados do corpo da requisição
        const selectedTypes = req.body.types || [];

        let new_image;

        if (req.file) {
            new_image = '/img/' + req.file.filename;
        } else {
            new_image = '/img/' + 'no-img.jpg';
        }

        const new_recipe = await recipe.create({
            name: req.body.recipe_name,
            duration: req.body.recipe_duration,
            portions: req.body.recipe_portions,
            status: 1,
            description: req.body.recipe_description,
            image: new_image,
            user_id: this_user.id_user,
            favorite: 0
        });

        // Adiciona os meals selecionados à tabela de relacionamento recipe_meal
        if (Array.isArray(selectedMeals)) {
            // Código para processar os meals selecionados
            await Promise.all(selectedMeals.map(async mealId => {
                await recipe_meal.create({
                    recipe_id: new_recipe.id_recipe,
                    meal_id: mealId
                });
            }));
        } else {
            console.error('selectedMeals is not an array');
        }


        if (Array.isArray(selectedTypes)) {
            await Promise.all(selectedTypes.map(async typeId => {
                await recipe_type.create({
                    recipe_id: new_recipe.id_recipe,
                    type_id: typeId
                });
            }));
        }

        return res.redirect(`/${this_user.username}/home`);
    }

}
