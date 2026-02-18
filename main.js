const cloudName = "dxjx4j5iq";
const preset = "practica_dana"; 

const inputf = document.getElementById("fileinput");
const imagen = document.getElementById("imagen");
const boton = document.getElementById("btnSubir");
const estado = document.getElementById("estado");

function subirimg() {

    const foto = inputf.files[0];

    if (!foto) {
        alert("Selecciona una imagen primero");
        return;
    }

    if (!foto.type.startsWith("image/")) {
        alert("Solo se permiten imágenes");
        return;
    }

    boton.disabled = true;
    estado.textContent = "Subiendo...";

    const formdata = new FormData();
    formdata.append("file", foto);
    formdata.append("upload_preset", preset);

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formdata
    })
    .then(response => response.json()) 
    .then(data => {

        console.log(data); 

        if (data.error) {
            throw new Error(data.error.message);
        }

       
        const urlOriginal = data.secure_url;

        const urlTransformada = urlOriginal.replace(
            "/upload/",
            "/upload/c_fill,g_auto,h_720,w_1280/e_grayscale/r_5/"
        );

        imagen.src = urlTransformada;
        imagen.style.display = "block";

        estado.textContent = "Imagen subida correctamente";
    })
    .catch(error => {
        console.error("Error:", error.message);
        estado.textContent = "Error: " + error.message;
    })
    .finally(() => {
        boton.disabled = false;
    });
}
