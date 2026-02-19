// Estado
let carreras = [];
let sugerenciasActivas = false;
let timeoutId = null;

// Carga JSON
async function cargarCarreras() {
    const res = await fetch('./races.json');
    const data = await res.json();
    carreras = data;
    console.log(carreras)
}
cargarCarreras();

// Elementos 
let buscador = document.getElementById('inputBuscador')
let resultadoBusqueda = document.querySelector('.resultados ul')
let btnSugerencia = document.getElementById('suggestions');

// Modo sugerencia 


btnSugerencia.addEventListener('click', () => {
    sugerenciasActivas = !sugerenciasActivas;
    if (sugerenciasActivas) {
        btnSugerencia.classList.add('activo');
        btnSugerencia.classList.remove('inactivo')
    } else {
        btnSugerencia.classList.add('inactivo');
        btnSugerencia.classList.remove('activo');
        resultadoBusqueda.innerHTML = '';
    }

})


// Búsqueda interactiva

buscador.addEventListener('input', () => {
    if (!sugerenciasActivas) return;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        const busqueda = buscador.value.trim().toLowerCase();
        if (busqueda === '') {
            resultadoBusqueda.innerHTML = '';
            return;
        }
        resultadoBusqueda.innerHTML = '';
        const opciones = carreras
            .filter(carrera =>
                carrera.name.toLowerCase().includes(busqueda)
            )
            .slice(0, 5); // límite de resultados
        if (opciones.length === 0) {
            resultadoBusqueda.parentElement.style.display = 'none';
            return;
        }
        resultadoBusqueda.parentElement.style.display = 'block';
        for (let carrera of opciones) {
            const li = document.createElement('li');
            li.innerText = carrera.name;
            resultadoBusqueda.appendChild(li);
        }
    }, 300); // espera 300ms antes de buscar
});

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
