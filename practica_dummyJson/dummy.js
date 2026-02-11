const urlApi = "https://dummyjson.com/products";
let listaProductos = [];

const cargarProductos = () => {
    fetch(urlApi)
        .then(res => res.json())
        .then(data => {
            listaProductos = data.products;
            mostrarProductos(listaProductos);
        })
        .catch(error => console.error("Error:", error));
};

const mostrarProductos = (productos) => {
    const cont = document.getElementById("contenedorproductos");
    cont.innerHTML = "";

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${producto.thumbnail}">
            <h3>${producto.title}</h3>
            <p><strong>$${producto.price}</strong></p>
            <p>Categoría: ${producto.category}</p>
            <p>${producto.rating}</p>
        `;

        card.onclick = () => mostrarDetalle(producto);
        cont.appendChild(card);
    });
};

const mostrarDetalle = (producto) => {
    const detalle = document.getElementById("detalleProducto");
    detalle.classList.remove("oculto");

    let reviewsHTML = "";
    producto.reviews.forEach(r => {
        reviewsHTML += `<li>${r.reviewerName}: ${r.rating} - ${r.comment}</li>`;
    });

    detalle.innerHTML = `
        <button onclick="cerrarDetalle()">X</button>
        <h2>${producto.title}</h2>
        <img src="${producto.thumbnail}">
        <p>${producto.description}</p>
        <p><strong>Precio:</strong> $${producto.price}</p>
        <p><strong>Marca:</strong> ${producto.brand}</p>

        <h3>Opiniones</h3>
        <ul>${reviewsHTML}</ul>
    `;
};

const cerrarDetalle = () => {
    document.getElementById("detalleProducto").classList.add("oculto");
};

document.getElementById("buscador").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrados = listaProductos.filter(p =>
        p.title.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
});

cargarProductos();
