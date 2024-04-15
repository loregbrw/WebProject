const user = require('../model/Users');
const recipe_calendar = require('../model/Recipes_calendar');
const calendar = require('../model/Calendar');
const recipes = require('../model/Recipes');



module.exports = {
    async pagDayGet(req, res) {
        const parametro_user = req.params.username;
        const parametro_day = req.params.day;
        const parametro_month = req.params.month;
        const parametro_year = req.params.year;

        const selected_date = `${parametro_year}-${parametro_month}-${parametro_day}`;
        const formatted_date = `${parametro_day}/${parametro_month}`;
        const link_date = `${parametro_day}-${parametro_month}-${parametro_year}`;

        const recipes_day = await recipe_calendar.findAll({
            where: {
                day: selected_date
            }
        });

        const this_user = await user.findOne({
            where: {
                username: parametro_user
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

        let recipes_all = [];

        if (!recipes_day) {
            // Se não houver entrada no calendário para a data fornecida, lidar com isso aqui
            return res.render('../views/day', { this_user, formatted_date, recipes: recipes_all, link_date });

        }


        // Extrair os IDs das receitas do resultado de recipes_day
        const recipe_ids = recipes_day.map(recipe => recipe.recipe_id);

        // Consultar todas as receitas cujos IDs estão na lista de IDs de receitas
        recipes_all = await recipes.findAll({
            where: {
                id_recipe: recipe_ids,
                user_id: this_user.id_user
            }
        });


        // Convertendo o objeto SequelizeInstance em um array de objetos JavaScript simples
        // const recipes_all = recipes_day.map(recipe => recipe.toJSON());

        console.log("AAA RECIPES ALL: ", recipes_all);

        res.render('../views/day', { this_user, formatted_date, recipes: recipes_all, link_date });
    }
}