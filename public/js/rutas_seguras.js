let mapa;
let marcadorDestino;
let rutaControl;
let origenLat;
let origenLng;
let destinoLat;
let destinoLng;
let coordenadasRuta = [];
let reportesPrueba = [
    {
        tipo:"Robo",
        lat:13.6745,
        lng:-89.2512,
        puntaje:10
    },

    {
        tipo:"Acoso",
        lat:13.6760,
        lng:-89.2495,
        puntaje:7
    },

    {
        tipo:"Calle Oscura",
        lat:13.6752,
        lng:-89.2505,
        puntaje:5
    }
];
let cantidadReportesDetectados = 0;
let riesgosDetectados = [];
let resumenRiesgos = {};

navigator.geolocation.getCurrentPosition(

    function(pos){

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        origenLat = lat;
        origenLng = lng;


        document.getElementById(
            "ubicacionActual"
        ).value =
        lat.toFixed(6) +
        ", " +
        lng.toFixed(6);

        mapa = L.map("mapaRutas")
        .setView([lat,lng],16);

        L.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom:19
            }
        ).addTo(mapa);

        L.marker([lat,lng])
        .addTo(mapa)
        .bindPopup("Tu ubicación");

        mapa.on("click",function(e){
            destinoLat = e.latlng.lat;
            destinoLng = e.latlng.lng;

            if(marcadorDestino){
                mapa.removeLayer(
                    marcadorDestino
                );
            }

            marcadorDestino =
            L.marker(e.latlng)
            .addTo(mapa)
            .bindPopup(
                "Destino seleccionado"
            );

        });

    }
});

window.addEventListener("load", function(){

    const botonRuta =
        document.querySelector(".btn-ruta");

    console.log(botonRuta);

    botonRuta.addEventListener("click", function(){

        if(!destinoLat){
            alert("Selecciona un destino primero.");
            return;
        }

        if(rutaControl){
            mapa.removeControl(rutaControl);
        }

        rutaControl = L.Routing.control({
            waypoints: [
                L.latLng(origenLat, origenLng),
                L.latLng(destinoLat, destinoLng)
            ],
            router: L.Routing.osrmv1(),
            routeWhileDragging: false,
            show: false,
            addWaypoints: false,
            draggableWaypoints: false,
            showAlternatives: false,
            createMarker: function(){
                return null;
            }
        }).addTo(mapa);
        function calcularRiesgoRuta(){

    let riesgo = 0;

    cantidadReportesDetectados = 0;
    riesgosDetectados = [];
    resumenRiesgos = {};

    coordenadasRuta.forEach(punto => {

        reportesPrueba.forEach(reporte => {

            const distancia = mapa.distance(
                [punto.lat, punto.lng],
                [reporte.lat, reporte.lng]
            );

            if(distancia <= 50){

                riesgo += reporte.puntaje;

                cantidadReportesDetectados++;

                riesgosDetectados.push(reporte.tipo);
                if(resumenRiesgos[reporte.tipo]){

                    resumenRiesgos[reporte.tipo]++;
                }
                else{
                    resumenRiesgos[reporte.tipo] = 1;
                }
            }

        });

    });

    return riesgo;
}

        rutaControl.on('routesfound', function(e){
            const ruta = e.routes[0];
            coordenadasRuta = ruta.coordinates;
            let riesgoFinal = calcularRiesgoRuta();
            console.log(ruta.coordinates);
            console.log( "Cantidad de puntos:", coordenadasRuta.length);




            const distanciaKm =
                (ruta.summary.totalDistance / 1000)
                .toFixed(2);

            const tiempoMin =
                Math.round(
                    ruta.summary.totalTime / 60
                );

            document.getElementById(
                "distancia"
            ).textContent =
                distanciaKm + " km";

            document.getElementById(
                "tiempo"
            ).textContent =
                tiempoMin + " min";


let nivelSeguridad = "";

if(riesgoFinal <= 15){

    nivelSeguridad = "🟢 Alta";

}
else if(riesgoFinal <= 40){

    nivelSeguridad = "🟡 Media";

}
else{

    nivelSeguridad = "🔴 Baja";

}
            document.getElementById("seguridad").textContent = nivelSeguridad;
            document.getElementById("reportesEncontrados").textContent = cantidadReportesDetectados;
const listaRiesgos =
    document.getElementById("listaRiesgos");

listaRiesgos.innerHTML = "";

for(const tipo in resumenRiesgos){

    listaRiesgos.innerHTML +=
        `<li>⚠️ ${tipo}: ${resumenRiesgos[tipo]}</li>`;

}

        });
    });
});