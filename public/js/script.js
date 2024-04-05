let recipe = document.getElementById("recipe");

recipe.addEventListener('click', () => {
    return res.redirect(`/home/${existingUser.username}`);
})