const slider = document.getElementById("slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicadores = document.querySelectorAll(".indicator");

let index = 0;

function actSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;
    
    indicadores.forEach((punto, i) => {
        punto.classList.toggle("bg-white", i === index);
        punto.classList.toggle("bg-gray-500", i !== index);
    });
}

prevBtn.addEventListener("click", () => {
    index = index > 0 ? index - 1 : slider.children.length - 1;
    actSlider();
});

nextBtn.addEventListener("click", () => {
    index = index < slider.children.length - 1 ? index + 1 : 0;
    actSlider();
});

function nextSlide() {
    index = (index + 1) % slider.children.length;
    actSlider();
}
setInterval(nextSlide, 3000);

indicadores.forEach((punto, i) => {
    punto.addEventListener("click", () => {
        index = i;
        actSlider();
    });
});