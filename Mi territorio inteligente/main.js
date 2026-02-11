let map;

function ubicar() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            () => {

            
                const casaLati = 21.019057;
                const casaLng = -98.344472;
                const ubicacion = [casaLati, casaLng];

               
                map = L.map('map').setView(ubicacion, 19);

                
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);

                
                L.marker(ubicacion)
                    .addTo(map)
                    .bindPopup(
                        "<b>Mi casa </b><br>Latitud: 21.019057<br>Longitud: -98.344472"
                    )
                    .openPopup();

                
                const perimetroCasa = [
                    [casaLati + 0.00003, casaLng - 0.00003],
                    [casaLati + 0.00003, casaLng + 0.00003],
                    [casaLati - 0.00003, casaLng + 0.00003],
                    [casaLati - 0.00003, casaLng - 0.00003]
                ];

                const poligono = L.polygon(perimetroCasa, {
                    color: 'blue',
                    fillColor: '#3498DB',
                    fillOpacity: 0.4
                }).addTo(map);

                
                poligono.on('click', () => {
                    poligono
                        .bindPopup(
                            "<b>Mi territorio inteligente </b><br>Zona delimitada correspondiente a mi domicilio."
                        )
                        .openPopup();
                });

            },
            (error) => {
                alert("no se puede obtener las cordenadas por: " + error.message);
            }
        );

    } else {
        alert("Tu navegador no sirve ");
    }
}
