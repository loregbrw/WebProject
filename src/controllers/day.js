const user = require('../model/Users');
const recipe_calendar = require('../model/Recipes_calendar');
const calendar = require('../model/Calendar');

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
}

function linkDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}


module.exports = {
    async pagDayGet(req, res) {
        const parametro_user = req.params.username;
        const parametro_day = req.params.day;
        const parametro_month = req.params.month;
        const parametro_year = req.params.year;

        const selected_date = new Date(`${parametro_year}-${parametro_month}-${parametro_day}`);
        const formatted_date = formatDate(selected_date);
        const link_date = linkDate(selected_date);

        const this_date = await calendar.findOne({
            where: {
                day: selected_date
            }
        });

        if (!this_date) {
            // Se não houver entrada no calendário para a data fornecida, lidar com isso aqui
            return res.status(404).send('Nenhum dado encontrado para esta data.');
        }

        const recipes_day = await recipe_calendar.findAll({
            where: {
                calendar_id: this_date.id_calendar
            }
        });

        const this_user = await user.findOne({
            where: {
                username: parametro_user
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

        res.render('../views/day', {this_user, formatted_date, recipes_day, link_date});
    }
}