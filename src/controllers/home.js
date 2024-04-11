const user = require('../model/Users');
const recipe = require('../model/Recipes');
const follows = require('../model/Follows');
const recipe_type = require('../model/Recipe_types');
const recipe_meal = require('../model/Recipe_meals');

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

        // const user_recipe_types = await recipe_type.count({
        //     where: {
        //         user_id: this_user.id_user
        //     }
        // });

        // const user_recipe_meals = await recipe_meal.count({
        //     where: {
        //         user_id: this_user.id_user
        //     }
        // });

        res.render('../views/home', { this_user, user_recipes, user_followers, count_recipes, today, format_today });
    }
}
