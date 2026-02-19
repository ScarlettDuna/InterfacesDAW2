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

