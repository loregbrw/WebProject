const user = require('../model/Users');
const recipe = require('../model/Recipes');
const follows = require('../model/Follows');

module.exports = {
    async pagHomeGet(req, res) {
        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

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

        res.render('../views/home', { this_user, user_recipes, user_followers, count_recipes });
    }
}
