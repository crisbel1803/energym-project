//selectores
const formR = document.querySelector('#form-registro')
const nameInput= document.querySelector('#name-input')
const emailInput = document.querySelector('#email-input')
const passwordInput = document.querySelector('#password-input')
const matchInput = document.querySelector('#match-password')
const btnRegistro = document.querySelector('#btn-registro')
const notificacion = document.querySelector('.notificacion')

//validacion con regex
const nameVal = /^[A-Z][a-z]+ [A-Z][a-z]+$/
const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const passwordVal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/


let valname = false;
let valemail = false;
let valpass = false;
let valmatch = false;

nameInput.addEventListener('input', e=>{
    valname = nameVal.test(e.target.value)
    validar(nameInput, valname)
})

emailInput.addEventListener('input', e=>{
    valemail = emailVal.test(e.target.value)
    validar(emailInput, valemail)
})

passwordInput.addEventListener('input', e=>{
    valpass = passwordVal.test(e.target.value)
    validar(passwordInput, valpass)
    validar(matchInput, valmatch)

})

matchInput.addEventListener('input', e=>{
    valmatch = e.target.value === passwordInput.value
    validar(matchInput, valmatch)
    validar(passwordInput, valpass)

})

function validar(input, val){
    btnRegistro.disabled = valname && valemail && valpass && valmatch ? false : true

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
}

//registro en la bd con el submit del form
formR.addEventListener('submit',async e=>{
    e.preventDefault()

    //validamos
    console.log(nameInput.value)
    console.log(emailInput.value)

    const arrayUsers = await axios.get('/api/users/lista-users')
    const users = arrayUsers.data.data
    const user = users.find(user => user.email === emailInput.value)

    if(!nameInput.value || !emailInput.value || !passwordInput.value){
            //campo vacio
            notificacion.innerHTML = 'Todos los campos son obligatorios'
            notificacion.classList.remove('hidden', 'text-green-600')
            notificacion.classList.add('block', 'text-red-600')

            setTimeout(()=>{
                notificacion.classList.remove('block')
                notificacion.classList.add('hidden')
            }, 2000)

    }else if(user){
        //usuario existente
            notificacion.innerHTML = `El correo ${emailInput.value} ya está registrado`
            notificacion.classList.remove('hidden', 'text-green-600')
            notificacion.classList.add('block', 'text-red-600')

            setTimeout(()=>{
                notificacion.classList.remove('block')
                notificacion.classList.add('hidden')
            }, 2000)
    }else{
        if(valname && valemail && valpass && valmatch){
            console.log("El campo esta lleno")

            const nombre = nameInput.value
            const email = emailInput.value
            const password = passwordInput.value

            //vamos a enviar info al backend
            const response = await axios.post('/api/users',{nombre:nombre,email:email,password:password})
            console.log(response)

                notificacion.innerHTML = `El usuario ${nameInput.value} ha sido creado`
                notificacion.classList.remove('hidden', 'text-red-600')
                notificacion.classList.add('block', 'text-green-600')

                setTimeout(()=>{
                    notificacion.classList.remove('block')
                    notificacion.classList.add('hidden')
                }, 2000)
            
            nameInput.value = '';
            emailInput.value = '';
            matchInput.value = '';
            passwordInput.value = '';

            alert('Usuario creado correctamente. Verifique su correo para activar la cuenta')
        }else{
            //campo vacio
            notificacion.innerHTML = 'Todos los campos son obligatorios'
            notificacion.classList.remove('hidden', 'text-green-600')
            notificacion.classList.add('block', 'text-red-600')

            setTimeout(()=>{
                notificacion.classList.remove('block')
                notificacion.classList.add('hidden')
            }, 2000)
        }


    }

})
