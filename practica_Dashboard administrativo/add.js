document.getElementById("addForm").onsubmit = e => {
    e.preventDefault();

    fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title.value,
            price: price.value
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Producto agregado (simulado)");
        window.location.href = "index.html";
    });
};
