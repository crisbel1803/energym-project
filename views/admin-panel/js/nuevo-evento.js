const formularioEvento = document.querySelector('#form-evento');
const notificacion = document.querySelector('.notificacion');
const listadoEventos = document.querySelector('#cont-eventos');

formularioEvento.addEventListener('submit',validarEvento);

document.addEventListener('DOMContentLoaded', async ()=>{
    //cargar los salones, instructores y disciplinas
    const salones = await axios.get('/api/salones/lista-salones')
    const arraySalones = salones.data.data
    //console.log(arraySalones)

    const instructores = await axios.get('/api/instructores/lista-instructores')
    const arrayInstructores = instructores.data.data
    //console.log(arrayInstructores)

    const disciplinas = await axios.get('/api/disciplinas/lista-disciplinas')
    const arrayDisciplinas = disciplinas.data.data
    //console.log(arrayDisciplinas)

    const selectSalones = document.querySelector('#salon-evento');
    const selectInstructores = document.querySelector('#instructor-evento');
    const selectDisciplinas = document.querySelector('#titulo-evento');


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
        selectDisciplinas.appendChild(option)
    })
})

async function validarEvento(e){
    e.preventDefault();

    const tituloEvento = document.querySelector('#titulo-evento').value;
    const descripcionEvento = document.querySelector('#descripcion-evento').value;
    const inicioEvento = document.querySelector('#inicio-evento').value;
    const finEvento = document.querySelector('#fin-evento').value;
    const salonEvento = document.querySelector('#salon-evento').value;
    const instructorEvento = document.querySelector('#instructor-evento').value;

    const evento = {
        tituloEvento,
        descripcionEvento,
        inicioEvento,
        finEvento,
        salonEvento,
        instructorEvento,

    }

    if(validar(evento)){
        //campo vacio
        notificacion.innerHTML = 'Todos los campos son obligatorios'
        notificacion.classList.remove('hidden', 'text-green-600')
        notificacion.classList.add('block', 'text-red-600')

        setTimeout(()=>{
            notificacion.classList.remove('block')
            notificacion.classList.add('hidden')
        }, 2000)

    }else{
        const evento = await axios.post('/api/eventos',{title:tituloEvento,description:descripcionEvento,start:inicioEvento,end:finEvento,room:salonEvento,instructor:instructorEvento})
        console.log(evento)
        const arrayEventos = evento.data.lista
        window.location.href = "/panel-administrador/horario-semanal.html"
    }

}

function validar(obj){
    return !Object.values(obj).every(i=>i!=='');
}
