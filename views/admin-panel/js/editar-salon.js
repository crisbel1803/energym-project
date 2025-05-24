const nombreSalon = document.querySelector('#nombre-salon');
const capacidadSalon = document.querySelector('#capacidad-salon');
const descripcionSalon = document.querySelector('#descripcion-salon');
const equipamientoSalon = document.querySelector('#equipamiento-salon');
const ubicacionSalon = document.querySelector('#ubicacion-salon');
const statusSalon = document.querySelector('#status-salon');


document.addEventListener('DOMContentLoaded', async ()=>{
    //consultar en la url para extraer y guardar el id que enviamos en la ruta
    const parametrosURL = new URLSearchParams(window.location.search);
    const id = parametrosURL.get('id');

    console.log(id)

    if (!id) {
        notificacion.innerHTML = 'Salon no encontrado'
        notificacion.classList.remove('hidden', 'text-green-600')
        notificacion.classList.add('block', 'text-red-600')

        setTimeout(()=>{
            notificacion.classList.remove('block')
            notificacion.classList.add('hidden')
        }, 2000)
    }

    const response = await axios.get(`/api/salones/salon?id=${id}` )
    const salon = response.data.data

    //console.log(salon)
    
    mostrarSalon(salon);

    //hacer el registro desde el formulario
    const formulario = document.querySelector('#form-salon');
    formulario.addEventListener('submit',validarSalon)

})

async function validarSalon(e){
    e.preventDefault();
    const parametrosURL = new URLSearchParams(window.location.search);
    const id = parametrosURL.get('id');
    console.log(id)
    
    const salonAct = {

        nombre: nombreSalon.value,
        capacidad: parseInt(capacidadSalon.value),
        descripcion: descripcionSalon.value,
        equipamiento: equipamientoSalon.value,
        ubicacion: ubicacionSalon.value,
        status: statusSalon.value,
        id: id
    }

    if(validar(salonAct)){
        notificacion.innerHTML = 'Todos los campos son obligatorios'
        notificacion.classList.remove('hidden', 'text-green-600')
        notificacion.classList.add('block', 'text-red-600')

        setTimeout(()=>{
            notificacion.classList.remove('block')
            notificacion.classList.add('hidden')
        }, 2000)
    }
    console.log(salonAct)
    await axios.post('/api/salones/actualizar',salonAct); 
    window.location.href = '/panel-administrador'
}

function mostrarSalon(salon){
    //muestra los datos de la salon en la interfaz de editar
    const { nombre, capacidad, descripcion, equipamiento, ubicacion, status} = salon;

    nombreSalon.value = nombre
    capacidadSalon.value = capacidad
    descripcionSalon.value = descripcion
    equipamientoSalon.value = equipamiento
    ubicacionSalon.value = ubicacion
    statusSalon.value = status
}

function validar(objeto){
    return !Object.values(objeto).every(element=>element!=='')
}