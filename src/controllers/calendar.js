const user = require('../model/Users');
const user_calendar = require('../model/User_calendar');
const calendar = require('../model/Calendar');


function getToday() {
    return new Date();
}

function getThisMonth(date) {
    return date.getMonth() + 1;
}

function getMonthName(month_index) {
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return months[month_index - 1];
}

function getThisYear(date) {
    return date.getFullYear();
}

function getDateDay(date){
    return date.getDate();
}

module.exports = {
    async pagCalendarGet(req, res) {
        const parametro = req.params.username;
        const parametro_day = req.params.id_calendar;
        
        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

        const this_calendar = await calendar.findAll({
            where: {
                day: parametro_day
            }
        });

        const this_user_calendar = await user_calendar.findOne({
            where: {
                calendar_id: this_calendar.id_calendar
            }
        });


        const today = getToday();
        console.log(today);
        const month_num = getThisMonth(today);
        const month_name = getMonthName(month_num);
        const year = getThisYear(today);

        const this_day = getDateDay(this_user_calendar);
        const this_month = getThisMonth(this_user_calendar);
        const this_year = getThisYear(this_user_calendar);

        res.render('../views/calendar', { this_user, today, month_num, month_name, year, this_day, this_month, this_year });
    }
}
