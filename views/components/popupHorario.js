const popUp4 = document.querySelector('.popup4')
const btnCerrarPopup4 = document.querySelector('#cerrar-popup4');
const btnVerPopup4 = document.querySelector('#btn-ver-popup4');


//popup eventos
btnVerPopup4.addEventListener('click',()=>{
    popUp4.classList.remove('hidden')
    popUp4.classList.add('flex')
});

btnCerrarPopup4.addEventListener('click',()=>{
    popUp4.classList.add('hidden')
    popUp4.classList.remove('flex')
});