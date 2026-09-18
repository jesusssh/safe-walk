let mapa;
let marcadorDestino;
let rutaControl;
let origenLat;
let origenLng;
let destinoLat;
let destinoLng;
let coordenadasRuta = [];
let reportesReales = [];
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

        cargarReportesReales()
.then(() => {

    reportesReales.forEach(reporte => {

        L.marker([
            reporte.lat,
            reporte.lng
        ])
        .addTo(mapa)
        .bindPopup(
            `⚠️ ${reporte.tipo}`
        );

    });

});
``

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
    },
    function(error) {
        console.error("No se pudo obtener la ubicación:", error);
    }
);
function esHorarioNocturno(){

    const ahora = new Date();

    const hora =
        ahora.getHours();

    const minuto =
        ahora.getMinutes();

    const horaDecimal =
        hora + (minuto / 60);

    return (
        horaDecimal >= 17.5 ||
        horaDecimal < 5.5
    );

}
async function cargarReportesReales(){

    try{

        const respuesta =
            await fetch(
                "/safe-walk/reportes/obtener_reportes.php"
            );

        const datos =
            await respuesta.json();

        if(!datos.success){

            console.log(
                datos.message
            );

            return;

        }

        reportesReales =

            datos.reportes

            .map(reporte => {

                if(
                    reporte.nombre_tipo ===
                    "Calle Oscura"
                    &&
                    !esHorarioNocturno()
                ){

                    return null;

                }

                let puntaje = 5;

                if(
                    reporte.nombre_tipo ===
                    "Robo"
                ){
                    puntaje = 10;
                }

                if(
                    reporte.nombre_tipo ===
                    "Acoso"
                ){
                    puntaje = 7;
                }

                if(
                    reporte.nombre_tipo ===
                    "Calle Oscura"
                ){
                    puntaje = 5;
                }

                return{

                    tipo:
                        reporte.nombre_tipo,

                    lat:
                        parseFloat(
                            reporte.latitud
                        ),

                    lng:
                        parseFloat(
                            reporte.longitud
                        ),

                    puntaje:
                        puntaje

                };

            })

            .filter(
                reporte =>
                reporte !== null
            );

        console.log(
            "Reportes reales:",
            reportesReales
        );
    }
    catch(error){

        console.log(error);

    }

}

window.addEventListener("load", function(){
    cargarReportesReales();
    const botonRuta =
        document.querySelector(".btn-ruta");

    console.log(botonRuta);

    function calcularRiesgoRuta(){

    let riesgo = 0;

    cantidadReportesDetectados = 0;
    riesgosDetectados = [];
    resumenRiesgos = {};

    const reportesContados = new Set();

    coordenadasRuta.forEach(punto => {

        reportesReales.forEach((reporte, indice) => {

            const distancia = mapa.distance(
                [punto.lat, punto.lng],
                [reporte.lat, reporte.lng]
            );

            if(
                distancia <= 50 &&
                !reportesContados.has(indice)
            ){

                reportesContados.add(indice);

                riesgo += reporte.puntaje;

                cantidadReportesDetectados++;

                riesgosDetectados.push(
                    reporte.tipo
                );

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

    botonRuta.addEventListener("click", function(){

        if(!destinoLat){

            alert(
                "Selecciona un destino primero."
            );

            return;

        }

        if(rutaControl){

            mapa.removeControl(
                rutaControl
            );

        }
rutaControl = L.Routing.control({
    waypoints: [
        L.latLng(
            origenLat,
            origenLng
        ),
        L.latLng(
            destinoLat,
            destinoLng
        )
    ],

    router: L.Routing.osrmv1({
        profile: 'foot'
    }),

    showAlternatives: true,

    lineOptions:{
        styles:[
            {
                color:'#22c55e',
                opacity:0.9,
                weight:6
            }
        ]
    },

    altLineOptions:{
        styles:[
            {
                color:'#6b7280',
                opacity:0.7,
                weight:5
            }
        ]
    },
    routeWhileDragging:false,
    show:false,
    addWaypoints:false,
    draggableWaypoints:false,

    createMarker:function(){
        return null;
    }
}).addTo(mapa);

        rutaControl.on("routesfound",function(e){

                const ruta =
                    e.routes[0];

                    console.log("Cantidad de rutas:",e.routes.length);
                    
                coordenadasRuta =
                    ruta.coordinates;

                let riesgoFinal =
                    calcularRiesgoRuta();

                console.log(
                    ruta.coordinates
                );

                console.log(
                    "Cantidad de puntos:",
                    coordenadasRuta.length
                );

                const distanciaKm =
                    (
                        ruta.summary.totalDistance
                        / 1000
                    ).toFixed(2);

                const tiempoMin =
                    Math.round(
                        ruta.summary.totalTime
                        / 60
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

                if(riesgoFinal <= 5){

                    nivelSeguridad =
                        "🟢 Alta";

                }
                else if(riesgoFinal <= 15){

                    nivelSeguridad =
                        "🟡 Media";

                }
                else{

                    nivelSeguridad =
                        "🔴 Baja";

                }

                document.getElementById(
                    "seguridad"
                ).textContent =
                    nivelSeguridad;

                document.getElementById(
                    "reportesEncontrados"
                ).textContent =
                    cantidadReportesDetectados;

                const listaRiesgos =
                    document.getElementById(
                        "listaRiesgos"
                    );

                listaRiesgos.innerHTML = "";

                for(
                    const tipo
                    in resumenRiesgos
                ){

                    listaRiesgos.innerHTML +=
                        `<li>⚠️ ${tipo}: ${resumenRiesgos[tipo]}</li>`;

                }

            }

        );

    });

});
