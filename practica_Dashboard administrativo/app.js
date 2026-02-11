const tableBody = document.getElementById("productsTable");
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");
const pageInfo = document.getElementById("pageInfo");

let skip = 0;
const limit = 10;
let total = 0;
let currentUrl = "";


fetch("https://dummyjson.com/products/category-list")
    .then(res => res.json())
    .then(categories => {
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });
    });


function loadProducts(url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`) {
    currentUrl = url;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            total = data.total;
            renderTable(data.products);
            pageInfo.textContent = `Página ${skip / limit + 1} de ${Math.ceil(total / limit)}`;
        });
}


function renderTable(products) {
    tableBody.innerHTML = "";

    products.forEach(p => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.id}</td>
            <td><img src="${p.thumbnail}"></td>
            <td>${p.title}</td>
            <td>$${p.price}</td>
            <td>${p.category}</td>
            <td>
                <a href="editar.html?id=${p.id}">
                    <button>Editar</button>
                </a>
                <button onclick="deleteProduct(${p.id})">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });
}


document.getElementById("nextBtn").onclick = () => {
    if (skip + limit < total) {
        skip += limit;
        loadProducts();
    }
};

document.getElementById("prevBtn").onclick = () => {
    if (skip > 0) {
        skip -= limit;
        loadProducts();
    }
};


document.getElementById("searchBtn").onclick = () => {
    const q = searchInput.value.trim();
    if (q) {
        loadProducts(`https://dummyjson.com/products/search?q=${q}`);
    }
};


categorySelect.onchange = () => {
    const cat = categorySelect.value;
    if (cat) {
        loadProducts(`https://dummyjson.com/products/category/${cat}`);
    } else {
        skip = 0;
        loadProducts();
    }
};


document.getElementById("sortSelect").onchange = e => {
    const value = e.target.value;
    if (!value) return loadProducts();

    const [campo, tipo] = value.split("-");
    loadProducts(`https://dummyjson.com/products?sortBy=${campo}&order=${tipo}`);
};


function editProduct(id) {
    const nuevoTitulo = prompt("Nuevo título:");
    const nuevoPrecio = prompt("Nuevo precio:");

    fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: nuevoTitulo,
            price: nuevoPrecio
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Producto actualizado");
        loadProducts(currentUrl);
    });
}

function deleteProduct(id) {
    if (!confirm("¿Eliminar producto?")) return;

    fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
        alert("Producto eliminado");
        loadProducts(currentUrl);
    });
}

loadProducts();
