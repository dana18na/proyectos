const usuario = "dana18na";


fetch(`https://api.github.com/users/${usuario}`)
    .then(res => res.json())
    .then(data => {
        const perfil = document.getElementById("perfil");

        perfil.innerHTML = `
            <div style="text-align:center; margin-bottom:40px;">
                <img src="${data.avatar_url}" width="120" style="border-radius:50%;">
                <h2>${data.name || usuario}</h2>
                <p>${data.bio || "Desarrolladora web"}</p>
                <p> ${data.location || "México"}</p>
            </div>
        `;
    })
    .catch(() => {
        document.getElementById("perfil").innerHTML =
            "<p>Error al cargar el perfil</p>";
    });


fetch(`https://api.github.com/users/${usuario}/repos?sort=updated&per_page=6&type=owner&direction=desc`)
    .then(res => res.json())
    .then(repos => {
        const contenedor = document.getElementById("repos");
        contenedor.innerHTML = "";

        repos.forEach(repo => {
            contenedor.innerHTML += `
                <div class="project-card">
                    <h2>${repo.name}</h2>
                    <p>${repo.description || "Repositorio sin descripción."}</p>

                    <div class="card-buttons">
                        <a href="${repo.html_url}" target="_blank">Ver código</a>
                        <a href="${repo.homepage ? repo.homepage : repo.html_url}" target="_blank">
                            Ver proyecto
                        </a>
                    </div>
                </div>
            `;
        });
    })
    .catch(() => {
        document.getElementById("repos").innerHTML =
            "<p>Error al cargar los repositorios</p>";
    });

fetch(`https://api.github.com/users/${usuario}/followers?per_page=5`)
    .then(res => res.json())
    .then(followers => {
        const contenedor = document.getElementById("followers");
        contenedor.innerHTML = "";

        followers.forEach(f => {
            contenedor.innerHTML += `
                <img 
                    src="${f.avatar_url}" 
                    title="${f.login}"
                    width="50"
                    style="border-radius:50%; margin:8px;"
                >
            `;
        });
    })
    .catch(() => {
        document.getElementById("followers").innerHTML =
            "<p>Error al cargar la comunidad</p>";
    });
