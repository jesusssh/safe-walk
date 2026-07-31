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
const botonCapturar = document.getElementById("capturar");
const botonCamara = document.getElementById("apagar");

let stream = null;
let camaraEncendida = false;

async function iniciarCamara() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        video.srcObject = stream;
        await video.play();

        camaraEncendida = true;
        botonCamara.textContent = "Desactivar cámara";

    } catch (error) {
        console.error(error);
    }
}

function detenerCamara() {

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    video.srcObject = null;
    stream = null;
    camaraEncendida = false;
    botonCamara.textContent = "Activar cámara";
}

botonCamara.onclick = () => {
    if (camaraEncendida) {
        detenerCamara();
    } else {
        iniciarCamara();
    }
};

botonCapturar.onclick = () => {
    if (!camaraEncendida) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    foto.src = canvas.toDataURL("image/png");
};

iniciarCamara();