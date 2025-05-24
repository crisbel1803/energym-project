const formularioDisciplina = document.querySelector('#form-disciplina');
const notificacion = document.querySelector('.notificacion');
const user = JSON.parse(localStorage.getItem('user'));

const nombreDisciplinaInput = document.querySelector('#nombre-disciplina');
const descripcionDisciplinaInput = document.querySelector('#descripcion-disciplina');
const duracionDisciplinaInput = document.querySelector('#duracion-disciplina');
const nivelDisciplinaSelect = document.querySelector('#nivel-disciplina');
const statusDisciplinaSelect = document.querySelector('#status-disciplina');
const imgDiscUploadInput = document.querySelector('#imagen-disciplina-upload');
const contImagenAct = document.querySelector('#cont-img-act');

let disciplinaId;
let nombreDiscAct = '';

if (!user) {
    window.location.href = '/';
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    disciplinaId = urlParams.get('id');

    if (disciplinaId) {
        cargarDisciplina(disciplinaId);
    } else {
        mostrarNotificacion('No se encontró el ID de la disciplina.', 'error');
    }
});

formularioDisciplina.addEventListener('submit', validarYActDisciplina);

async function cargarDisciplina(id) {
    try {
        const response = await axios.get(`/api/disciplinas/disciplina?id=${id}`);
        const disciplina = response.data.data;

        if (disciplina) {
            nombreDisciplinaInput.value = disciplina.nombre;
            descripcionDisciplinaInput.value = disciplina.descripcion;
            duracionDisciplinaInput.value = disciplina.duracion;
            nivelDisciplinaSelect.value = disciplina.nivel;
            statusDisciplinaSelect.value = disciplina.status;

            if (disciplina.imagen) {
                nombreDiscAct = disciplina.imagen;
                const imgElement = document.createElement('img');
                imgElement.src = `/data/uploads/${disciplina.imagen}`;
                imgElement.alt = `Imagen de ${disciplina.nombre}`;
                imgElement.classList.add('w-full', 'h-48', 'object-cover', 'rounded-md', 'mb-2');
                contImagenAct.innerHTML = '';
                contImagenAct.appendChild(imgElement);
            } else {
                contImagenAct.innerHTML = '<p class="text-gray-500">No hay imagen actual.</p>';
            }
        } else {
            mostrarNotificacion('Disciplina no encontrada.', 'error');
        }
    } catch (error) {
        console.error('Error al cargar la disciplina:', error);
        mostrarNotificacion('Error al cargar la disciplina. Inténtalo de nuevo.', 'error');
    }
}

async function validarYActDisciplina(e) {
    e.preventDefault();

    const nombre = nombreDisciplinaInput.value;
    const descripcion = descripcionDisciplinaInput.value;
    const duracion = duracionDisciplinaInput.value;
    const nivel = nivelDisciplinaSelect.value;
    const status = statusDisciplinaSelect.value;
    const nuevaImgFile = imgDiscUploadInput.files[0];

    const disciplinaData = {
        nombre,
        descripcion,
        duracion,
        nivel,
        status,
    };

    if (validar(disciplinaData)) {
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
        return;
    }

    let imgaAct = nombreDiscAct;

    if (nuevaImgFile) {
        const formData = new FormData();
        formData.append('disciplineImage', nuevaImgFile);

        try {
            const response = await axios.post('/api/disciplinas/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                imgaAct = response.data.filename; 
                mostrarNotificacion('Nueva imagen subida con éxito.', 'success');
            } else {
                mostrarNotificacion('Error al subir la nueva imagen. Inténtalo de nuevo.', 'error');
                console.error('Error al subir la imagen:', response.data.message);
                return;
            }
        } catch (error) {
            mostrarNotificacion('Error de red al subir la imagen.', 'error');
            console.error('Error en la solicitud de subida de imagen:', error);
            return;
        }
    }

    try {
        const response = await axios.post('/api/disciplinas/actualizar', {
            id: disciplinaId,
            nombre,
            descripcion,
            duracion,
            nivel,
            status,
            imagen: imgaAct 
        });

        if (response.status === 200) {
            mostrarNotificacion('Disciplina actualizada con éxito!', 'success');
            setTimeout(() => {
                window.location.href = "/panel-administrador";
            }, 1500);
        } else {
            mostrarNotificacion('Error al actualizar la disciplina.', 'error');
            console.error('Respuesta del servidor al actualizar:', response.data);
        }
    } catch (error) {
        mostrarNotificacion('Error al actualizar la disciplina. Inténtalo de nuevo.', 'error');
        console.error('Error en la solicitud de actualización de disciplina:', error);
    }
}

function validar(obj) {
    return !Object.values(obj).every(i => i !== '' && i !== null); 
}

function mostrarNotificacion(mensaje, tipo) {
    notificacion.innerHTML = mensaje;
    notificacion.classList.remove('hidden', 'text-green-600', 'text-red-600');
    notificacion.classList.add('block');

    if (tipo === 'success') {
        notificacion.classList.add('text-green-600');
    } else if (tipo === 'error') {
        notificacion.classList.add('text-red-600');
    }

    setTimeout(() => {
        notificacion.classList.remove('block', 'text-green-600', 'text-red-600');
        notificacion.classList.add('hidden');
    }, 3000);
}
