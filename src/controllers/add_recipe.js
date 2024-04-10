const user = require('../model/Users');
const recipe = require('../model/Recipes');
const type = require('../model/Types');
const meal = require('../model/Meals');
const ingredient = require('../model/Ingredients');
const step = require('../model/Steps');

module.exports = {
    async pagAddRecipeGet(req, res) {

        const parametro = req.params.username;
        const parametro_types = req.params.id_type;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        const this_type = await type.findOne({ 
            where: {
                id_type: parametro_types
            }
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

        res.render('../views/add_recipe', {this_user, this_type, user_types, user_meals});
    },
    async pagAddRecipePost(req, res) {

        const parametro = req.params.username;

        console.log(parametro);

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

       let new_image;

        console.log(req.file);
        console.log(req.body.recipe_image);

        if (req.file) {
            new_image = '/img/' + req.file.filename;
            console.log(new_image);
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

        

        const ingredients = req.body.ingredients;
        if (ingredients && ingredients.length > 0) {
            const ingredientPromises = ingredients.map(async (ing) => {
                await ingredient.create({
                    description: ing.ingredient_description,
                    weight: ing.ingredient_weight,
                    recipe_id: new_recipe.id_recipe
                });
            });

            await Promise.all(ingredientPromises);
        }

        const steps = req.body.steps;
        if (steps && steps.length > 0) {
            const ingredientPromises = steps.map(async (st) => {
                await step.create({
                    description: st.step_description,
                    weight: st.step_weight,
                    recipe_id: new_recipe.id_recipe
                });
            });

            await Promise.all(ingredientPromises);
        }

        return res.redirect(`/${this_user.username}/home`);
    }
}
