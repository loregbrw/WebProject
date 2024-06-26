const user = require('../model/Users');
const recipe = require('../model/Recipes');
const ingredients = require('../model/Ingredients');
const steps = require('../model/Steps');
const { raw } = require('express');
const { where } = require('sequelize');

module.exports = {
    async pagViewRecipesGet(req, res) {
        const parametro_user = req.params.username;
        const parametro_recipe = req.params.id_recipe;

        const this_recipe = await recipe.findOne({
            where: {
                id_recipe: parametro_recipe
            },
            attributes: ['id_recipe', 'name', 'duration', 'portions', 'status', 'description', 'image', 'favorite', 'user_id']
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

        res.render('../views/view_recipes', { this_recipe, count_recipes, this_user, this_ingredients, this_steps });
    },

    async deleteRecipe(req, res) {
        const parametro_recipe = req.params.id_recipe;
        const parametro_user = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro_user
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

        await recipe.destroy({
            raw:true,
            where: { id_recipe: parametro_recipe }
        });
        
        return res.redirect(`/${this_user.username}/home`);
    }
}