const botones = document.querySelectorAll(".tipo-btn");

botones.forEach(btn => {

    btn.addEventListener("click", () => {

        botones.forEach(b => {
            b.classList.remove("activo");
        });

        btn.classList.add("activo");

    });

});

function obtenerUbicacion(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(

            function(posicion){

                const lat = posicion.coords.latitude;
                const lon = posicion.coords.longitude;

                document.getElementById("ubicacion").value =
                lat.toFixed(6) + ", " + lon.toFixed(6);

            },

            function(){

                alert("No se pudo obtener la ubicación.");

            }

        );

    }else{

        alert("Tu navegador no soporta geolocalización.");

    }

}

let mapa;
let marcador;
let circulo;

function mostrarMapa(){

    setTimeout(() => {
    mapa.invalidateSize();
}, 100);

    document.getElementById("ubicacionActual").style.display = "none";
    document.getElementById("mapaContainer").style.display = "block";

    if(mapa) return;

    navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

       var map = L.map('map').setView([13.6929, -89.2182], 12);
       L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
       maxZoom: 19
}).addTo(map);

        circulo = L.circle([lat,lng],{
            radius:100,
            color:"#2563eb"
        }).addTo(mapa);

        L.marker([lat,lng])
        .addTo(mapa)
        .bindPopup("Tu ubicación");

        mapa.on("click", function(e){

            const distancia =
            mapa.distance(
                [lat,lng],
                e.latlng
            );

            if(distancia > 100){

                alert(
                    "Solo puedes seleccionar dentro de 100 metros."
                );

                return;
            }

            if(marcador){
                mapa.removeLayer(marcador);
            }

            marcador = L.marker(e.latlng)
            .addTo(mapa);

            document.getElementById("ubicacion").value =
            e.latlng.lat.toFixed(6) +
            "," +
            e.latlng.lng.toFixed(6);

        });

    });

}

function mostrarUbicacionActual(){

    document.getElementById("ubicacionActual").style.display = "block";
    document.getElementById("mapaContainer").style.display = "none";

}