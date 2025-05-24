const formularioDisciplina = document.querySelector('#form-disciplina');
const notificacion = document.querySelector('.notificacion');
const listadoDisciplinas = document.querySelector('#cont-disciplinas')
listadoDisciplinas.addEventListener('click', confirmarEliminar)
document.addEventListener('DOMContentLoaded',mostrarDisciplinas)

formularioDisciplina.addEventListener('submit',validarDisciplina);

async function validarDisciplina(e){
    e.preventDefault();

    const nombreDisciplina = document.querySelector('#nombre-disciplina').value;
    const descripcionDisciplina = document.querySelector('#descripcion-disciplina').value;
    const duracionDisciplina = document.querySelector('#duracion-disciplina').value;
    const nivelDisciplina = document.querySelector('#nivel-disciplina').value;
    const capacidadDisciplina = document.querySelector('#capacidad-disciplina').value;
    const precioDisciplina = document.querySelector('#precio-disciplina').value;
    const statusDisciplina = document.querySelector('#status-disciplina').value;

    const disciplina = {
        nombreDisciplina,
        descripcionDisciplina,
        duracionDisciplina,
        nivelDisciplina,
        capacidadDisciplina,
        precioDisciplina,
        statusDisciplina,

    }

    if(validar(disciplina)){
        //campo vacio
        notificacion.innerHTML = 'Todos los campos son obligatorios'
        notificacion.classList.remove('hidden', 'text-green-600')
        notificacion.classList.add('block', 'text-red-600')

        setTimeout(()=>{
            notificacion.classList.remove('block')
            notificacion.classList.add('hidden')
        }, 2000)

    }else{
        const disciplina = await axios.post('/api/disciplinas',{nombre:nombreDisciplina,descripcion:descripcionDisciplina,duracion:duracionDisciplina,nivel:nivelDisciplina,capacidad:capacidadDisciplina,precio:precioDisciplina,status:statusDisciplina})
        console.log(disciplina)
        const arrayDisciplinas = disciplina.data.lista
        window.location.href = "/panel-administrador"
    }

}

function validar(obj){
    return !Object.values(obj).every(i=>i!=='');
}

async function mostrarDisciplinas(){
    const disciplinas = await axios.get('/api/disciplinas/lista-disciplinas')

    const arrayDisciplinas = disciplinas.data.data


    arrayDisciplinas.forEach(i => {
        const {id, nombre, descripcion, duracion, nivel, capacidad, precio, status} = i
        const card = document.createElement('div')
        card.innerHTML = `
        <h3 class="text-3xl font-bold mb-3">${nombre}</h3>
        <p class="mb-2"><strong class="font-bold mr-1.5">Descripción:</strong> ${descripcion}</p>
        <p class="mb-2"><strong class="font-bold mr-1.5">Duración:</strong> ${duracion} minutos</p>
        <p class="mb-2 capitalize"><strong class="font-bold mr-1.5">Nivel:</strong> ${nivel}</p>
        <p class="mb-2"><strong class="font-bold mr-1.5">Capacidad:</strong> ${capacidad} cupos</p>
        <p class="mb-2"><strong class="font-bold mr-1.5">Precio:</strong> <span class="text-green-700">$${precio}</span></p>
        <p class="mb-2"><strong class="font-bold mr-1.5">Status:</strong> <span class="capitalize text-gray-700">${status}</span></p>

        <div class="px-10 py-4 flex flex-row gap-2 text-center justify-between">
            <a href="editar-disciplina.html?id=${id}"><i class="fa-solid fa-pencil" style="color: #2375b3;"></i></a>
            <a href="#"><i id="${id}" class="fa-solid fa-trash eliminar" style="color: #ff0000;"></i></a>
        </div>
        `      

        card.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-6', 'mb-4', 'w-full')

        listadoDisciplinas.appendChild(card)
    });

}

async function confirmarEliminar(e){
    if(e.target.classList.contains('eliminar')){
        const confirmar = confirm('Desea eliminar esta disciplina?')
        if(confirmar){
            const id = e.target.id
            console.log(id)
            const response = await axios.post('/api/disciplinas/eliminar', {id})

            //limpio el html de las disciplinas
            while(listadoDisciplinas.firstChild){
                listadoDisciplinas.removeChild(listadoDisciplinas.firstChild)
            }
            mostrarDisciplinas()
        }

    }
}
