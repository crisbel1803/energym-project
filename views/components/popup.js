const btnVerPopup = document.querySelector('#btn-ver-popup');
const btnVerPopup2 = document.querySelector('#btn-ver-popup2');
const btnVerPopup3 = document.querySelector('#btn-ver-popup3');
const btnCerrarPopup = document.querySelector('#cerrar-popup');
const btnCerrarPopup2 = document.querySelector('#cerrar-popup2');
const btnCerrarPopup3 = document.querySelector('#cerrar-popup3');
const popUp = document.querySelector('.popup')
const popUp2 = document.querySelector('.popup2')
const popUp3 = document.querySelector('.popup3')

//popup clases
btnVerPopup.addEventListener('click',()=>{
    popUp.classList.remove('hidden')
    popUp.classList.add('flex')
});

btnCerrarPopup.addEventListener('click',()=>{
    popUp.classList.add('hidden')
    popUp.classList.remove('flex')
});

//popup instructores
btnVerPopup2.addEventListener('click',()=>{
    popUp2.classList.remove('hidden')
    popUp2.classList.add('flex')
});

btnCerrarPopup2.addEventListener('click',()=>{
    popUp2.classList.add('hidden')
    popUp2.classList.remove('flex')
});

//popup salones
btnVerPopup3.addEventListener('click',()=>{
    popUp3.classList.remove('hidden')
    popUp3.classList.add('flex')
});

btnCerrarPopup3.addEventListener('click',()=>{
    popUp3.classList.add('hidden')
    popUp3.classList.remove('flex')
});