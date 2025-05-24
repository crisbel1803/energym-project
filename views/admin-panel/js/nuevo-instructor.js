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
            const { id, nombre, apellido, cedula, telefono, email, especialidades } = i;
            const card = document.createElement('div');

            card.innerHTML = `
                <div class="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out bg-white flex flex-col h-full">
                    <div class="relative w-full h-48 sm:h-56 md:h-64 bg-gray-100 flex items-center justify-center rounded-t-lg">
                         <i class="fa-solid fa-dumbbell text-verde text-8xl opacity-75"></i>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    <div class="p-6 flex-grow">
                        <h3 class="text-3xl font-bold mb-3 text-gray-800 capitalize">${nombre} ${apellido}</h3>
                        <p class="mb-2 text-gray-600"><strong class="font-semibold mr-1.5 text-gray-700">Cédula:</strong> v-${cedula}</p>
                        <p class="mb-2 text-gray-600"><strong class="font-semibold mr-1.5 text-gray-700">Teléfono:</strong> ${telefono || 'N/A'}</p>
                        <p class="mb-2 text-gray-600"><strong class="font-semibold mr-1.5 text-gray-700">Email:</strong> ${email}</p>
                        <p class="mb-2 text-gray-600"><strong class="font-semibold mr-1.5 text-gray-700">Especialidades:</strong> ${especialidades || 'No especificadas'}</p>
                    </div>

                    <div class="py-4 px-6 flex flex-row gap-4 justify-end border-t border-gray-100 bg-gray-50 rounded-b-lg">
                        <a href="editar-instructor.html?id=${id}" class="text-blue-600 hover:text-blue-800 transition-colors duration-200" title="Editar Instructor">
                            <i class="fa-solid fa-pencil text-lg"></i>
                        </a>
                        <button data-id="${id}" class="btn-eliminar-instructor text-red-600 hover:text-red-800 transition-colors duration-200" title="Eliminar Instructor">
                            <i class="fa-solid fa-trash text-lg"></i>
                        </button>
                    </div>
                </div>
            `;

            card.classList.add('w-full');
            listadoInst.appendChild(card);
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



