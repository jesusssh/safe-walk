const botones = document.querySelectorAll(".tipo-btn");

botones.forEach(btn => {

    btn.addEventListener("click", () => {

        botones.forEach(b => {
            b.classList.remove("activo");
        });

        btn.classList.add("activo");

    });

});
let mapa;
let marcador;
let circulo;

window.onload = function(){

    navigator.geolocation.getCurrentPosition(

        function(pos){

            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            mapa = L.map("mapaIncidente")
                .setView([lat,lng],18);

            L.tileLayer(
                "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    maxZoom:19
                }
            ).addTo(mapa);

            L.marker([lat,lng])
                .addTo(mapa)
                .bindPopup("Tu ubicación")
                .openPopup();

            circulo = L.circle(
                [lat,lng],
                {
                    radius:100,
                    color:"#2563eb",
                    fillColor:"#2563eb",
                    fillOpacity:0.15
                }
            ).addTo(mapa);

            mapa.on("click", function(e){

                const distancia =
                    mapa.distance(
                        [lat,lng],
                        e.latlng
                    );

                if(distancia > 100){

                    alert(
                        "Solo puedes reportar dentro de 100 metros de tu ubicación."
                    );

                    return;
                }

                if(marcador){
                    mapa.removeLayer(marcador);
                }

                marcador =
                    L.marker(e.latlng)
                     .addTo(mapa);

                document.getElementById("latitud").value =
                    e.latlng.lat;

                document.getElementById("longitud").value =
                    e.latlng.lng;

            });

        },

        function(){

            alert(
                "No se pudo obtener tu ubicación."
            );

        }

    );

};





