document.addEventListener('DOMContentLoaded', () => {
    const formCont = document.getElementById('formCont');
    const formMsj = document.getElementById('formMsj');

    if (formCont) {
        formCont.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(formCont);
            const data = Object.fromEntries(formData.entries());

            formMsj.textContent = 'Enviando mensaje...';
            formMsj.className = 'mt-4 text-center text-sm font-semibold text-gray-600';

            try {
                const response = await fetch('https://energym-project.onrender.com/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    formMsj.textContent = result.message;
                    formMsj.className = 'mt-4 text-center text-sm font-semibold text-verde';
                    formCont.reset();
                } else {
                    formMsj.textContent = result.message || 'Ocurrió un error al enviar el mensaje.';
                    formMsj.className = 'mt-4 text-center text-sm font-semibold text-red-500';
                }
            } catch (error) {
                console.error('Error de red o del servidor:', error);
                formMsj.textContent = 'No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.';
                formMsj.className = 'mt-4 text-center text-sm font-semibold text-red-500';
            }
        });
    }
});