const tituloEvento = document.querySelector('#titulo-evento');
const descripcionEvento = document.querySelector('#descripcion-evento');
const inicioEvento = document.querySelector('#inicio-evento');
const finEvento = document.querySelector('#fin-evento');
const salonEvento = document.querySelector('#salon-evento');
const instructorEvento = document.querySelector('#instructor-evento');
const capacidadEvento = document.querySelector('#capacidad-evento');
const precioEvento = document.querySelector('#precio-evento');
const notificacion = document.querySelector('.notificacion');

document.addEventListener('DOMContentLoaded', async ()=>{
    //cargar los salones, instructores y eventos
    const salones = await axios.get('/api/salones/lista-salones')
    const arraySalones = salones.data.data
    //console.log(arraySalones)

    const instructores = await axios.get('/api/instructores/lista-instructores')
    const arrayInstructores = instructores.data.data
    //console.log(arrayInstructores)

    const disciplinas = await axios.get('/api/disciplinas/lista-disciplinas')
    const arrayDisciplinas = disciplinas.data.data
    //console.log(arrayeventos)

    const selectSalones = document.querySelector('#salon-evento');
    const selectInstructores = document.querySelector('#instructor-evento');
    const selecteventos = document.querySelector('#titulo-evento');


    //cargar los salones en el select
    arraySalones.forEach(i => {
        const {id, nombre} = i
        const option = document.createElement('option')
        option.id = id
        option.value = nombre
        option.textContent = nombre
        selectSalones.appendChild(option)
    })

    //cargar los instructores en el select
    arrayInstructores.forEach(i => {
        const {id, nombre, apellido} = i
        const option = document.createElement('option')
        option.id = id
        option.value = nombre + ' ' + apellido
        option.textContent = `${nombre} ${apellido}`
        selectInstructores.appendChild(option)
    })

    //cargar las disciplinas en el select
    arrayDisciplinas.forEach(i => {
        const {id, nombre} = i
        const option = document.createElement('option')
        option.id = id
        option.value = nombre
        option.textContent = nombre
        selecteventos.appendChild(option)
    })

    //consultar en la url para extraer y guardar el id que enviamos en la ruta
    const parametrosURL = new URLSearchParams(window.location.search);
    const id = parametrosURL.get('id');

    //console.log(id)

    if (!id) {
        notificacion.innerHTML = 'Evento no encontrado'
        notificacion.classList.remove('hidden', 'text-green-600')
        notificacion.classList.add('block', 'text-red-600')

        setTimeout(()=>{
            notificacion.classList.remove('block')
            notificacion.classList.add('hidden')
        }, 2000)
    }

    const response = await axios.get(`/api/eventos/evento?id=${id}` )
    const evento = response.data.data

    //console.log(evento)
    
    mostrarEvento(evento);

    //hacer el registro desde el formulario
    const formulario = document.querySelector('#form-evento');
    formulario.addEventListener('submit',validarEvento)

})


async function validarEvento(e){
    e.preventDefault();
    const parametrosURL = new URLSearchParams(window.location.search);
    const id = parametrosURL.get('id');
    console.log(id)
    
    const eventoAct = {
        title: tituloEvento.value,
        description: descripcionEvento.value,
        start: inicioEvento.value,
        end: finEvento.value,
        room: salonEvento.value,
        instructor: instructorEvento.value,
        capacidad: capacidadEvento.value,
        precio: precioEvento.value,
        id: id
    }


    if(validar(eventoAct)){
        notificacion.innerHTML = 'Todos los campos son obligatorios'
        notificacion.classList.remove('hidden', 'text-green-600')
        notificacion.classList.add('block', 'text-red-600')

        setTimeout(()=>{
            notificacion.classList.remove('block')
            notificacion.classList.add('hidden')
        }, 2000)
    }

    console.log(eventoAct)
    await axios.post('/api/eventos/actualizar',eventoAct); 
    window.location.href = '/panel-administrador/horario-semanal.html'
}

function mostrarEvento(evento){
    //muestra los datos del evento en la interfaz de editar
    //console.log(evento)
    const { title, description, start, end, room, instructor, capacidad, precio} = evento;

    //formateo de fecha para mostrarla en el formulario
   function formatoFecha(fecha) {
        const date = new Date(fecha);
        return date.getFullYear() + '-' + 
           String(date.getMonth() + 1).padStart(2, '0') + '-' + 
           String(date.getDate()).padStart(2, '0') + 'T' + 
           String(date.getHours()).padStart(2, '0') + ':' + 
           String(date.getMinutes()).padStart(2, '0');
    }

    const inicioFormato = formatoFecha(start);
    const finFormato = formatoFecha(end);

    tituloEvento.value= title,
    descripcionEvento.value= description,
    inicioEvento.value= inicioFormato,
    finEvento.value= finFormato,
    salonEvento.value= room,
    instructorEvento.value= instructor
    capacidadEvento.value= capacidad
    precioEvento.value= precio

}

function validar(objeto){
    return !Object.values(objeto).every(element=>element!=='')
}