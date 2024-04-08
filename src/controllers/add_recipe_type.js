const user = require('../model/Users');
const recipe_type = require('../model/Types');

module.exports = {
    async pagAddRecipeTypeGet(req, res) {
        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image']
        });

        res.render('../views/add_recipe_type', {this_user});
    },

    async pagAddRecipeTypePost(req, res) {

        const parametro = req.params.username;

        console.log(parametro);

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image']
        });

        await recipe_type.create({
            name: req.body.recipe_type_name,
            bg_color: req.body.recipe_type_bg_color,
            txt_color: req.body.recipe_type_txt_color,
            user_id: this_user.id_user,
        });

        return res.redirect(`/${this_user.username}/profile/`);
    }
}