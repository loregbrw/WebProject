const user = require('../model/Users');
const type = require('../model/Types');
const meal = require('../model/Meals');

module.exports = {
    async pagProfileGet(req, res) {
        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image']
        });

        const user_types = await type.findAll({
            where: {
                user_id: this_user.id_user
            }
        });

        const user_meals = await meal.findAll({
            where: {
                user_id: this_user.id_user
            }
        });

        res.render('../views/profile', { this_user, user_types, user_meals });
    }
}