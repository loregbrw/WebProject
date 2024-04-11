const user = require('../model/Users');
const recipe = require('../model/Recipes');
const follows = require('../model/Follows');
const type = require('../model/Types');
const recipe_type = require('../model/Recipe_types');
const recipe_meal = require('../model/Recipe_meals');

const Sequelize = require('sequelize');
const database = require('../config/db');
const calendar = require('../model/Calendar');
const { link } = require('../../routes');
const meal = require('../model/Meals');



function getToday() {
    return new Date();
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
}

function linkDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
async function addDataForCurrentMonth() {
    const today = getToday();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Note que getMonth() retorna de 0 a 11

    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Itera sobre todos os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(currentYear, currentMonth - 1, day); // Note que o mês é baseado em zero
        const weekday = currentDate.getDay(); // Dia da semana (0 para domingo, 1 para segunda, etc.)

        // Insere um registro no banco de dados para o dia atual, se ainda não existir
        await calendar.findOrCreate({
            where: { day: currentDate },
            defaults: { weekday: weekday }
        });
    }

    console.log(`Dados para todos os dias do mês ${currentMonth}/${currentYear} foram adicionados.`);
}

module.exports = {
    async pagHomeGet(req, res) {
        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']
        });

        today = getToday();
        format_today = formatDate(today);
        link_today = linkDate(today);

        const user_recipes = await recipe.findAll({
            where: {
                user_id: this_user.id_user
            }
        });

        const count_recipes = await recipe.count({
            where: {
                user_id: this_user.id_user
            }
        });

        const user_followers = await follows.count({
            where: {
                following_id: this_user.id_user
            }
        });

        const user_recipe_types = [];
        const user_recipe_meals = [];

        for (const recipe of user_recipes) {
            console.log('Recipe ID:', recipe.id_recipe);

            const types = await recipe_type.findAll({
                where: {
                    recipe_id: recipe.id_recipe
                }
            })
            console.log('Types:', types);
            user_recipe_types.push(types);

            const meals = await recipe_meal.findAll({
                where: {
                    recipe_id: recipe.id_recipe
                }
            });
            console.log('Meals:', meals);
            user_recipe_meals.push(meals);
        }


        // Chamada da função para adicionar os dados
        addDataForCurrentMonth();

        res.render('../views/home', { this_user, user_recipes, user_followers, count_recipes, today: format_today, link_today, user_recipe_types, user_recipe_meals });
    }
}
