const user = require('../model/Users');
const type = require('../model/Types');

module.exports = {
    async pagEditRecipeTypeGet(req, res) {
        const parametro_user = req.params.username;
        const parametro_types = req.params.id_type;

        const this_user = await user.findOne({
            where: {
                username: parametro_user
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        const this_type = await type.findOne({ 
            where: {
                id_type: parametro_types
            }
        });

        res.render('../views/edit_recipe_type', {this_user, this_type});
    },

    async pagEditRecipeTypePost(req, res) {
        const parametro_types = req.params.id_type;
        const parametro_user = req.params.username;

        console.log(parametro_user);

        const this_user = await user.findOne({
            where: {
                username: parametro_user
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        const this_type = await type.findOne({ 
            where: {
                id_type: parametro_types
            }
        });

        await this_type.update({
            name: req.body.recipe_type_name,
            bg_color: req.body.recipe_type_bg_color,
            txt_color: req.body.recipe_type_txt_color,
            user_id: this_user.id_user,
        });

        return res.redirect(`/${this_user.username}/profile/`);
    }
}
