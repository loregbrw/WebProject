// Adicione um ouvinte de eventos de clique aos botões de estrela
const starButtons = document.querySelectorAll('.star-btn');

starButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const recipeId = button.dataset.recipeId;
        
        try {
            const response = await fetch(`/api/recipes/${recipeId}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ favorite: true }) // Envie o estado da receita como favorita
            });

            if (response.ok) {
                // Se a solicitação for bem-sucedida, atualize a aparência do botão de estrela
                button.classList.add('favorite'); // Adicione uma classe para indicar que a receita é favorita
                // Atualize a imagem do botão de estrela para indicar que a receita é favorita
                button.innerHTML = '<img src="/img/star-icon-filled.png" alt="">';
            } else {
                console.error('Erro ao marcar a receita como favorita');
            }
        } catch (error) {
            console.error('Erro ao marcar a receita como favorita:', error);
        }
    });
});
