const navegacion = document.querySelector('#navegacion');
navegacion.classList.add('bg-gris')

const crearNavAdmin = () =>{
    navegacion.innerHTML = `
    <!--MENU PC-->
    <nav class="hidden md:block">
        <ul class="flex flex-col h-screen w-40 bg-black text-white font-medium fixed p-2 gap-4 pt-6">
            <li class="px-2 pt-6">
                <a href="/" class="hover-underline w-full"><i class="fa-solid fa-house" style="color: #ffffff;"></i> Home</a>
            </li>
            
            <li class="pt-6">
                <p class="font-light text-verde uppercase">Control de Clases</p>
            </li>
            <li class="px-2">
                <a href="index.html" class="hover-underline w-full"><i class="fa-solid fa-dumbbell" style="color: #ffffff;"></i> Clases</a>
            </li>
            <li class="px-2">
                <a href="reservaciones.html" class="hover-underline w-full"><i class="fa-solid fa-book-open-reader" style="color: #ffffff;"></i> Reservas</a>
            </li>
            <li class="px-2">
                <a href="pagos.html" class="hover-underline w-full"><i class="fa-solid fa-table-columns" style="color: #ffffff;"></i> Pagos</a>
            </li>
            <li class="px-2">
                <a href="horario-semanal.html" class="hover-underline w-full"><i class="fa-solid fa-calendar-days" style="color: #ffffff;"></i> Horarios</a>
            </li>

            <li class="pt-6">
                <p class="font-light text-verde uppercase">Control de Usuarios</p>
            </li>
            <li class="px-2">
                <a href="usuarios.html" class="hover-underline w-full"><i class="fa-solid fa-users" style="color: #ffffff;"></i> Usuarios</a>
            </li>
            <li class="px-2">
                <a href="#" class="hover-underline w-full" id="cerrar-sesion"><i class="fa-solid fa-right-from-bracket" style="color: #ffffff;"></i> Salir</a>
            </li>
        </ul>            
    </nav>

    <!--abrir-->
        <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24"
            stroke-width="1.5"ç
            stroke="currentColor"
            class="abrirNav w-24 h-24 md:hidden text-white cursor-pointer p-2 hover:text-verde rounded-lg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />      
        </svg>
            
    <!--menu movil-->
    <div class="menuMobile2 fixed top-0 left-0 bottom-0 flex-col gap-4 hidden z-10 w-2/5">
        <ul class="flex flex-col bg-black text-white font-medium fixed p-2 gap-4 h-screen">
            <!--cerrar-->
            <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24"
            stroke-width="1.5"ç
            stroke="currentColor"
            class="cerrarNav w-12 h-12 md:hidden text-white cursor-pointer p-2 hover:text-verde rounded-lg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />      
            </svg>

            <li class="px-2">
                <a href="/" class="hover-underline w-full"><i class="fa-solid fa-house" style="color: #ffffff;"></i> Home</a>
            </li>
            
            <li class="pt-6">
                <p class="font-light text-verde uppercase">Control de Clases</p>
            </li>
            <li class="px-2">
                <a href="index.html" class="hover-underline w-full"><i class="fa-solid fa-dumbbell" style="color: #ffffff;"></i> Clases</a>
            </li>
            <li class="px-2">
                <a href="reservaciones.html" class="hover-underline w-full"><i class="fa-solid fa-book-open-reader" style="color: #ffffff;"></i> Reservas</a>
            </li>
            <li class="px-2">
                <a href="pagos.html" class="hover-underline w-full"><i class="fa-solid fa-table-columns" style="color: #ffffff;"></i> Pagos</a>
            </li>
            <li class="px-2">
                <a href="horario-semanal.html" class="hover-underline w-full"><i class="fa-solid fa-calendar-days" style="color: #ffffff;"></i> Horarios</a>
            </li>

            <li class="pt-6">
                <p class="font-light text-verde uppercase">Control de Usuarios</p>
            </li>
            <li class="px-2">
                <a href="/panel-usuario/usuarios.html" class="hover-underline w-full"><i class="fa-solid fa-users" style="color: #ffffff;"></i> Usuarios</a>
            </li>
            <li class="px-2">
                <a href="#" class="hover-underline w-full" id="cerrar-sesion"><i class="fa-solid fa-right-from-bracket" style="color: #ffffff;"></i> Salir</a>
            </li>
        </ul>
    </div>
    `
};

const crearNavUser = () =>{
    navegacion.innerHTML = `
    <!--MENU PC-->
    <nav class="hidden md:block">
        <ul class="flex flex-col h-screen w-40 bg-black text-white font-medium fixed p-2 gap-4 pt-6">
            <li class="px-2 pt-6">
                <a href="/" class="hover-underline w-full"><i class="fa-solid fa-house" style="color: #ffffff;"></i> Home</a>
            </li>

            <li class="pt-6">
                <p class="font-light text-verde uppercase">Mi perfil</p>
            </li>

            <!--<li class="px-2">
                <a href="#" class="hover-underline w-full"><i class="fa-solid fa-dumbbell" style="color: #ffffff;"></i> Dashboard</a>
            </li>-->
            <li class="px-2">
                <a href="index.html" class="hover-underline w-full"><i class="fa-solid fa-users" style="color: #ffffff;"></i> Perfil</a>
            </li>
            <li class="px-2">
                <a href="mis-reservas.html" class="hover-underline w-full"><i class="fa-solid fa-table-columns" style="color: #ffffff;"></i> Mis Reservaciones</a>
            </li>
            <li class="px-2">
                <a href="#" class="hover-underline w-full" id="cerrar-sesion"><i class="fa-solid fa-right-from-bracket" style="color: #ffffff;"></i> Salir</a>
            </li>
        </ul>            
    </nav>

    <!--abrir-->
        <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24"
            stroke-width="1.5"ç
            stroke="currentColor"
            class="abrirNav w-24 h-24 md:hidden text-white cursor-pointer p-2 hover:text-verde rounded-lg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />      
        </svg>
            
    <!--menu movil-->
    <div class="menuMobile2 fixed top-0 left-0 bottom-0 flex-col gap-4 hidden z-10 w-2/5">
        <ul class="flex flex-col bg-black text-white font-medium fixed p-2 gap-4 h-screen">
            <!--cerrar-->
            <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24"
            stroke-width="1.5"ç
            stroke="currentColor"
            class="cerrarNav w-12 h-12 md:hidden text-white cursor-pointer p-2 hover:text-verde rounded-lg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />      
            </svg>

            <li class="px-2">
                <a href="/" class="hover-underline w-full"><i class="fa-solid fa-house" style="color: #ffffff;"></i> Home</a>
            </li>
            <li>
                <p class="font-light text-verde uppercase">Mi perfil</p>
            </li>
            <!--<li class="px-2">
                <a href="#" class="hover-underline w-full"><i class="fa-solid fa-dumbbell" style="color: #ffffff;"></i> Dashboard</a>
            </li>-->
            <li class="px-2">
                <a href="index.html" class="hover-underline w-full"><i class="fa-solid fa-users" style="color: #ffffff;"></i> Perfil</a>
            </li>
            <li class="px-2">
                <a href="mis-reservas.html" class="hover-underline w-full"><i class="fa-solid fa-table-columns" style="color: #ffffff;"></i> Mis Reservaciones</a>
            </li>
            <li class="px-2">
                <a href="#" class="hover-underline w-full" id="cerrar-sesion2"><i class="fa-solid fa-right-from-bracket" style="color: #ffffff;"></i> Salir</a>
            </li>
        </ul>
    </div>
    `
};

//ventanas del admin
if(window.location.pathname === '/panel-administrador/'){
    crearNavAdmin();
}else if(window.location.pathname === '/panel-administrador/index.html'){
    crearNavAdmin();
}else if(window.location.pathname === '/panel-administrador/horario-semanal.html'){
    crearNavAdmin();
}else if(window.location.pathname === '/panel-administrador/usuarios.html'){
    crearNavAdmin();
}else if(window.location.pathname === '/panel-administrador/editar-disciplina.html'){
    crearNavAdmin();
}else if(window.location.pathname === '/panel-administrador/editar-evento.html'){
    crearNavAdmin();
}else if(window.location.pathname === '/panel-administrador/editar-instructor.html'){
    crearNavAdmin();
}else if(window.location.pathname === '/panel-administrador/editar-salon.html'){
    crearNavAdmin();
}else if(window.location.pathname === '/panel-administrador/reservaciones.html'){
    crearNavAdmin();
}else if(window.location.pathname === '/panel-administrador/pagos.html'){
    crearNavAdmin();
}

//ventanas del user
if(window.location.pathname === '/panel-usuario/'){
    crearNavUser();
}else if(window.location.pathname === '/panel-usuario/index.html'){
    crearNavUser();
}else if(window.location.pathname === '/panel-usuario/mis-reservas.html'){
    crearNavUser();
}

const btnAbrir = document.querySelector('.abrirNav')
const btnCerrar = document.querySelector('.cerrarNav')
const menuMobile2 = document.querySelector('.menuMobile2')

btnAbrir.addEventListener('click', e=>{
    menuMobile2.classList.remove('hidden')
    menuMobile2.classList.add('block')
})

btnCerrar.addEventListener('click', e=>{
    menuMobile2.classList.add('hidden')
    menuMobile2.classList.remove('block')
})

btnSalir = document.querySelector('#cerrar-sesion')

btnSalir.addEventListener('click', (e)=>{
  localStorage.removeItem('user');
  localStorage.removeItem('resumenCompra');
  window.location.href = '/'
})

btnSalir2 = document.querySelector('#cerrar-sesion2')

btnSalir2.addEventListener('click', (e)=>{
  localStorage.removeItem('user');
  localStorage.removeItem('resumenCompra');
  window.location.href = '/'
})