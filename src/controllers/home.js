const user = require('../model/user_login');

module.exports = {
    async pagHomeGet(req, res) {
        const parametro = req.params.username;

        const this_user = await user.findOne({ 
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image']
        });

        res.render('../views/home', {this_user});
    }
}