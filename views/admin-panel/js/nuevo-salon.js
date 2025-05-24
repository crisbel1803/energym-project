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
        const {id, nombre, capacidad, descripcion, equipamiento, ubicacion, status} = i
        const card = document.createElement('div')
        card.innerHTML =`
        <h3 class="text-3xl font-bold mb-3 capitalize">${nombre}</h3>
        <p class="mb-2"><strong class="font-bold mr-1.5">Capacidad:</strong> ${capacidad}</p>
        <p class="mb-2"><strong class="font-bold mr-1.5">Descripción:</strong> ${descripcion}</p>
        <p class="mb-2 capitalize"><strong class="font-bold mr-1.5">Equipamiento:</strong> ${equipamiento}</p>
        <p class="mb-2"><strong class="font-bold mr-1.5">Ubicación:</strong> ${ubicacion}</p>
        <p class="mb-2"><strong class="font-bold mr-1.5">Status:</strong> ${status}</p>

        <div class="px-10 py-4 flex flex-row gap-2 text-center justify-between">
            <a href="editar-salon.html?id=${id}"><i class="fa-solid fa-pencil" style="color: #2375b3;"></i></a>
            <a href="#"><i id="${id}" class="fa-solid fa-trash eliminar" style="color: #ff0000;"></i></a>
        </div>
        `
        card.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-6', 'mb-4', 'w-full')

        listadoSalones.appendChild(card)
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

