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