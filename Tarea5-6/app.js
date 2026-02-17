// Modo sugerencia 
let btnSugerencia = document.getElementById('suggestions');
let sugerenciasActivas = false;
btnSugerencia.addEventListener('click', (e) => {
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


// Búsqueda interactiva
if (sugerenciasActivas) {
    let carreras = [];
    async function cargarCarreras() {
    const res = await fetch('./races.json');
    const data = await res.json();
    carreras = data;
    }

    cargarCarreras();
    let buscador = document.getElementById('inputBuscador')
    let resultadoBusqueda = document.querySelector('.resultados ul')

    buscador.addEventListener('input', () => {
        let busqueda = buscador.value.trim();
        if (busqueda === '') {
            resultadoBusqueda.innerHTML = '';
            return;
        }
        let opciones = []
        for (let carrera of carreras) {
            if (carrera['name'].includes(busqueda)) {
                opciones.push(carrera['name'])
            }
        }
        // limitamos el número de resultados mostrados a 5
        opciones = opciones.slice(0, 5);
        for (let opcion of opciones) {
            let newElem = document.createElement('li')
            newElem.innerText = opcion
            resultadoBusqueda.appendChild(newElem)
        }
    })
}
