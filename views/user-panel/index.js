const user = JSON.parse(localStorage.getItem('user'));

const formEditar = document.querySelector('#form-editar');
const btnEditar = document.querySelector('#btn-editar');

const id_user = user.id;

const nombreInput = document.querySelector('#nombre-input');
const emailInput = document.querySelector('#email-input');
const telefonoInput = document.querySelector('#telefono-input');
const passwordInput = document.querySelector('#password-input')
const matchInput = document.querySelector('#match-input');

//validar inicio de sesion
if(!user){
window.location.href = '/'
}

//mostrar datos del usuario
if (user) {
    document.getElementById('nombre').textContent = user.nombre || 'Desconocido';
    document.getElementById('btn-user').textContent = user.nombre || 'Desconocido';
    document.getElementById('nombre-user').textContent = user.nombre || 'Desconocido';
    document.getElementById('email').textContent = user.email;
    document.getElementById('telefono').textContent = user.telefono || 'No proporcionado';
} else {
    document.getElementById('user-info').innerHTML = '<p class="text-red-500">No se encontró información del usuario.</p>';
}

async function eliminarCuenta() {
    const id_user = user.id;
    console.log(id_user)

    const confirmar = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    
    if (confirmar) {
        try {
            const response = await axios.post('/api/users/eliminar', { id_user });
            console.log(response.data);

            alert('Tu cuenta ha sido eliminada exitosamente.');

            localStorage.removeItem('user');
            window.location.href = '/';
        } catch (error) {
            console.error("Error eliminando la cuenta:", error);
        }
    }
}

function abrirForm() {
    formEditar.classList.toggle('hidden')

    //mostrar datos del usuario
    nombreInput.value = user.nombre;
    emailInput.value = user.email;
    telefonoInput.value = user.telefono;

    validar(nombreInput, nameVal.test(nombreInput.value));
    validar(emailInput, emailVal.test(emailInput.value));
    validar(telefonoInput, telefonoVal.test(telefonoInput.value));

}

//validacion con regex
const nameVal = /^[A-Z][a-z]+ [A-Z][a-z]+$/
const telefonoVal = /^04\d{9}$/
const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const passwordVal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/


let valname = false;
let valemail = false;
let valtelefono = false;
let valpass = false;
let valmatch = false;

nombreInput.addEventListener('input', e=>{
    valname = nameVal.test(e.target.value)
    validar(nombreInput, valname)
})

emailInput.addEventListener('input', e=>{
    valemail = emailVal.test(e.target.value)
    validar(emailInput, valemail)
})

telefonoInput.addEventListener('input', e=>{
    valtelefono = telefonoVal.test(e.target.value)
    validar(telefonoInput, valtelefono)
})

passwordInput.addEventListener('input', validarPassword)
matchInput.addEventListener('input', validarPassword)

function validarPassword(e){

    if(e.target.value === ''){
        valpass = false
        valmatch = false
    }else{
        valpass = passwordVal.test(passwordInput.value)
        valmatch = matchInput.value === passwordInput.value
    }
    validar(passwordInput, valpass)
    validar(matchInput, valmatch)

    btnEditar.disabled = valname && valemail && valtelefono && (valpass || passwordInput.value === '') && valmatch ? false : true
}

function validar(input, val){
    btnEditar.disabled = valname && valemail && valtelefono ? false : true

    if(val){
        input.classList.remove('border-red-500','border-verde')
        input.classList.add('border-blue-500')
    }else if(input.value === ''){
        input.classList.remove('border-blue-500','border-red-500')
        input.classList.add('border-verde')

    }else{
        input.classList.remove('border-blue-500','border-verde')
        input.classList.add('border-red-500')
    }

    habilitarBoton();
}

function habilitarBoton() { //edita 1 solo campo y solicita cambiar un inp para guarda el pass
    const cambiosValidos = (
        (nombreInput.value !== user.nombre && valname) ||
        (emailInput.value !== user.email && valemail) ||
        (telefonoInput.value !== user.telefono && valtelefono) ||
        (passwordInput.value !== '' && valpass && valmatch)
    );

    const camposIncorrectos = (
        (nombreInput.value !== user.nombre && !valname) ||
        (emailInput.value !== user.email && !valemail) ||
        (telefonoInput.value !== user.telefono && !valtelefono)
    );

    btnEditar.disabled = camposIncorrectos || !cambiosValidos;
}

btnEditar.addEventListener('click', actualizarUser) 

async function actualizarUser(e) {
    e.preventDefault();    

    const data = {
        id_user,
        nombre: nombreInput.value,
        email: emailInput.value,
        telefono: telefonoInput.value,
    };

    if (valpass && valmatch) {
        data.password = passwordInput.value;
    };

    console.log('Datos a enviar:', data);

    try {
        const response = await axios.post('/api/users/actualizar', data);
        console.log(response.data);

        buscarUser();


        //mostrarNuevosDatos(userAct);

        alert('Tu cuenta ha sido editada exitosamente.');
        window.location.href = '/panel-usuario';
    } catch (error) {
        console.error("Error editando la cuenta:", error);
    }
}

async function buscarUser() {
    const arrayUsers = await axios.get('/api/users/lista-users')
    console.log(arrayUsers)
    const users = arrayUsers.data.data
    //console.log(users.data.data)
    const user = users.find(user => user.email === emailInput.value)
    mostrarNuevosDatos(user)
}

function mostrarNuevosDatos(userAct) {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(userAct));
    const user = JSON.parse(localStorage.getItem('user'));
    user.nombre = nombreInput.value;
    user.email = emailInput.value;
    user.telefono = telefonoInput.value;
    localStorage.setItem('user', JSON.stringify(user));

    document.getElementById('nombre').textContent = user.nombre || 'Desconocido';
    document.getElementById('btn-user').textContent = user.nombre || 'Desconocido';
    document.getElementById('nombre-user').textContent = user.nombre || 'Desconocido';
    document.getElementById('email').textContent = user.email;
    document.getElementById('telefono').textContent = user.telefono || 'No proporcionado';
}