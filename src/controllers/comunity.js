const user = require('../model/Users');

module.exports = {
    async pagComunityGet(req, res) {
        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        res.render('../views/comunity', {this_user});
    }
}