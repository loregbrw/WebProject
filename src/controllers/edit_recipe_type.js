const user = require('../model/Users');
const type = require('../model/Types');

module.exports = {
    async pagEditRecipeTypeGet(req, res) {
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

        res.render('../views/edit_recipe_type', {this_user, user_types});
    }
}
