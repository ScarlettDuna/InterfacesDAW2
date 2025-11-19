let brain = document.getElementById("brain")
let catalogo = document.getElementById("catalogo")
let form = document.querySelector(".form")

brain.addEventListener("click", () => {
    catalogo.classList.remove("activo")
    brain.classList.add("activo")
    form.innerHTML = `<form action="./resultado.html" method="post">
            <input type="text" name="text">
            <button type="submit">Buscar</button>
            <button type="reset">Limpiar</button>
        </form>`;
})

catalogo.addEventListener('click', () => {
    brain.classList.remove("activo")
    catalogo.classList.add("activo")
    form.innerHTML = `<form action="./resultado.html" method="post">
            <input type="text" name="text"> en:
            <select name="" id="">
                <option value="cualquier">CUALQUIER CAMPO</option>
                <option value="autor">AUTOR</option>
                <option value="titulo">TÍTULO</option>
                <option value="materia">MATERIA</option>
                <option value="revista">TÍTULO DE REVISTA</option>
            </select>
            <button type="submit">Buscar</button>
            <button type="reset">Limpiar</button>
        </form>`;
})