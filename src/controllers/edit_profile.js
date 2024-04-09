const user = require('../model/Users');

module.exports = {
    async pagEditProfileGet(req, res) {
        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

        res.render('../views/edit_profile', {this_user});
    },
    async pagEditProfilePost(req, res) {

        const data = req.body;
        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

        let new_image;

        console.log(req.file);
        console.log(req.body.recipe_image);

        if (req.file) {
            new_image = '/img/' + req.file.filename;
            console.log(new_image);
        } else {
            new_image = this_user.image;
        }

        await this_user.update({
            name: data.user_name,
            description: data.user_description,
            email: data.user_email,
            birthdate: data.user_birthdate,
            image: new_image
        });

        return res.redirect(`/${this_user.username}/profile`);
    }
}