const { Sequelize } = require('sequelize');
const user = require('../model/Users');

module.exports = {
    async pagLoginGet(req, res) {
        res.render('../views/login');
    },

    async pagLoginPost(req, res) {
        const data = req.body;
        console.log(data.user_email_username);
    
        const existingUser = await user.findOne({ 
            where: {
                [Sequelize.Op.or]: [
                    { username: data.user_email_username },
                    { email: data.user_email_username }
                ]
            } 
        });


        if (!existingUser) {
            return res.status(400).json({ error: 'Usuário não encontrado.' });
        }
    
        if (data.user_password != existingUser.password) {
            console.log(existingUser);
            console.log(existingUser.password);
            console.log(data.password);

            return res.status(400).json({ error: 'Senha incorreta.' });
        }
    
        return res.redirect(`/home/${existingUser.username}`);
    }
}