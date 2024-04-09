const user = require('../model/Users');
const meal = require('../model/Meals');

module.exports = {
    async pagAddMealGet(req, res) {
        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        res.render('../views/add_meal', {this_user});
    },

    async pagAddMealPost(req, res) {

        const parametro = req.params.username;

        console.log(parametro);

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        await meal.create({
            name: req.body.meal_name,
            bg_color: req.body.meal_bg_color,
            txt_color: req.body.meal_txt_color,
            time: req.body.meal_time,
            user_id: this_user.id_user,
        });

        return res.redirect(`/${this_user.username}/profile/`);
    }
}