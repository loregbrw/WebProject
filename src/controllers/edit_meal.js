const user = require('../model/Users');
const meal = require('../model/Meals');

module.exports = {
    async pagEditMealGet(req, res) {
        const parametro_user = req.params.username;
        const parametro_meals = req.params.id_meal;

        const this_user = await user.findOne({
            where: {
                username: parametro_user
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        const this_meal = await meal.findOne({ 
            where: {
                id_meal: parametro_meals
            }
        });

        res.render('../views/edit_meal', {this_user, this_meal});
    },

    async pagEditMealPost(req, res) {
        const parametro_user = req.params.username;
        const parametro_meals = req.params.id_meal;

        const this_user = await user.findOne({
            where: {
                username: parametro_user
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        const this_meal = await meal.findOne({ 
            where: {
                id_meal: parametro_meals
            }
        });

        await this_meal.update({
            name: req.body.meal_name,
            bg_color: req.body.meal_bg_color,
            txt_color: req.body.meal_txt_color,
            time: req.body.meal_time,
            user_id: this_user.id_user,
        });

        return res.redirect(`/${this_user.username}/profile/`);
    }
}