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
    },

    async pagEditRecipeTypePost(req, res) {

        const parametro = req.params.username;

        console.log(parametro);

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        await recipe_type.update({
            name: req.body.recipe_type_name,
            bg_color: req.body.recipe_type_bg_color,
            txt_color: req.body.recipe_type_txt_color,
            user_id: this_user.id_user,
        });

        return res.redirect(`/${this_user.username}/profile/`);
    }
}
