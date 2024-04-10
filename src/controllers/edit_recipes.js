const user = require('../model/Users');
const recipe = require('../model/Recipes');
const ingredients = require('../model/Ingredients');
const steps = require('../model/Steps');

module.exports = {
    async pagEditRecipesGet(req, res) {
        const parametro_user = req.params.username;
        const parametro_recipe = req.params.id_recipe;

        const this_recipe = await recipe.findOne({
            where: {
                id_recipe: parametro_recipe
            },
            attributes: ['id_recipe', 'name', 'duration', 'portions', 'status', 'description', 'image']
        });

        const this_user = await user.findOne({
            where: {
                username: parametro_user
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

        const this_ingredients = await ingredients.findAll({
            where: {
                recipe_id: parametro_recipe
            },
            order: [
                ['weight', 'ASC']
            ]
        });

        const this_steps = await steps.findAll({
            where: {
                recipe_id: parametro_recipe
            },
            order: [
                ['weight', 'ASC']
            ]
        });

        const count_recipes = await recipe.count({
            where: {
                user_id: this_user.id_user
            }
        });

        res.render('../views/edit_recipes', { this_recipe, count_recipes, this_user, this_ingredients, this_steps });
    },

    async pagEditRecipePost(req, res) {
        const parametro_user = req.params.username;
        const parametro_recipe = req.params.id_recipe;

        const this_user = await user.findOne({
            where: {
                username: parametro_user
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

        const this_recipe = await recipe.findOne({
            where: {
                id_recipe: parametro_recipe
            },
        });

        let new_image;

        if (req.file) {
            new_image = '/img/' + req.file.filename;
            console.log(new_image);
        } else {
            new_image = this_recipe.image;
        }

        await this_recipe.update({
            name: req.body.recipe_name,
            duration: req.body.recipe_duration,
            portions: req.body.recipe_portions,
            status: 1,
            description: req.body.recipe_description,
            image: new_image,
            favorite: 0
        });

        const ingredientsToUpdate = req.body.ingredients;
        if (ingredientsToUpdate && ingredientsToUpdate.length > 0) {
            await Promise.all(ingredientsToUpdate.map(async (ing) => {
                const ingredient = await ingredients.findByPk(ing.id_ingredients);
                if (ingredient) {
                    await ingredient.update({
                        description: ing.ingredient_description,
                        weight: ing.ingredient_weight,
                    });
                }
            }));
        }

        const stepsToUpdate = req.body.steps;
        if (stepsToUpdate && stepsToUpdate.length > 0) {
            await Promise.all(stepsToUpdate.map(async (st) => {
                const step = await steps.findByPk(st.id_steps);
                if (step) {
                    await step.update({
                        description: st.step_description,
                        weight: st.step_weight,
                    });
                }
            }));
        }

        return res.redirect(`/${this_user.username}/view-recipes-${this_recipe.id_recipe}`);
    }


}
