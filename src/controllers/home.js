const user = require('../model/Users');
const recipe = require('../model/Recipes');
const follows = require('../model/Follows');
const type = require('../model/Types');
const recipe_type = require('../model/Recipe_types');
const recipe_meal = require('../model/Recipe_meals');
const meal = require('../model/Meals');



function getToday() {
    return new Date();
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
}

module.exports = {
    async pagHomeGet(req, res) {
        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

        today = getToday();
        format_today = formatDate(today);

        const user_recipes = await recipe.findAll({
            where: {
                user_id: this_user.id_user
            }
        });

        const count_recipes = await recipe.count({
            where: {
                user_id: this_user.id_user
            }
        });

        const user_followers = await follows.count({
            where: {
                following_id: this_user.id_user
            }
        });

        const user_recipe_types = [];
        const user_recipe_meals = [];

        for (const recipe of user_recipes) {
            console.log('Recipe ID:', recipe.id_recipe);

            const types = await recipe_type.findAll({
                where: {
                    recipe_id: recipe.id_recipe
                }
            })
            console.log('Types:', types);
            user_recipe_types.push(types);

            const meals = await recipe_meal.findAll({
                where: {
                    recipe_id: recipe.id_recipe
                }
            });
            console.log('Meals:', meals);
            user_recipe_meals.push(meals);
        }

        // const these_types = [];
        // const these_meals = [];

        // for (const type of user_recipe_types) {
        //     console.log('Type ID:', type.type_id);

        //     const this_type = await type.findAll({
        //         where: {
        //             type_id: type.id_type
        //         }
        //     })
        //     these_types.push(this_type);
        // }

        // for (const meal of user_recipe_meals) {
        //     console.log('Meal ID:', meal.meal_id);

        //     const this_meal = await meal.findAll({
        //         where: {
        //             meal_id: meal.id_meal
        //         }
        //     })
        //     these_meals.push(this_meal);
        // }

        res.render('../views/home', { this_user, user_recipes, user_followers, count_recipes, today, format_today, user_recipe_types, user_recipe_meals });
    }
}
