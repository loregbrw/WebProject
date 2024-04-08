const user = require('../model/Users');
const recipe = require('../model/Recipes');

module.exports = {
    async pagProfileGet(req, res) {
        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image']
        });

        const user_recipes = await recipe.findAll({
            where: {
                user_id: this_user.id_user
            }
        });

        res.render('../views/profile', { this_user, user_recipes });
    }
}