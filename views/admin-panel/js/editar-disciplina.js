const nombreDisciplina = document.querySelector('#nombre-disciplina');
const descripcionDisciplina = document.querySelector('#descripcion-disciplina');
const duracionDisciplina = document.querySelector('#duracion-disciplina');
const nivelDisciplina = document.querySelector('#nivel-disciplina');
const capacidadDisciplina = document.querySelector('#capacidad-disciplina');
const precioDisciplina = document.querySelector('#precio-disciplina');
const statusDisciplina = document.querySelector('#status-disciplina');
const notificacion = document.querySelector('.notificacion');


document.addEventListener('DOMContentLoaded', async ()=>{
    //consultar en la url para extraer y guardar el id que enviamos en la ruta
    const parametrosURL = new URLSearchParams(window.location.search);
    const id = parametrosURL.get('id');

    console.log(id)

    if (!id) {
        notificacion.innerHTML = 'Disciplina no encontrada'
        notificacion.classList.remove('hidden', 'text-green-600')
        notificacion.classList.add('block', 'text-red-600')

        setTimeout(()=>{
            notificacion.classList.remove('block')
            notificacion.classList.add('hidden')
        }, 2000)
    }

    const response = await axios.get(`/api/disciplinas/disciplina?id=${id}` )
    const disciplina = response.data.data

    //console.log(disciplina)
    
    mostrarDisciplina(disciplina);

    //hacer el registro desde el formulario
    const formulario = document.querySelector('#form-disciplina');
    formulario.addEventListener('submit',validarDisciplina)

})

async function validarDisciplina(e){
    e.preventDefault();
    const parametrosURL = new URLSearchParams(window.location.search);
    const id = parametrosURL.get('id');
    console.log(id)
    
    const disciplinaAct = {
        nombre: nombreDisciplina.value,
        descripcion: descripcionDisciplina.value,
        duracion: parseInt(duracionDisciplina.value),
        nivel: nivelDisciplina.value,
        capacidad: parseInt(capacidadDisciplina.value),
        precio: parseInt(precioDisciplina.value),
        status: statusDisciplina.value,
        id: id
    }

    if(validar(disciplinaAct)){
        notificacion.innerHTML = 'Todos los campos son obligatorios'
        notificacion.classList.remove('hidden', 'text-green-600')
        notificacion.classList.add('block', 'text-red-600')

        setTimeout(()=>{
            notificacion.classList.remove('block')
            notificacion.classList.add('hidden')
        }, 2000)
    }
    console.log(disciplinaAct)
    await axios.post('/api/disciplinas/actualizar',disciplinaAct); 
    window.location.href = '/panel-administrador'
}

function mostrarDisciplina(disciplina){
    //muestra los datos de la disciplina en la interfaz de editar
    const { nombre, descripcion, duracion, nivel, capacidad, precio, status} = disciplina;

    nombreDisciplina.value= nombre,
    descripcionDisciplina.value= descripcion,
    duracionDisciplina.value= duracion,
    nivelDisciplina.value= nivel,
    capacidadDisciplina.value= capacidad,
    precioDisciplina.value= precio,
    statusDisciplina.value= status
}

function validar(objeto){
    return !Object.values(objeto).every(element=>element!=='')
}