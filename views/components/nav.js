const navegacion = document.querySelector('#navegacion');
navegacion.classList.add('bg-gris')

const crearNavHome = () =>{
    navegacion.innerHTML = `
    <div  class="text-white font-medium flex justify-between h-24 bg-black">
            <div>
                <a href="/">
                    <img src="/images/logo-energym2.png" alt="Energym Fitness Club" class="pl-4 h-24">
                </a>
            </div>

            <!--movil-->
            <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24"
                stroke-width="1.5"ç
                stroke="currentColor"
                class="navButton w-24 h-24 md:hidden text-white cursor-pointer p-2 hover:text-verde rounded-lg">
                <path stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <!--pc-->
            <div class="hidden md:flex flex-row gap-4">
                <nav class="flex items-center">
                    <ul class="flex gap-4 justify-between">
                        <li class="px-2">
                            <a href="/" class="hover-underline">INICIO</a>
                        </li>
                        <li class="px-2">
                            <a href="/#us-section" class="hover-underline">NOSOTROS</a>
                        </li>
                        <!--<li class="px-2">
                            <a href="/#planes-section" class="hover-underline">PLANES</a>
                        </li>-->
                        <li class="px-2">
                            <a href="/contacto/" class="hover-underline">CONTÁCTANOS</a>
                        </li>
                        <!--<li class="px-2">
                            <a href="#" class="transition ease-in-out hover:text-verde"><i class="fa-solid fa-cart-shopping"></i></a>
                        </li>-->
                    </ul>            
                </nav>
                <div class="login-section flex flex-row items-center gap-4 pr-4">
                    <a href="/registro/" class="transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:bg-verde hover:text-white hover:border-verde">Registrarse</a>
                    <a href="/login/" class="transition ease-in-out hover:text-verde">Iniciar sesión</a>
                </div>  
                <div class="user-panel hidden flex flex-row items-center gap-4 pr-4"></div>
            </div>
        </div>

        <!--menu movil-->
        <div class="menuMobile bg-black fixed top-24 right-0 left-0 bottom-0 flex justify-center items-center flex-col gap-4 hidden z-10">
            <a href="/contacto/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde w-1/2">Contáctanos</a>
            <div class="login-section flex flex-col gap-4 w-full justify-center items-center">
                <a href="/registro/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde w-1/2">Registrarse</a>
                <a href="/login/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde w-1/2">Iniciar sesión</a>
            </div>
            <div  class="user-panel hidden flex flex-row items-center gap-4 w-1/2 text-center"></div>
        </div>

    `
};

const crearNavRegistro = () =>{
    //copiar todo el div dentro del nav que hice en el html
    navegacion.innerHTML = `
    <div  class="text-white font-medium flex justify-between h-24 bg-black"">
            <div>
                <a href="/">
                    <img src="/images/logo-energym2.png" alt="Energym Fitness Club" class="pl-4 h-24"">
                </a>
            </div>

            <!--movil-->
            <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24"
                stroke-width="1.5"ç
                stroke="currentColor"
                class="navButton w-24 h-24 md:hidden text-white cursor-pointer p-2 hover:text-verde rounded-lg">
                <path stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <!--pc-->
            <div class="hidden md:flex flex-row gap-4">
                <nav class="flex items-center">
                    <ul class="flex gap-4 justify-between">
                        <li class="px-2">
                            <a href="/" class="hover-underline">INICIO</a>
                        </li>
                        <li class="px-2">
                            <a href="/#us-section" class="hover-underline">NOSOTROS</a>
                        </li>
                        <!--<li class="px-2">
                            <a href="/#planes-section" class="hover-underline">PLANES</a>
                        </li>-->
                        <li class="px-2">
                            <a href="/contacto/" class="hover-underline">CONTÁCTANOS</a>
                        </li>
                        <li class="px-2">
                            <a href="#" class="transition ease-in-out hover:text-verde"><i class="fa-solid fa-cart-shopping"></i></a>
                        </li>
                    </ul>            
                </nav>
                <div class="flex flex-row items-center gap-4 pr-4">
                    <a href="/login/" class="transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:bg-verde hover:text-white hover:border-verde">Iniciar sesión</a>
                </div>  
            </div>
        </div>

        <!--menu movil-->
        <div class="menuMobile bg-black fixed top-24 right-0 left-0 bottom-0 flex justify-center items-center flex-col gap-4 hidden z-10" id="login-section">
            <a href="/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde w-1/2">Inicio</a>
            <a href="/contacto/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde w-1/2">Contáctanos</a>
            <a href="/login/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde w-1/2">Iniciar sesión</a>
       </div>
    `
};

const crearNavLogin = () =>{
  //copiar todo el div dentro del nav que hice en el html
  navegacion.innerHTML = `
  <div  class="text-white font-medium flex justify-between h-24 bg-black"">
            <div>
                <a href="/">
                    <img src="/images/logo-energym2.png" alt="Energym Fitness Club" class="pl-4 h-24"">
                </a>
            </div>

            <!--movil-->
            <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24"
                stroke-width="1.5"ç
                stroke="currentColor"
                class="navButton w-24 h-24 md:hidden text-white cursor-pointer p-2 hover:text-verde rounded-lg">
                <path stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <!--pc-->
            <div class="hidden md:flex flex-row gap-4">
                <nav class="flex items-center">
                    <ul class="flex gap-4 justify-between">
                        <li class="px-2">
                            <a href="/" class="hover-underline">INICIO</a>
                        </li>
                        <li class="px-2">
                            <a href="/#us-section" class="hover-underline">NOSOTROS</a>
                        </li>
                        <!--<li class="px-2">
                            <a href="/#planes-section" class="hover-underline">PLANES</a>
                        </li>-->
                        <li class="px-2">
                            <a href="/contacto/" class="hover-underline">CONTÁCTANOS</a>
                        </li>
                        <!--<li class="px-2">
                            <a href="#" class="transition ease-in-out hover:text-verde"><i class="fa-solid fa-cart-shopping"></i></a>
                        </li>-->
                    </ul>            
                </nav>
                <div class="flex flex-row items-center gap-4 pr-4">
                    <a href="/registro/" class="transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:bg-verde hover:text-white hover:border-verde">Registrarse</a>
                </div>  
            </div>
        </div>

        <!--menu movil-->
        <div class="menuMobile bg-black fixed top-24 right-0 left-0 bottom-0 flex justify-center items-center flex-col gap-4 hidden z-10" id="login-section">
            <a href="/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde w-1/2">Inicio</a>
            <a href="/contacto/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde w-1/2">Contáctanos</a>
            <a href="/registro/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde w-1/2">Registrarse</a>
       </div>
       
  `
};

const crearNavContacto = () =>{
  //copiar todo el div dentro del nav que hice en el html
  navegacion.innerHTML = `
    <div  class="text-white font-medium flex justify-between h-24 bg-black">
            <div>
                <a href="/">
                    <img src="/images/logo-energym2.png" alt="Energym Fitness Club" class="pl-4 h-24">
                </a>
            </div>

            <!--movil-->
            <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24"
                stroke-width="1.5"ç
                stroke="currentColor"
                class="navButton w-24 h-24 md:hidden text-white cursor-pointer p-2 hover:text-verde rounded-lg">
                <path stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <!--pc-->
            <div class="hidden md:flex flex-row gap-4">
                <nav class="flex items-center">
                    <ul class="flex gap-4 justify-between">
                        <li class="px-2">
                            <a href="/" class="hover-underline">INICIO</a>
                        </li>
                        <li class="px-2">
                            <a href="/#us-section" class="hover-underline">NOSOTROS</a>
                        </li>
                        <!--<li class="px-2">
                            <a href="/#planes-section" class="hover-underline">PLANES</a>
                        </li>-->
                        <li class="px-2">
                            <a href="/contacto/" class="hover-underline">CONTÁCTANOS</a>
                        </li>
                        <!--<li class="px-2">
                            <a href="#" class="transition ease-in-out hover:text-verde"><i class="fa-solid fa-cart-shopping"></i></a>
                        </li>-->
                    </ul>            
                </nav>
                <div class="login-section flex flex-row items-center gap-4 pr-4">
                    <a href="/registro/" class="transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:bg-verde hover:text-white hover:border-verde">Registrarse</a>
                    <a href="/login/" class="transition ease-in-out hover:text-verde">Iniciar sesión</a>
                </div>  
                <div class="user-panel hidden flex flex-row items-center gap-4 pr-4"></div>
            </div>
        </div>

        <!--menu movil-->
        <div class="menuMobile bg-black fixed top-24 right-0 left-0 bottom-0 flex justify-center items-center flex-col gap-4 hidden z-10">
            <a href="/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde w-1/2">Inicio</a>
            <div class="login-section flex flex-col gap-4 w-full justify-center items-center">
                <a href="/registro/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde w-1/2">Registrarse</a>
                <a href="/login/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde w-1/2">Iniciar sesión</a>
            </div>
            <div  class="user-panel hidden flex flex-row items-center gap-4 w-1/2 text-center"></div>
        </div>

    `
};

if(window.location.pathname === '/'){
    crearNavHome();
}else if(window.location.pathname === '/registro/'){
    crearNavRegistro();
}else if(window.location.pathname === '/login/'){
    crearNavLogin();
}else if(window.location.pathname === '/contacto/'){
    crearNavContacto();
}else{
    crearNavHome();
}

const navBoton = document.querySelector('.navButton')
const menuMobile = document.querySelector('.menuMobile')

navBoton.addEventListener('click', e=>{

    if(!navBoton.classList.contains('activo')){
        navBoton.classList.add('activo');
        navBoton.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />'
        menuMobile.classList.remove('hidden')
        menuMobile.classList.add('flex')
    }else{
        navBoton.classList.remove('activo')
        navBoton.innerHTML =' <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />'
        menuMobile.classList.remove('flex')
        menuMobile.classList.add('hidden')
    }
})

//validacion de sesion iniciada

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginSections = document.querySelectorAll('.login-section'); 
    const userPanels = document.querySelectorAll('.user-panel'); 

    if (user) {
        loginSections.forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('flex'); 
        });

        userPanels.forEach(panel => {
            panel.classList.remove('hidden'); 
            panel.classList.add('flex');
        });

        userPanels.forEach(panel => {
            if(user.rol === 'admin'){
                panel.innerHTML = `<a href="/panel-administrador" id="user-nombre" class="transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:bg-verde text-white hover:border-verde w-full"></a>`;
            } else if(user.rol === 'instructor'){
                panel.innerHTML = `<a href="/panel-instructor" id="user-nombre" class="transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:bg-verde text-white hover:border-verde w-full"></a>`;
            } else if(user.rol === 'afiliado'){
                panel.innerHTML = `<a href="/panel-usuario" id="user-nombre" class="transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:bg-verde text-white hover:border-verde w-full"></a>`;
            }
        });

        document.querySelectorAll('#user-nombre').forEach(nombreField => {
            nombreField.textContent = user.nombre;
        });
    }
});