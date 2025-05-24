const formularioInst = document.querySelector('#form-instructor');
const notificacion2 = document.querySelector('.notificacion2');
const listadoInst = document.querySelector('#cont-instructores')
listadoInst.addEventListener('click', confirmarEliminar)
document.addEventListener('DOMContentLoaded',mostrarInsts)

formularioInst.addEventListener('submit',validarInst);

async function validarInst(e){
    e.preventDefault();

    const nombreInst = document.querySelector('#nombre-instructor').value;
    const apellidoInst = document.querySelector('#apellido-instructor').value;
    const cedulaInst = document.querySelector('#cedula-instructor').value;
    const telefonoInst = document.querySelector('#telefono-instructor').value;
    const emailInst = document.querySelector('#email-instructor').value;

    const intructor = {
        nombreInst,
        apellidoInst,
        cedulaInst,
        telefonoInst,
        emailInst,

    }

    if(validar(intructor)){
        //campo vacio
        notificacion2.innerHTML = 'Todos los campos son obligatorios'
        notificacion2.classList.remove('hidden', 'text-green-600')
        notificacion2.classList.add('block', 'text-red-600')

        setTimeout(()=>{
            notificacion2.classList.remove('block')
            notificacion2.classList.add('hidden')
        }, 2000)

    }else{
        const instructores = await axios.post('/api/instructores',{nombre:nombreInst,apellido:apellidoInst,cedula:cedulaInst,telefono:telefonoInst,email:emailInst})
        console.log(instructores)
        const arrayInsts = instructores.data.lista
        window.location.href = "/panel-administrador"
    }
}

function validar(obj){
    return !Object.values(obj).every(i=>i!=='');
}

async function mostrarInsts(){
    const instructores = await axios.get('/api/instructores/lista-instructores')

    const arrayInst = instructores.data.data


    arrayInst.forEach(i => {
        const {id, nombre, apellido, cedula, telefono, email, especialidades} = i
        const card = document.createElement('div')
        card.innerHTML =`
        <h3 class="text-3xl font-bold mb-3 capitalize">${nombre} ${apellido}</h3>
        <p class="mb-2"><strong class="font-bold mr-1.5">Cédula:</strong> v-${cedula}</p>
        <p class="mb-2"><strong class="font-bold mr-1.5">Teléfono:</strong> ${telefono}</p>
        <p class="mb-2 capitalize"><strong class="font-bold mr-1.5">Email:</strong> ${email}</p>
        <p class="mb-2"><strong class="font-bold mr-1.5">Especialidades:</strong> ${especialidades}</p>

        <div class="px-10 py-4 flex flex-row gap-2 text-center justify-between">
            <a href="editar-instructor.html?id=${id}"><i class="fa-solid fa-pencil" style="color: #2375b3;"></i></a>
            <a href="#"><i id="${id}" class="fa-solid fa-trash eliminar" style="color: #ff0000;"></i></a>
        </div>
        `  
        card.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-6', 'mb-4', 'w-full')

        listadoInst.appendChild(card)
    });

}

async function confirmarEliminar(e){
    if(e.target.classList.contains('eliminar')){
        const confirmar = confirm('Desea eliminar este instructor?')
        if(confirmar){
            const id = e.target.id
            console.log(id)
            const response = await axios.post('/api/instructores/eliminar', {id})

            //limpio el html de los instructores
            while(listadoInst.firstChild){
                listadoInst.removeChild(listadoInst.firstChild)
            }
            mostrarInsts()
        }
    }
}



