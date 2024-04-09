let recipe = document.getElementById("recipe");

recipe.addEventListener('click', () => {
    return res.redirect(`/${existingUser.username}/home`);
})


recipe = document.querySelector("recipe");

recipe.addEventListener('click', () => {
    return res.redirect(`/${recipe.username}`);
})