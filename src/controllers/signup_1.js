const user = require('../model/user_login');

module.exports = {
    async pagSignup1Get(req, res) {
        res.render('../views/signup_1');
    },

    async pagSignup1Post(req, res) {
        const data = req.body;

        await user.create ({
            email: data.user_email,
            username: data.user_username,
            password: data.user_password,
        });
    }
}