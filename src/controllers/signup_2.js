const user = require('../model/user_login');

module.exports = {
    async pagSignup2Get(req, res) {
        res.render('../views/signup_2');
    },

    async pagSignup2Post(req, res) {
        const data = req.body;

        global.completename = data.user_name;
        global.birthdate = data.user_birthdate;

        res.redirect('/signup-3');
    }
}