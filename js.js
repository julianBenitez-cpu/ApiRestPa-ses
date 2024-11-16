const buscador = document.getElementById("buscador");
const resultados = document.getElementById("resultados");
let paises = [];

async function cargarP() {
    try {
        const respuesta = await fetch('https://restcountries.com/v3.1/all');
        if (!respuesta.ok) {
            throw new Error("Algo está mal (no se pudo cargar ningun país)");
        }
        paises = await respuesta.json();
        mostrarP(paises);
    } catch (error) {
        resultados.innerHTML = "Uh. Hay un error";
    }
}

function filtrarP(termino) {
    const paisesFiltrados = paises.filter(pais => {
        const nombreEnEspañol = pais.translations?.spa?.common || "";
        return nombreEnEspañol.toLowerCase().includes(termino.toLowerCase());
    });

    if (paisesFiltrados.length > 0) {
        mostrarP(paisesFiltrados);
    } else {
        resultados.innerHTML = "No se pudo encontrar ese país (escribilo bien)";
    }
}

function mostrarP(listaDePaises) {
    resultados.innerHTML = listaDePaises.map(pais => {
            const nombreEnEspañol = pais.translations?.spa?.common || pais.name.common;
            return `<div class="pais">
                    <img src="${pais.flags.png}" alt="Bandera de ${nombreEnEspañol}">
                    <h2>${nombreEnEspañol}</h2>
                    <p>Capital: ${pais.capital || 'No disponible'}</p>
                    <p>Población: ${pais.population.toLocaleString('es-ES')}</p>
                </div>`;})
        .join('');
}

buscador.addEventListener("input", (evento) => {
    const termino = evento.target.value;
    if (termino === " ") {
        mostrarP(paises); 
    } else {
        filtrarP(termino);
    } 
});

cargarP();