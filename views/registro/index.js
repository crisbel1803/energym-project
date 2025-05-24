//selectores
const formR = document.querySelector('#form-registro')
const nameInput= document.querySelector('#name-input')
const emailInput = document.querySelector('#email-input')
const passwordInput = document.querySelector('#password-input')
const matchInput = document.querySelector('#match-password')
const notificacion = document.querySelector('.notificacion')

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
    }

})
