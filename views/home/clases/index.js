document.addEventListener('DOMContentLoaded', cargarDisc);

const listadoDisciplinas = document.querySelector('#listaDisciplinas');
const noDisciplinasMsj = document.querySelector('#noDisciplinasMsj');
const notificacion = document.querySelector('.notificacion'); 

const filtroStatusSelect = document.querySelector('#filtro-status');
const filtroNivelSelect = document.querySelector('#filtro-nivel');

let arrayDisciplinas = [];

async function cargarDisc() {
    console.log('Cargando disciplinas');
    try {
        const response = await axios.get('/api/disciplinas/lista-disciplinas');
        arrayDisciplinas = response.data.data; 
        console.log(arrayDisciplinas);

        mostrarDisciplinas(arrayDisciplinas);

        filtroStatusSelect.addEventListener('change', aplicarFiltros);
        filtroNivelSelect.addEventListener('change', aplicarFiltros);

    } catch (error) {
        console.error("Error obteniendo disciplinas:", error);
        mostrarNotificacion('Error al cargar las disciplinas. Inténtalo de nuevo.', 'error', notificacion);
        noDisciplinasMsj.classList.remove('hidden');
    }
}

function aplicarFiltros() {
    const statusSeleccionado = filtroStatusSelect.value;
    const nivelSeleccionado = filtroNivelSelect.value;

    let disciplinasFiltradas = arrayDisciplinas.filter(disciplina => {
        const cumpleStatus = statusSeleccionado === 'todos' || disciplina.status === statusSeleccionado;
        const cumpleNivel = nivelSeleccionado === 'todos' || disciplina.nivel === nivelSeleccionado;
        return cumpleStatus && cumpleNivel;
    });

    mostrarDisciplinas(disciplinasFiltradas);
}

function mostrarDisciplinas(disciplinasMost) {
    listadoDisciplinas.innerHTML = '';

    if (disciplinasMost.length === 0) {
        noDisciplinasMsj.classList.remove('hidden');
        return;
    } else {
        noDisciplinasMsj.classList.add('hidden');
    }

    disciplinasMost.forEach(i => {
        const { id, nombre, descripcion, duracion, nivel, status, imagen } = i;
        const card = document.createElement('div');

        const statusBadgeClass = status === 'activa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

        let nivelBadgeClass;
        switch (nivel) {
            case 'principiante':
                nivelBadgeClass = 'bg-blue-100 text-blue-800';
                break;
            case 'intermedio':
                nivelBadgeClass = 'bg-purple-100 text-purple-800';
                break;
            case 'avanzado':
                nivelBadgeClass = 'bg-orange-100 text-orange-800';
                break;
            default:
                nivelBadgeClass = 'bg-gray-100 text-gray-800';
        }

        //cards de disciplinas
        card.innerHTML = `
            <div class="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out bg-white flex flex-col h-full">
                ${imagen ? `
                    <div class="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                        <img src="/data/uploads/${imagen}" alt="Imagen de ${nombre}" class="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <span class="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${statusBadgeClass} capitalize">
                            ${status}
                        </span>
                    </div>
                ` : `
                    <div class="relative w-full h-48 sm:h-56 md:h-64 bg-gray-200 flex items-center justify-center rounded-t-lg">
                        <p class="text-gray-500 text-lg">Sin imagen</p>
                        <span class="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${statusBadgeClass} capitalize">
                            ${status}
                        </span>
                    </div>
                `}

                <div class="p-6 flex-grow">
                    <h3 class="text-3xl font-bold mb-3 text-gray-800">${nombre}</h3>
                    <p class="mb-2 text-gray-600"><strong class="font-semibold mr-1.5 text-gray-700">Descripción:</strong> ${descripcion}</p>
                    <p class="mb-2 text-gray-600"><strong class="font-semibold mr-1.5 text-gray-700">Duración:</strong> ${duracion} minutos</p>
                    <p class="mb-2 capitalize text-gray-600">
                        <strong class="font-semibold mr-1.5 text-gray-700">Nivel:</strong> 
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${nivelBadgeClass} capitalize">
                            ${nivel}
                        </span>
                    </p>
                </div>
            </div>
        `;

        card.classList.add('w-full');
        listadoDisciplinas.appendChild(card);
    });
}

function mostrarNotificacion(mensaje, tipo, contenedor) {
    if (!contenedor) {
        console.error("Contenedor de notificación no proporcionado.");
        return;
    }
    contenedor.innerHTML = mensaje;
    contenedor.classList.remove('hidden', 'text-green-600', 'text-red-600', 'border-green-600', 'border-red-600', 'text-blue-600', 'border-blue-600');
    contenedor.classList.add('block');

    if (tipo === 'success') {
        contenedor.classList.add('text-green-600', 'border-green-600');
    } else if (tipo === 'error') {
        contenedor.classList.add('text-red-600', 'border-red-600');
    } else if (tipo === 'info') {
        contenedor.classList.add('text-blue-600', 'border-blue-600');
    }

    setTimeout(() => {
        contenedor.classList.remove('block', 'text-green-600', 'text-red-600', 'border-green-600', 'border-red-600', 'text-blue-600', 'border-blue-600');
        contenedor.classList.add('hidden');
    }, 3000);
}
