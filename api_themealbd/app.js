const mealsContainer = document.getElementById("mealsContainer");
const mealDetail = document.getElementById("mealDetail");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");


// Endpoint base
const API_URL = "https://www.themealdb.com/api/json/v1/1/";


searchBtn.addEventListener("click", () => {
    const searchTerm = searchInput.value;
    fetchMeals(searchTerm);
});

//categorias
function fetchCategories() {
    fetch(`${API_URL}categories.php`)
        .then(response => response.json())
        .then(data => {
            loadCategories(data.categories);
        });
}
function loadCategories(categories) {
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.strCategory;
        option.textContent = category.strCategory;
        categorySelect.appendChild(option);
    });
}

categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;

    if (selectedCategory === "") {
        fetchMeals(); 
    } else {
        fetchMealsByCategory(selectedCategory);
    }
});


function fetchMealsByCategory(category) {
    fetch(`${API_URL}filter.php?c=${category}`)
        .then(response => response.json())
        .then(data => {
            showMeals(data.meals);
        });
}


// Función para obtener listado (Endpoint 1)
function fetchMeals(query = "") {
    fetch(`${API_URL}search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            showMeals(data.meals);
        });
}

// mostrar tarjetas
function showMeals(meals) {
    mealsContainer.innerHTML = "";
    mealDetail.classList.add("hidden");

    if (!meals) {
        mealsContainer.innerHTML = "<p>No se encontraron resultados</p>";
        return;
    }

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        `;

        //  Endpoint 2
        card.addEventListener("click", () => {
            fetchMealDetail(meal.idMeal);
        });

        mealsContainer.appendChild(card);
    });
}

// Obtener detalle por ID (Endpoint 2)
function fetchMealDetail(id) {
    fetch(`${API_URL}lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            showMealDetail(data.meals[0]);
        });
}

// Mostrar detalle
function showMealDetail(meal) {
    mealsContainer.innerHTML = "";
    mealDetail.classList.remove("hidden");

    // Obtener ingredientes (máx 20 en la API)
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredients += `<li>${ingredient} - ${measure}</li>`;
        }
    }

    mealDetail.innerHTML = `
        <button class="back-btn" onclick="fetchMeals()">Volver</button>

        <div class="detail-card">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

            <div class="detail-info">
                <h2>${meal.strMeal}</h2>
                <p><strong>Categoría:</strong> ${meal.strCategory}</p>
                <p><strong>Origen:</strong> ${meal.strArea}</p>

                <h3>Ingredientes</h3>
                <ul class="ingredients">
                    ${ingredients}
                </ul>

                <h3>Instrucciones</h3>
                <p>${meal.strInstructions}</p>
            </div>
        </div>
    `;
}


fetchMeals();
fetchMeals();
fetchCategories();

