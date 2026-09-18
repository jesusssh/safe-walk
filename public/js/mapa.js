let reportesMapa = [];

const reportesNotificados = new Set();

var map = L.map('map').setView([13.6929, -89.2182], 12);

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 19
    }
).addTo(map);

var circulo = L.circle([0,0],{
    radius:50,
    color:"blue",
    fillColor:"blue",
    fillOpacity:0.3
}).addTo(map);

var marcador = L.marker([0,0]).addTo(map);

navigator.geolocation.watchPosition(

    function(posicion){

        const lat =
            posicion.coords.latitude;

        const lng =
            posicion.coords.longitude;

        circulo.setLatLng([lat,lng]);

        marcador.setLatLng([lat,lng]);

        map.setView([lat,lng],17);

        revisarProximidad(
    lat,
    lng
);

    },
    function(error){

        console.log(
            "Error de ubicación:",
            error
        );

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

async function cargarReportes(){
    try{
        console.log(
            "CARGANDO REPORTES..."
        );
        const respuesta =
            await fetch(
                "/safe-walk/reportes/obtener_reportes.php"
            );
        const datos =
            await respuesta.json();
        console.log(datos);

        if(!datos.success){

            return;

        }

datos.reportes.forEach(
    reporte => {

        if(
            reporte.nombre_tipo ===
            "Calle Oscura" &&
            !esHorarioNocturno()
        ){

            return;

        }

        reportesMapa.push({

            id: reporte.id_reporte,

            tipo: reporte.nombre_tipo,

            lat: parseFloat(
                reporte.latitud
            ),

            lng: parseFloat(
                reporte.longitud
            )

        });

        L.marker([
            parseFloat(
                reporte.latitud
            ),
            parseFloat(
                reporte.longitud
            )
        ])
        .addTo(map)
        .bindPopup(
            `<b>${reporte.nombre_tipo}</b><br>${reporte.descripcion}`
        );

    }
);


    }
    catch(error){

        console.log(error);

    }

}

cargarReportes();
function revisarProximidad(lat,lng){
    console.log("REVISANDO");

console.log(reportesMapa);

    reportesMapa.forEach(reporte => {

        let radio = 50;

        if(reporte.tipo === "Robo"){
            radio = 100;
        }

        if(reporte.tipo === "Acoso"){
            radio = 75;
        }

        if(reporte.tipo === "Calle Oscura"){
            radio = 50;
        }

        const distancia = map.distance(
            [lat,lng],
            [reporte.lat,reporte.lng]
        );
                    console.log(
    reporte.tipo,
    distancia)

        if(
            distancia <= radio &&
            !reportesNotificados.has(reporte.id)
        ){

            reportesNotificados.add(
                reporte.id
            );

            mostrarAlerta(
                reporte.tipo,
                Math.round(distancia)
            );

        }

    });

}
function mostrarAlerta(tipo, distancia){

    const alerta = document.createElement("div");

    alerta.innerHTML =
    `
    ⚠️ Te aproximas a una zona con reporte de <strong>${tipo}</strong>
    <br>
    Distancia: ${distancia} metros
    `;

    alerta.style.position = "fixed";
    alerta.style.top = "20px";
    alerta.style.left = "50%";
    alerta.style.transform = "translateX(-50%)";

    alerta.style.background = "#f59e0b";
    alerta.style.color = "white";
    alerta.style.padding = "15px";
    alerta.style.borderRadius = "12px";

    alerta.style.zIndex = "9999";
    
    let historial =
    JSON.parse(
        localStorage.getItem(
            "notificacionesSafeWalk"
        )
    ) || [];

historial.unshift({

    tipo: tipo,

    distancia: distancia,

    fecha:
        new Date()
        .toLocaleString()

});

localStorage.setItem(

    "notificacionesSafeWalk",

    JSON.stringify(
        historial
    )

);

    document.body.appendChild(
        alerta
    );

    setTimeout(() => {

        alerta.remove();

    },5000);

}


document.addEventListener(
    'DOMContentLoaded',
    () => {

        const temaGuardado =
            localStorage.getItem(
                'temaApp'
            ) || 'claro';

        if(
            temaGuardado === 'oscuro'
        ){

            document.body.classList.add(
                'dark-mode'
            );

        }
        else{

            document.body.classList.remove(
                'dark-mode'
            );

        }

    }
);