const user = require('../model/Users');

module.exports = {
    async pagEditRecipeTypeGet(req, res) {
        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        res.render('../views/edit_recipe_type', {this_user});
    }
}
