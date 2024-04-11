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

        // Encontrar o usuário e a receita relacionada
        const this_user = await user.findOne({
            where: {
                username: parametro_user
            }
        });

        const this_recipe = await recipe.findOne({
            where: {
                id_recipe: parametro_recipe
            }
        });

        // Verificar se uma nova imagem foi carregada
        let new_image = this_recipe.image;
        if (req.file) {
            new_image = '/img/' + req.file.filename;
        }

        // Atualizar os campos da receita
        await this_recipe.update({
            name: req.body.recipe_name,
            duration: req.body.recipe_duration,
            portions: req.body.recipe_portions,
            description: req.body.recipe_description,
            image: new_image
        });

        // Excluir todos os ingredientes existentes para esta receita
        await ingredients.destroy({
            where: {
                recipe_id: parametro_recipe
            }
        });

        // Excluir todos os modos de preparo existentes para esta receita
        await steps.destroy({
            where: {
                recipe_id: parametro_recipe
            }
        });

        // Adicionar novos ingredientes
        // Adicionar novos ingredientes
        if (req.body.ingredients && Array.isArray(req.body.ingredients)) {
            for (const ing of req.body.ingredients) {
                // Add a check to ensure ing is not null or undefined
                if (ing && ing.ingredient_description) {
                    await ingredients.create({
                        description: ing.ingredient_description,
                        weight: ing.ingredient_weight,
                        recipe_id: parametro_recipe
                    });
                }
            }
        }


        // Adicionar novos modos de preparo
        if (req.body.steps) {
            for (const st of req.body.steps) {
                await steps.create({
                    description: st.step_description,
                    weight: st.step_weight,
                    recipe_id: parametro_recipe
                });
            }
        }

        // Redirecionar para a página de visualização da receita
        return res.redirect(`/${parametro_user}/view-recipes-${parametro_recipe}`);
    }

}    
