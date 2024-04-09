const user = require('../model/Users');

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

module.exports = {
    async pagCalendarGet(req, res) {
        const parametro = req.params.username;
        
        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

        const today = getToday();
        console.log(today);
        const month_num = getThisMonth(today);
        const month_name = getMonthName(month_num);
        const year = getThisYear(today);

        res.render('../views/calendar', { this_user, today, month_num, month_name, year });
    }
}
