module.exports = {
    async pagViewRecipesGet(req, res) {
        // const parametro = req.params.recipe;

        // const this_recipe = await user.findOne({ 
        //     where: {
        //         id_recipe: parametro
        //     },
        //     attributes: ['id_recipe', 'duration', 'portions', 'status', 'description', 'image']
        // });

        res.render('../views/view_recipes');
    }
}