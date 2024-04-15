const user = require('../model/Users');
const recipe = require('../model/Recipes');
const recipe_calendar = require('../model/Recipes_calendar');
const calendar = require('../model/Calendar');
const { link } = require('../../routes');
const { Sequelize } = require('sequelize');

module.exports = {
    async pagComunityGet(req, res) {
        const parametro_user = req.params.username;
        const parametro_day = req.params.day;
        const parametro_month = req.params.month;
        const parametro_year = req.params.year;

        const link_date = `${parametro_day}-${parametro_month}-${parametro_year}`;

        const this_user = await user.findOne({
            where: {
                username: parametro_user
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

        const user_recipes = await recipe.findAll({
            where: {
                user_id: this_user.id_user
            }
        });

        res.render('../views/comunity', { this_user, user_recipes, link_date });
    },
    async pagComunityPost(req, res) {
        const parametro_user = req.params.username;
        const parametro_day = req.params.day;
        const parametro_month = req.params.month;
        const parametro_year = req.params.year;
    
        const this_recipe_id = req.body.recipe_id;
    
        const this_user = await user.findOne({
            where: {
                username: parametro_user
            }
        });
    
        const selected_date = `${parametro_year}-${parametro_month}-${parametro_day}`;
    
        console.log(this_recipe_id);
        console.log(this_user.id_user);
        console.log(selected_date);
    
        try {
            const result = await recipe_calendar.create({
                recipe_id: this_recipe_id,
                user_id: this_user.id_user,
                day: selected_date
            });
    
            // Redirecionar de volta para a página do dia com os parâmetros de data originais
            return res.redirect(`/${this_user.username}/day/${parametro_day}-${parametro_month}-${parametro_year}`);
        } catch (error) {
            console.error('Erro ao adicionar receita ao calendário:', error);
            res.status(500).send('Ocorreu um erro ao adicionar a receita ao calendário.');
        }
    }
    
}