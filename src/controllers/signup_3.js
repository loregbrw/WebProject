const user = require('../model/user_login');

module.exports = {
    async pagSignup3Get(req, res) {
        res.render('../views/signup_3');
    },

    async pagSignup3Post(req, res) {
        console.log(completename);

        await user.create({
            name: completename,
            email: email,
            password: password,
            birthdate: birthdate,
            username: username,
            image: "/img/user-img.jpeg"
        });

        return res.redirect(`/home/${existingUser.username}`);
    }
}