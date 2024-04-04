document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const url = form.action;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                window.location.href = '/signup-2'; // Redireciona para a próxima página
            } else {
                const responseData = await response.json();
                alert(responseData.error); // Exibe a mensagem de erro em um popup
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde.');
        }
    });
});
