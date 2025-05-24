//selectores
const formL = document.querySelector('#form-login');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const notificacion = document.querySelector('.notificacion');

formL.addEventListener('submit', async e => {
    e.preventDefault();

    const arrayUsers = await axios.get('/api/users/lista-users');
    const users = arrayUsers.data.data;
    const user = users.find(user => user.email === emailInput.value && user.password === passwordInput.value);

    if (!user) {
        notificacion.innerHTML = 'El usuario no existe, verifique el correo y la contraseña';
        notificacion.classList.remove('hidden');
        notificacion.classList.add('block');

        setTimeout(() => {
            notificacion.classList.remove('block');
            notificacion.classList.add('hidden');
        }, 2000);
    } else if (!user.verified) {
        notificacion.innerHTML = 'Debes verificar tu correo antes de iniciar sesión';
        notificacion.classList.remove('hidden');
        notificacion.classList.add('block');

        setTimeout(() => {
            notificacion.classList.remove('block');
            notificacion.classList.add('hidden');
        }, 2000);
    } else {
        localStorage.setItem('user', JSON.stringify(user));

        if (user.rol === 'afiliado') {
            window.location.href = '/panel-usuario';
        } else if (user.rol === 'admin') {
            window.location.href = '/panel-administrador';
        }
    }
});