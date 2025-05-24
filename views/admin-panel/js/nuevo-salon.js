const formularioSalon = document.querySelector('#form-salon');
const notificacion3 = document.querySelector('.notificacion3');
const listadoSalones = document.querySelector('#cont-salones')
listadoSalones.addEventListener('click', confirmarEliminar)
document.addEventListener('DOMContentLoaded',mostrarSalones)

formularioSalon.addEventListener('submit',validarSalon);

async function validarSalon(e){
    e.preventDefault();

    const nombreSalon = document.querySelector('#nombre-salon').value;
    const capacidadSalon = document.querySelector('#capacidad-salon').value;
    const descripcionSalon = document.querySelector('#descripcion-salon').value;
    const equipamientoSalon = document.querySelector('#equipamiento-salon').value;
    const ubicacionSalon = document.querySelector('#ubicacion-salon').value;
    const statusSalon = document.querySelector('#status-salon').value;

    const salon = {
        nombreSalon,
        capacidadSalon,
        descripcionSalon,
        equipamientoSalon,
        ubicacionSalon,
        statusSalon,

    }

    if(validar(salon)){
        //campo vacio
        notificacion3.innerHTML = 'Todos los campos son obligatorios'
        notificacion3.classList.remove('hidden', 'text-green-600')
        notificacion3.classList.add('block', 'text-red-600')

        setTimeout(()=>{
            notificacion3.classList.remove('block')
            notificacion3.classList.add('hidden')
        }, 2000)

    }else{
        const salones = await axios.post('/api/salones',{nombre:nombreSalon,capacidad:capacidadSalon,descripcion:descripcionSalon,equipamiento:equipamientoSalon,ubicacion:ubicacionSalon,status:statusSalon})
        console.log(salones)
        const arraySalones = salones.data.lista
        window.location.href = "/panel-administrador"
    }
}

function validar(obj){
    return !Object.values(obj).every(i=>i!=='');
}

async function mostrarSalones(){
    const salones = await axios.get('/api/salones/lista-salones')

    const arraySalones = salones.data.data


    arraySalones.forEach(i => {
            const { id, nombre, capacidad, descripcion, equipamiento, ubicacion, status } = i;
            const card = document.createElement('div');

            card.innerHTML = `
                <div class="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out bg-white flex flex-col h-full">
                    <div class="relative w-full h-48 sm:h-56 md:h-64 bg-gray-100 flex items-center justify-center rounded-t-lg">
                        <i class="fa-solid fa-door-open text-verde text-8xl opacity-75"></i> 
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <span class="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${status === 'habilitado' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} capitalize">
                            ${status}
                        </span>
                    </div>

                    <div class="p-6 flex-grow">
                        <h3 class="text-3xl font-bold mb-3 text-gray-800 capitalize">${nombre}</h3>
                        <p class="mb-2 text-gray-600"><strong class="font-semibold mr-1.5 text-gray-700">Capacidad:</strong> ${capacidad} personas</p>
                        <p class="mb-2 text-gray-600"><strong class="font-semibold mr-1.5 text-gray-700">Descripción:</strong> ${descripcion || 'No especificada'}</p>
                        <p class="mb-2 text-gray-600"><strong class="font-semibold mr-1.5 text-gray-700">Equipamiento:</strong> ${equipamiento || 'No especificado'}</p>
                        <p class="mb-2 text-gray-600"><strong class="font-semibold mr-1.5 text-gray-700">Ubicación:</strong> ${ubicacion || 'No especificada'}</p>
                    </div>

                    <div class="py-4 px-6 flex flex-row gap-4 justify-end border-t border-gray-100 bg-gray-50 rounded-b-lg">
                        <a href="editar-salon.html?id=${id}" class="text-blue-600 hover:text-blue-800 transition-colors duration-200" title="Editar Salón">
                            <i class="fa-solid fa-pencil text-lg"></i>
                        </a>
                        <button data-id="${id}" class="btn-eliminar-salon text-red-600 hover:text-red-800 transition-colors duration-200" title="Eliminar Salón">
                            <i class="fa-solid fa-trash text-lg"></i>
                        </button>
                    </div>
                </div>
            `;

            card.classList.add('w-full'); 
            listadoSalones.appendChild(card);
        });

}

async function confirmarEliminar(e){
    if(e.target.classList.contains('eliminar')){
        const confirmar = confirm('Desea eliminar este salon?')
        if(confirmar){
            const id = e.target.id
            console.log(id)
            const response = await axios.post('/api/salones/eliminar', {id})
            limpiarHTML()
            mostrarSalones()
        }
    }
}

function limpiarHTML(){
    while(listadoSalones.firstChild){
        listadoSalones.removeChild(listadoSalones.firstChild)
    }
}

