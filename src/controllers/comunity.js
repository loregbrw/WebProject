const user = require('../model/Users');
const recipe = require('../model/Recipes');
const recipe_calendar = require('../model/Recipes_calendar');
const calendar = require('../model/Calendar');
const { link } = require('../../routes');
const { Sequelize } = require('sequelize');

function linkDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

module.exports = {
    async pagComunityGet(req, res) {
        const parametro_user = req.params.username;
        const parametro_day = req.params.day;
        const parametro_month = req.params.month;
        const parametro_year = req.params.year;

        const selected_date = new Date(`${parametro_year}-${parametro_month}-${parametro_day}`);
        const link_date = linkDate(selected_date);

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
    
        const selected_date = new Date(`${parametro_year}-${parametro_month}-${parametro_day}`);
    
        const this_date = await calendar.findOne({
            where: {
                day: `${parametro_year}-${parametro_month}-${parametro_day}`
            }
        });
        
        
        
    
        console.log(this_recipe_id);
        console.log(this_user.id_user);
        console.log(this_date.id_calendar);
    
        try {
            const result = await recipe_calendar.create({
                recipe_id: this_recipe_id,
                user_id: this_user.id_user,
                calendar_id: this_date.id_calendar
            });
    
            // Redirecionar de volta para a página do dia com os parâmetros de data originais
            return res.redirect(`/${this_user.username}/day/${parametro_day}-${parametro_month}-${parametro_year}`);
        } catch (error) {
            console.error('Erro ao adicionar receita ao calendário:', error);
            res.status(500).send('Ocorreu um erro ao adicionar a receita ao calendário.');
        }
    }
    
}