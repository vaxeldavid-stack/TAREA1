
// Obtener los alumnos guardados
let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

// Obtener elementos del HTML
const formulario = document.getElementById("formulario");
const listaAlumnos = document.getElementById("listaAlumnos");

// Mostrar alumnos cuando se abre o recarga la página
mostrarAlumnos();

// Registrar alumno
formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    // Obtener datos del formulario
    const nombre = document.getElementById("nombre").value;
    const matematicas = Number(document.getElementById("matematicas").value);
    const espanol = Number(document.getElementById("espanol").value);
    const historia = Number(document.getElementById("historia").value);

    // Calcular promedio
    const promedio = (matematicas + espanol + historia) / 3;

    // Determinar estado
    let estado;

    if (promedio >= 6) {
        estado = "Aprobado";
    } else {
        estado = "Reprobado";
    }

    // Crear objeto del alumno
    const alumno = {
        nombre: nombre,
        matematicas: matematicas,
        espanol: espanol,
        historia: historia,
        promedio: promedio.toFixed(2),
        estado: estado
    };

    // Agregar alumno al arreglo
    alumnos.push(alumno);

    // Guardar en localStorage
    localStorage.setItem("alumnos", JSON.stringify(alumnos));

    // Mostrar los alumnos
    mostrarAlumnos();

    // Limpiar formulario
    formulario.reset();
});


// Función para mostrar alumnos
function mostrarAlumnos() {

    listaAlumnos.innerHTML = "";

    alumnos.forEach(function(alumno, indice) {

        const div = document.createElement("div");

        div.classList.add("alumno");

        let claseEstado;

        if (alumno.estado === "Aprobado") {
            claseEstado = "aprobado";
        } else {
            claseEstado = "reprobado";
        }

        div.innerHTML = `
            <h3>${alumno.nombre}</h3>

            <p>Matemáticas: ${alumno.matematicas}</p>
            <p>Español: ${alumno.espanol}</p>
            <p>Historia: ${alumno.historia}</p>

            <p>
                <strong>Promedio:</strong> ${alumno.promedio}
            </p>

            <p class="${claseEstado}">
                Estado: ${alumno.estado}
            </p>

            <button class="eliminar" onclick="eliminarAlumno(${indice})">
                Eliminar
            </button>
        `;

        listaAlumnos.appendChild(div);
    });
}


// Función para eliminar un alumno
function eliminarAlumno(indice) {

    alumnos.splice(indice, 1);

    localStorage.setItem("alumnos", JSON.stringify(alumnos));

    mostrarAlumnos();
}
