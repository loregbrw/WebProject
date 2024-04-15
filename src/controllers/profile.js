const Sequelize = require('sequelize');
const user = require('../model/Users');
const type = require('../model/Types');
const meal = require('../model/Meals');
const follows = require('../model/Follows');
const recipe = require('../model/Recipes');
const recipe_calendar = require('../model/Recipes_calendar');

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}

async function mostRecipe(userId) {
    const today = new Date();
    const month_first_day = new Date(today.getFullYear(), today.getMonth(), 1);
    const month_last_day = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Selecionar todos os registros da tabela Recipe_calendar para o usuário e o mês atual
    const consumed_recipe_calendar = await recipe_calendar.findAll({
        where: {
            user_id: userId,
            day: {
                [Sequelize.Op.between]: [month_first_day, month_last_day]
            }
        }
    });

    // Contar a ocorrência de cada receita para esse usuário e nesse mês
    const count_recipe = {};
    consumed_recipe_calendar.forEach(entry => {
        const recipe_id = entry.recipe_id;
        if (count_recipe[recipe_id]) {
            count_recipe[recipe_id]++;
        } else {
            count_recipe[recipe_id] = 1;
        }
    });

    // Identificar a receita com o maior número de ocorrências
    let most_recipe;
    let most_count = 0;
    for (const recipeId in count_recipe) {
        if (count_recipe[recipeId] > most_count) {
            most_count = count_recipe[recipeId];
            most_recipe = recipeId;
        }
    }

    // Retornar os detalhes dessa receita
    if (most_recipe) {
        const recipe_details = await recipe.findByPk(most_recipe);
        return recipe_details.name;
    } else {
        return "Nenhuma receita";
    }
}



module.exports = {
    async pagProfileGet(req, res) {
        const parametro = req.params.username;

        const this_user = await user.findOne({
            where: {
                username: parametro
            },
            attributes: ['id_user', 'name', 'email', 'password', 'birthdate', 'username', 'image', 'description']

        });

        const this_user_age = calculateAge(this_user.birthdate);
        const most_recipe = await mostRecipe(this_user.id_user);

        const user_types = await type.findAll({
            where: {
                user_id: this_user.id_user
            }
        });

        const user_meals = await meal.findAll({
            where: {
                user_id: this_user.id_user
            }
        });
        
        const user_followers = await follows.count({
            where: {
                following_id: this_user.id_user
            }
        });

        res.render('../views/profile', { this_user, user_types, user_meals, this_user_age, user_followers, most_recipe });
    }
}