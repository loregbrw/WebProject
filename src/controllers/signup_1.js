const { Sequelize } = require('sequelize');
const user = require('../model/user_login');

module.exports = {
    async pagSignup1Get(req, res) {
        res.render('../views/signup_1');
    },

    async pagSignup1Post(req, res) {
        const data = req.body;
    
        console.log(data.user_username);
        console.log(data.user_email);
        console.log(data.user_password);
        console.log(data.confirm_password);
    
        if (data.user_password !== data.confirm_password) {
            return res.status(400).json({ error: 'As senhas não correspondem!' });
        }
    
        const existingUser = await user.findOne({ 
            where: {
                [Sequelize.Op.or]: [
                    { username: data.user_username },
                    { email: data.user_email }
                ]
            } 
        });
    
        if (existingUser) {
            if (existingUser.username === data.user_username) {
                return res.status(400).json({ error: 'Este usuário já está em uso!' });
            } else {
                return res.status(400).json({ error: 'Este e-mail já está em uso!' });
            }
        }
    
        global.email = data.user_email;
        global.username = data.user_username;
        global.password = data.user_password;
    
        res.redirect('/signup-2');
    }
    
}