
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');

const cargarProducto = () => {
    if (!id) return;

    fetch('https://dummyjson.com/products/' + id)
        .then(res => res.json())
        .then(producto => {
            document.getElementById('titulo').value = producto.title || '';
            document.getElementById('precio').value = producto.price || '';
            document.getElementById('descripcion').value = producto.description || '';
            document.getElementById('categoria').value = producto.category || '';
            document.getElementById('imagen').value =
                (producto.images && producto.images[0]) || producto.thumbnail || '';
        })
        .catch(err => console.error('Error al cargar producto', err));
};

const editarProducto = () => {
    const titulo = document.getElementById('titulo').value;
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;
    const imagen = document.getElementById('imagen').value;
    const cajaMensaje = document.getElementById('mensaje-exito');

    if (!titulo || !precio || !descripcion) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }

    const productoActualizado = {
        title: titulo,
        price: parseFloat(precio),
        description: descripcion,
        category: categoria
    };

    if (imagen) {
        productoActualizado.thumbnail = imagen;
    }

    fetch('https://dummyjson.com/products/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado)
    })
        .then(res => res.json())
        .then(producto => {
            cajaMensaje.style.display = 'block';
            cajaMensaje.innerHTML = `
                <strong>¡Producto actualizado!</strong><br>
                ID: ${producto.id}<br>
                Producto: ${producto.title}<br>
                <small>
                    Nota: DummyJSON es una API de prueba, los cambios no se guardan realmente.
                </small>
            `;

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        })
        .catch(error => {
            console.error('Error al actualizar el producto:', error);
            cajaMensaje.style.display = 'block';
            cajaMensaje.textContent = 'Error al actualizar el producto.';
        });
};

// iniciar
cargarProducto();
