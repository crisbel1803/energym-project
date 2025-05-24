const formularioDisciplina = document.querySelector('#form-disciplina');
const user = JSON.parse(localStorage.getItem('user'));
const notificacion = document.querySelector('.notificacion');
const listadoDisciplinas = document.querySelector('#cont-disciplinas');
listadoDisciplinas.addEventListener('click', confirmarEliminar);
document.addEventListener('DOMContentLoaded', mostrarDisciplinas);

//validar inicio de sesión
if (!user) {
    window.location.href = '/';
}

formularioDisciplina.addEventListener('submit', validarDisciplina);

async function validarDisciplina(e) {
    e.preventDefault();

    const nombreDisciplina = document.querySelector('#nombre-disciplina').value;
    const descripcionDisciplina = document.querySelector('#descripcion-disciplina').value;
    const duracionDisciplina = document.querySelector('#duracion-disciplina').value;
    const nivelDisciplina = document.querySelector('#nivel-disciplina').value;
    const statusDisciplina = document.querySelector('#status-disciplina').value;
    const imagenDisciplinaInput = document.querySelector('#imagen-disciplina');
    const imagenDisciplinaFile = imagenDisciplinaInput.files[0];

    const disciplinaData = {
        nombreDisciplina,
        descripcionDisciplina,
        duracionDisciplina,
        nivelDisciplina,
        statusDisciplina,
    };

    if (validar(disciplinaData)) {
        notificacion.innerHTML = 'Todos los campos son obligatorios';
        notificacion.classList.remove('hidden', 'text-green-600');
        notificacion.classList.add('block', 'text-red-600');

        setTimeout(() => {
            notificacion.classList.remove('block');
            notificacion.classList.add('hidden');
        }, 2000);
        return;
    }

    let nombreImagen = '';

    if (imagenDisciplinaFile) {
        const formData = new FormData();
        formData.append('disciplineImage', imagenDisciplinaFile);

        try {
            const response = await axios.post('/api/disciplinas/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                nombreImagen = response.data.filename;
                console.log('Imagen subida con éxito:', nombreImagen);
            } else {
                console.error('Error al subir la imagen:', response.data.message);
                notificacion.innerHTML = 'Error al subir la imagen. Inténtalo de nuevo.';
                notificacion.classList.remove('hidden', 'text-green-600');
                notificacion.classList.add('block', 'text-red-600');
                setTimeout(() => {
                    notificacion.classList.remove('block');
                    notificacion.classList.add('hidden');
                }, 2000);
                return;
            }
        } catch (error) {
            console.error('Error en la solicitud de subida de imagen:', error);
            notificacion.innerHTML = 'Error de red al subir la imagen.';
            notificacion.classList.remove('hidden', 'text-green-600');
            notificacion.classList.add('block', 'text-red-600');
            setTimeout(() => {
                notificacion.classList.remove('block');
                notificacion.classList.add('hidden');
            }, 2000);
            return;
        }
    }

    try {
        const disciplina = await axios.post('/api/disciplinas', {
            nombre: nombreDisciplina,
            descripcion: descripcionDisciplina,
            duracion: duracionDisciplina,
            nivel: nivelDisciplina,
            status: statusDisciplina,
            imagen: nombreImagen 
        });
        console.log(disciplina);
        window.location.href = "/panel-administrador";
    } catch (error) {
        console.error('Error al guardar la disciplina:', error);
        notificacion.innerHTML = 'Error al guardar la disciplina. Inténtalo de nuevo.';
        notificacion.classList.remove('hidden', 'text-green-600');
        notificacion.classList.add('block', 'text-red-600');
        setTimeout(() => {
            notificacion.classList.remove('block');
            notificacion.classList.add('hidden');
        }, 2000);
    }
}

function validar(obj) {
    return !Object.values(obj).every(i => i !== '');
}

async function mostrarDisciplinas() {
    try {
        const disciplinas = await axios.get('/api/disciplinas/lista-disciplinas');
        const arrayDisciplinas = disciplinas.data.data;

        while (listadoDisciplinas.firstChild) {
            listadoDisciplinas.removeChild(listadoDisciplinas.firstChild);
        }

       arrayDisciplinas.forEach(i => {
            const { id, nombre, descripcion, duracion, nivel, status, imagen } = i;
            const card = document.createElement('div');

            card.innerHTML = `
                <div class="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out bg-white flex flex-col h-full">
                    ${imagen ? `
                        <div class="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                            <img src="/data/uploads/${imagen}" alt="Imagen de ${nombre}" class="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <span class="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${status === 'activa' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} capitalize">
                                ${status}
                            </span>
                        </div>
                    ` : `
                        <div class="relative w-full h-48 sm:h-56 md:h-64 bg-gray-200 flex items-center justify-center">
                            <p class="text-gray-500 text-lg">Sin imagen</p>
                            <span class="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${status === 'activa' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} capitalize">
                                ${status}
                            </span>
                        </div>
                    `}

                    <div class="p-6 flex-grow">
                        <h3 class="text-3xl font-bold mb-3 text-gray-800">${nombre}</h3>
                        <p class="mb-2 text-gray-600"><strong class="font-semibold mr-1.5 text-gray-700">Descripción:</strong> ${descripcion}</p>
                        <p class="mb-2 text-gray-600"><strong class="font-semibold mr-1.5 text-gray-700">Duración:</strong> ${duracion} minutos</p>
                        <p class="mb-2 capitalize text-gray-600"><strong class="font-semibold mr-1.5 text-gray-700">Nivel:</strong> ${nivel}</p>
                    </div>

                    <div class="py-4 px-6 flex flex-row gap-4 justify-end border-t border-gray-100 bg-gray-50">
                        <a href="editar-disciplina.html?id=${id}" class="text-blue-600 hover:text-blue-800 transition-colors duration-200" title="Editar Disciplina">
                            <i class="fa-solid fa-pencil text-lg"></i>
                        </a>
                        <a href="#" class="text-red-600 hover:text-red-800 transition-colors duration-200" title="Eliminar Disciplina">
                            <i id="${id}" class="fa-solid fa-trash eliminar text-lg"></i>
                        </a>
                    </div>
                </div>
            `;

            card.classList.add('w-full', 'mb-4');

            listadoDisciplinas.appendChild(card);
        });
    } catch (error) {
        console.error('Error al obtener las disciplinas:', error);
    }
}

async function confirmarEliminar(e) {
    if (e.target.classList.contains('eliminar')) {
        const confirmar = confirm('¿Desea eliminar esta disciplina?');
        if (confirmar) {
            const id = e.target.id;
            console.log(id);
            try {
                const response = await axios.post('/api/disciplinas/eliminar', { id });
                console.log(response.data);
                while (listadoDisciplinas.firstChild) {
                    listadoDisciplinas.removeChild(listadoDisciplinas.firstChild);
                }
                mostrarDisciplinas();
            } catch (error) {
                console.error('Error al eliminar la disciplina:', error);
            }
        }
    }
}
