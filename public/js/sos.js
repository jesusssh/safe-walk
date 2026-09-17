document.addEventListener('DOMContentLoaded', () => {




const temaGuardado = localStorage.getItem('temaApp') || 'claro';

if (temaGuardado === 'oscuro') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}




const idiomaGuardado = localStorage.getItem('idioma') || 'es';

const lang = (idiomaGuardado === 'English' || idiomaGuardado === 'en')
    ? 'en'
    : 'es';

document.querySelectorAll('[data-es]').forEach(elem => {

    if (elem.dataset[lang]) {
        elem.textContent = elem.dataset[lang];
    }

});


var map = L.map('map').setView([13.6929, -89.2182], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);


// Círculo de ubicación

var circulo = L.circle([0, 0], {
    radius: 40,
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.4
}).addTo(map);


// Marcador

var marcador = L.marker([0, 0]).addTo(map);




const btnSOS = document.getElementById("btnSOS");

if (!btnSOS) {
    console.error("No se encontró el botón btnSOS");
    return;
}


btnSOS.addEventListener("click", function () {

    if (!navigator.geolocation) {

        alert("⚠️ Tu navegador no soporta geolocalización.");
        return;

    }


    // Evitar varios clics mientras se envía

    btnSOS.disabled = true;
    btnSOS.textContent = "Enviando SOS...";


   

    navigator.geolocation.getCurrentPosition(

        function (pos) {

            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;


          

            marcador.setLatLng([lat, lng]);

            circulo.setLatLng([lat, lng]);

            map.setView([lat, lng], 18);


        
            fetch("../sos/enviar_sos.php", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    latitud: lat,
                    longitud: lng,
                    mensaje: "Necesito ayuda"
                })

            })

            .then(async response => {

                const texto = await response.text();

                console.log("Respuesta del servidor:", texto);

                try {

                    return JSON.parse(texto);

                } catch (error) {

                    throw new Error(
                        "El servidor no devolvió JSON válido: " + texto
                    );

                }

            })

            .then(data => {

                console.log("Respuesta SOS:", data);


                if (data.success) {

                    alert(
                        "🚨 SOS enviado correctamente.\n\n" +
                        "Ubicación:\n" +
                        lat + ", " + lng
                    );

                } else {

                    alert(
                        "⚠️ No se pudo enviar el SOS.\n\n" +
                        data.message
                    );

                }

            })

            .catch(error => {

                console.error("Error al enviar SOS:", error);

                alert(
                    "⚠️ Ocurrió un error al enviar la alerta SOS.\n\n" +
                    error.message
                );

            })

            .finally(() => {

                btnSOS.disabled = false;
                btnSOS.textContent = "SOS";

            });

        },


        function (error) {

            console.error("Error de geolocalización:", error);

            alert(
                "⚠️ No se pudo obtener la ubicación.\n\n" +
                "Activa la ubicación y permite que el navegador acceda a ella.\n\n" +
                "Error: " + error.message
            );

            btnSOS.disabled = false;
            btnSOS.textContent = "SOS";

        },


        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }

    );

});


});
