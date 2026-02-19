// Modo sugerencia 
let btnSugerencia = document.getElementById('suggestions');
let btnFiltro = document.getElementById('filtro')
let sugerenciasActivas = false;
btnSugerencia.addEventListener('click', () => {
    if (!sugerenciasActivas) {
        sugerenciasActivas = true;
        btnSugerencia.classList.add('activo');
        btnSugerencia.classList.remove('inactivo')
    } else {
        sugerenciasActivas = false;
        btnSugerencia.classList.add('inactivo');
        btnSugerencia.classList.remove('activo')
    }
    
})


// Sección de coundowns para proximas carreras

let countdownTokio = new Date("2026-03-01T09:10:00+09:00").getTime();
let countdownBoston = new Date("2026-04-20T09:00:00-04:00").getTime();
let countdownLondres = new Date("2026-04-26T09:30:00+01:00").getTime();
let countdownMadrid = new Date("2026-04-26T08:45:00+02:00").getTime();
let timerTokio = document.querySelector('.countdown1');
let timerBoston = document.querySelector('.countdown2');
let timerMadrid = document.querySelector('.countdown3');
let timerLondres = document.querySelector('.countdown4');

function timerFunction(countdown, parrafoSalida) {
    let idInterval = setInterval(() => {
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countdown - now;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(idInterval);
            parrafoSalida.innerHTML = "Ya pasó";
            return;
        }

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let minFormatted = String(minutes).padStart(2, '0');
        let secFormatted = String(seconds).padStart(2, '0');

        // Display the result 
        parrafoSalida.innerText = `Quedan: ${days}d ${hours}:${minFormatted}:${secFormatted}`;
        
    }, 1000);
}

timerFunction(countdownTokio, timerTokio)
timerFunction(countdownBoston, timerBoston)
timerFunction(countdownMadrid, timerMadrid)
timerFunction(countdownLondres, timerLondres)

// Carousel Cerca de ti
const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;
const cardWidth = track.children[0].offsetWidth;
const visibleCards = 4;

nextBtn.addEventListener('click', () => {
    const totalCards = track.children.length;

    if (index < totalCards - visibleCards) {
        index++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
        updateCarousel();
    }
});

function updateCarousel() {
    track.style.transform = `translateX(-${index * cardWidth}px)`;
}
