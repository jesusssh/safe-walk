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
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const foto = document.getElementById("foto");
const boton = document.getElementById("capturar");

// Iniciar cámara
navigator.mediaDevices.getUserMedia({
    video: true
})
.then(stream => {
    video.srcObject = stream;
})
.catch(error => {
    console.error("No se pudo acceder a la cámara", error);
});

// Capturar imagen
boton.addEventListener("click", () => {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    foto.src = canvas.toDataURL("image/png");
});