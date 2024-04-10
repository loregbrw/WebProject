// const recipe = require('../model/Recipes');

// const deleteButton = document.getElementById("delete-recipe");

// deleteButton.addEventListener('click', async (event) => {
//     event.preventDefault();

//     const response = confirm("Tem certeza que deseja apagar esta receita?");

//     if (response) {
//         await recipe.destroy({ where: { id: this_recipe.id_recipe } }); 
//         window.location.href = `/${this_user.username}/home`;
//     }
// });


// const deleteButton = document.getElementById("delete-recipe");

// deleteButton.addEventListener('click', async () => {
//     const recipe_id = deleteButton.getAttribute("data-recipe-id");
//     const username = deleteButton.getAttribute("data-username");

//     const response = confirm("Tem certeza que deseja apagar esta receita?");

//     if (response) {
//         try {
//             const recipeToDelete = await recipe.findByPk(recipe_id);
//             await recipeToDelete.destroy();
//             window.location.href = `/${username}/home`;
//         } catch (error) {
//             console.error("Erro ao apagar a receita: ", error);
//         }
//     }
// });