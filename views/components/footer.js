const footer = document.querySelector('#footer');

const crearFooterHome = () =>{
footer.innerHTML = `
        <!--footer movil-->
        <div class="md:hidden flex flex-col border-t border-verde">
            <div class="flex justify-center">
                <a href="/">
                    <img src="/images/logo-footer.png" alt="Energym Fitness Club" class="h-24">
                </a>
            </div>
            <div class="login-section flex flex-col mx-auto gap-6 w-1/2 pb-6">
                <a href="/registro/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde">Registro</a>
                <a href="/login/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde">Iniciar sesión</a>
            </div>
            <div  class="user-panel hidden flex flex-row justify-center w-full py-10 text-center"></div>
            <p class="text-center text-white py-8 bg-gris">
                &copy;2025 <span class="hover:underline hover:text-verde">ENERGYM</span> Todos los derechos reservados - Creado por Crisbel C
            </p>
        </div>

        <!--footer pc-->
        <div class="hidden md:flex flex-col border-t border-verde">
            <div class="flex justify-center">
                <a href="/">
                    <img src="/images/logo-footer.png" alt="Energym Fitness Club" class="h-40">
                </a>
            </div>
            <div class="flex w-2/5 mx-auto flex-row">
                <div class="p-4 w-1/2 text-start">
                    <h3 class="text-verde text-2xl uppercase font-bold pb-2">Redes sociales</h3>
                    <p class="text-white pb-2">¡Visita nuestras redes sociales y mantente al día con todo lo que necesitas para alcanzar tus metas de fitness!</p>
                    <ul class="flex flex-row gap-12 justify-center">
                        <li><a href="#"><i class="fa-brands fa-square-facebook" style="color: #ffffff;"></i></a></li>
                        <li><a href="#"><i class="fa-brands fa-tiktok" style="color: #ffffff;"></i></a></li>
                        <li><a href="#"><i class="fa-brands fa-instagram" style="color: #ffffff;"></i></a></li>
                    </ul>
                </div>
                <div class="p-4 w-1/2 text-start">
                    <h3 class="text-verde text-2xl uppercase font-bold pb-2">Contáctanos</h3>
                    <ul>
                        <li><i class="fa-solid fa-location-dot" style="color: #00c24f;"></i><span class="text-white pl-2">Caracas, Venezuela</span></li>
                        <li><i class="fa-solid fa-envelope" style="color: #00c24f;"></i><span class="text-white pl-2">correo123@gmail.com</span></li>
                        <li><i class="fa-solid fa-phone" style="color: #00c24f;"></i><span class="text-white pl-2">(+58) 412-011-4441</span></li>
                    </ul>
                </div>
            </div>
            <p class="font-medium text-center text-white py-8 text-xs bg-gris">
                &copy;2025 <span class="hover:underline hover:text-verde">ENERGYM</span> Todos los derechos reservados - Creado por Crisbel C
            </p>
        </div>
    `
};

const crearFooterRegistro = () =>{
    footer.innerHTML = `
            <!--footer movil-->
            <div class="md:hidden flex flex-col border-t border-verde">
                <div class="flex justify-center">
                    <a href="/">
                        <img src="/images/logo-footer.png" alt="Energym Fitness Club" class="h-24">
                    </a>
                </div>
                <div class="flex flex-col mx-auto gap-6 w-1/2 pb-6">
                    <a href="/login/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde">Iniciar sesión</a>
                </div>
                <p class="text-center text-white py-8 bg-gris">
                    &copy;2025 <span class="hover:underline hover:text-verde">ENERGYM</span> Todos los derechos reservados - Creado por Crisbel C
                </p>
            </div>
    
            <!--footer pc-->
            <div class="hidden md:flex flex-col border-t border-verde">
                <div class="flex justify-center">
                    <a href="/">
                        <img src="/images/logo-footer.png" alt="Energym Fitness Club" class="h-40">
                    </a>
                </div>
                <div class="flex w-2/5 mx-auto flex-row">
                    <div class="p-4 w-1/2 text-start">
                        <h3 class="text-verde text-2xl uppercase font-bold pb-2">Redes sociales</h3>
                        <p class="text-white pb-2">¡Visita nuestras redes sociales y mantente al día con todo lo que necesitas para alcanzar tus metas de fitness!</p>
                        <ul class="flex flex-row gap-12 justify-center">
                            <li><a href="#"><i class="fa-brands fa-square-facebook" style="color: #ffffff;"></i></a></li>
                            <li><a href="#"><i class="fa-brands fa-tiktok" style="color: #ffffff;"></i></a></li>
                            <li><a href="#"><i class="fa-brands fa-instagram" style="color: #ffffff;"></i></a></li>
                        </ul>
                    </div>
                    <div class="p-4 w-1/2 text-start">
                        <h3 class="text-verde text-2xl uppercase font-bold pb-2">Contáctanos</h3>
                        <ul>
                            <li><i class="fa-solid fa-location-dot" style="color: #00c24f;"></i><span class="text-white pl-2">Caracas, Venezuela</span></li>
                            <li><i class="fa-solid fa-envelope" style="color: #00c24f;"></i><span class="text-white pl-2">correo123@gmail.com</span></li>
                            <li><i class="fa-solid fa-phone" style="color: #00c24f;"></i><span class="text-white pl-2">(+58) 412-011-4441</span></li>
                        </ul>
                    </div>
                    <div class=""></div>
                    <div class=""></div>
                </div>
                <p class="font-medium text-center text-white py-8 text-xs bg-gris">
                    &copy;2025 <span class="hover:underline hover:text-verde">ENERGYM</span> Todos los derechos reservados - Creado por Crisbel C
                </p>
            </div>
        `
    };

    const crearFooterLogin = () =>{
        footer.innerHTML = `
                <!--footer movil-->
                <div class="md:hidden flex flex-col border-t border-verde">
                    <div class="flex justify-center">
                        <a href="/">
                            <img src="/images/logo-footer.png" alt="Energym Fitness Club" class="h-24">
                        </a>
                    </div>
                    <div class="flex flex-col mx-auto gap-6 w-1/2 pb-6">
                        <a href="/registro/" class="text-center transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:text-verde text-white hover:border-verde">Registro</a>
                    </div>
                    <p class="text-center text-white py-8 bg-gris">
                        &copy;2025 <span class="hover:underline hover:text-verde">ENERGYM</span> Todos los derechos reservados - Creado por Crisbel C
                    </p>
                </div>
        
                <!--footer pc-->
                <div class="hidden md:flex flex-col border-t border-verde">
                    <div class="flex justify-center">
                        <a href="/">
                            <img src="/images/logo-footer.png" alt="Energym Fitness Club" class="h-40">
                        </a>
                    </div>
                    <div class="flex w-2/5 mx-auto flex-row">
                        <div class="p-4 w-1/2 text-start">
                            <h3 class="text-verde text-2xl uppercase font-bold pb-2">Redes sociales</h3>
                            <p class="text-white pb-2">¡Visita nuestras redes sociales y mantente al día con todo lo que necesitas para alcanzar tus metas de fitness!</p>
                            <ul class="flex flex-row gap-12 justify-center">
                                <li><a href="#"><i class="fa-brands fa-square-facebook" style="color: #ffffff;"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-tiktok" style="color: #ffffff;"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-instagram" style="color: #ffffff;"></i></a></li>
                            </ul>
                        </div>
                        <div class="p-4 w-1/2 text-start">
                            <h3 class="text-verde text-2xl uppercase font-bold pb-2">Contáctanos</h3>
                            <ul>
                                <li><i class="fa-solid fa-location-dot" style="color: #00c24f;"></i><span class="text-white pl-2">Caracas, Venezuela</span></li>
                                <li><i class="fa-solid fa-envelope" style="color: #00c24f;"></i><span class="text-white pl-2">correo123@gmail.com</span></li>
                                <li><i class="fa-solid fa-phone" style="color: #00c24f;"></i><span class="text-white pl-2">(+58) 412-011-4441</span></li>
                            </ul>
                        </div>
                        <div class=""></div>
                        <div class=""></div>
                    </div>
                    <p class="font-medium text-center text-white py-8 text-xs bg-gris">
                        &copy;2025 <span class="hover:underline hover:text-verde">ENERGYM</span> Todos los derechos reservados - Creado por Crisbel C
                    </p>
                </div>
            `
        };

if(window.location.pathname === '/'){
    crearFooterHome();
}else if(window.location.pathname === '/registro/'){
    crearFooterRegistro();
}else if(window.location.pathname === '/login/'){
    crearFooterLogin();
}else{
    crearFooterHome();
}

//validar sesion iniciada
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginSection = document.querySelector('.login-section'); 
    const userPanel = document.querySelector('.user-panel'); 

    if (user) {
            loginSection.classList.add('hidden');
            loginSection.classList.remove('flex'); 
        };

        userPanel.classList.remove('hidden');
        userPanel.classList.add('flex');

        if(user.rol === 'admin'){
                userPanel.innerHTML = `<a href="/panel-administrador" id="user-nombre" class="transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:bg-verde text-white hover:border-verde"></a>`;
            } else if(user.rol === 'instructor'){
                userPanel.innerHTML = `<a href="/panel-instructor" id="user-nombre" class="transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:bg-verde text-white hover:border-verde"></a>`;
            } else if(user.rol === 'afiliado'){
                userPanel.innerHTML = `<a href="/panel-usuario" id="user-nombre" class="transition ease-in-out font-bold border-1 py-2 px-8 rounded-3xl hover:bg-verde text-white hover:border-verde"></a>`;
            }

        document.querySelector('#user-nombre').textContent = user.nombre;
    
});