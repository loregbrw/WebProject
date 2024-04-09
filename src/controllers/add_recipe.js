// const multer = require('multer');

const user = require('../model/Users');
const recipe = require('../model/Recipes');

module.exports = {
    async pagAddRecipeGet(req, res) {

        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        res.render('../views/add_recipe', {this_user});
    },
    async pagAddRecipePost(req, res) {

        const parametro = req.params.username;

        console.log(parametro);

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        let new_image;

        console.log(req.file);
        console.log(req.body.recipe_image);

        if (req.body.recipe_image) {
            new_image = '/img/' + req.body.recipe_image;
            console.log(new_image);
        } else {
            new_image = '/img/' + 'no-img.jpg';
        }

        await recipe.create({
            name: req.body.recipe_name,
            duration: req.body.recipe_duration,
            portions: req.body.recipe_portions,
            status: 1,
            description: req.body.recipe_description,
            image: new_image,
            user_id: this_user.id_user,
            favorite: 0
        });

        return res.redirect(`/${this_user.username}/home`);
    }
}
