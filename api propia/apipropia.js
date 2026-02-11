// definimos la url de la api
const urlApi = "https://equipo5uthh.grupoahost.com/api/get_pacientes.php";

// funcion para cargar los datos de la api
const cargarDatos = () => {
    fetch(urlApi)
        .then(respuesta => respuesta.json())
        .then(data => {

            
            const datos = data.pacientes;
            console.log("Datos recibidos:", datos);

            // mandamos los datos para mostrarlos
            mostrardatos(datos);
        })
        .catch(error => {
            console.error("error, no se pudieron cargar los datos", error);
            alert("Hubo un error al cargar los datos, revisa por favor");
        });
};

// funcion para mostrar los datos en pantalla
const mostrardatos = (datos) => {
    const contenedorDatos = document.getElementById("contenedor-datos");
    contenedorDatos.innerHTML = "";

    datos.forEach(dato => {

        const muestra = document.createElement("div");
        muestra.classList.add("practice-card");

        muestra.innerHTML = `
            <div class="icono">
                <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Paciente">
            </div>

            <h3>${dato.nombre}  ${dato.apellido_materno}</h3>
            <p><strong>Matrícula </strong> ${dato.matricula_o_numero_trabajador}</p>
            <p><strong>Carrera:</strong> ${dato.Carrera || ""}</p>
            <p><strong>Grupo:</strong> ${dato.Grupo || "No asignado"}</p>
        `;

        contenedorDatos.appendChild(muestra);
    });
};
