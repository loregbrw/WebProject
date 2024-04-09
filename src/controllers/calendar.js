function today() {
    const today = new Date();

    return today;
}

function thisMonth() {
    const today = new Date();
    const month = today.getMonth();

    return month;
}

function thisYear() {
    const today = new Date();
    const year = today.getFullYear() - birth.getFullYear();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}

module.exports = {
    async pagCalendarGet(req, res) {
        res.render('../views/calendar');
    }
}