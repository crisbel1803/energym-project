const nombreInst = document.querySelector('#nombre-instructor');
const apellidoInst = document.querySelector('#apellido-instructor');
const cedulaInst = document.querySelector('#cedula-instructor');
const telefonoInst = document.querySelector('#telefono-instructor');
const emailInst = document.querySelector('#email-instructor');
const notificacion = document.querySelector('.notificacion');

document.addEventListener('DOMContentLoaded', async ()=>{
    //consultar en la url para extraer y guardar el id que enviamos en la ruta
    const parametrosURL = new URLSearchParams(window.location.search);
    const id = parametrosURL.get('id');

    console.log(id)

    if (!id) {
        notificacion.innerHTML = 'Instructor no encontrado'
        notificacion.classList.remove('hidden', 'text-green-600')
        notificacion.classList.add('block', 'text-red-600')

        setTimeout(()=>{
            notificacion.classList.remove('block')
            notificacion.classList.add('hidden')
        }, 2000)
    }

    const response = await axios.get(`/api/instructores/instructor?id=${id}` )
    const instructor = response.data.data

    //console.log(instructor)
    
    mostrarInstructor(instructor);

    //hacer el registro desde el formulario
    const formulario = document.querySelector('#form-instructor');
    formulario.addEventListener('submit',validarInstructor)

})

async function validarInstructor(e){
    e.preventDefault();
    const parametrosURL = new URLSearchParams(window.location.search);
    const id = parametrosURL.get('id');
    console.log(id)
    
    const instructorAct = {
        nombre: nombreInst.value,
        apellido: apellidoInst.value,
        cedula: parseInt(cedulaInst.value),
        telefono: parseInt(telefonoInst.value),
        email: emailInst.value,
        id: id
    }

    if(validar(instructorAct)){
        notificacion.innerHTML = 'Todos los campos son obligatorios'
        notificacion.classList.remove('hidden', 'text-green-600')
        notificacion.classList.add('block', 'text-red-600')

        setTimeout(()=>{
            notificacion.classList.remove('block')
            notificacion.classList.add('hidden')
        }, 2000)
    }
    console.log(instructorAct)
    await axios.post('/api/instructores/actualizar',instructorAct); 
    window.location.href = '/panel-administrador'
}

function mostrarInstructor(instructor){
    //muestra los datos de la instructor en la interfaz de editar
    const { nombre, apellido, cedula, telefono, email} = instructor;

    nombreInst.value= nombre,
    apellidoInst.value= apellido,
    cedulaInst.value= cedula,
    telefonoInst.value= telefono,
    emailInst.value= email
}

function validar(objeto){
    return !Object.values(objeto).every(element=>element!=='')
}